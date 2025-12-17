import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Calendar as CalendarIcon,
  Plus,
  BarChart3,
  Activity,
  Minus,
  Trash2
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function Optitrack() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [powerHistory, setPowerHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEntry, setNewEntry] = useState({
    leftEye: "",
    rightEye: "",
    leftAstigmatism: "",
    rightAstigmatism: "",
    notes: ""
  });

  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchPowerHistory();
    }
  }, [user]);

  const fetchPowerHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('eye_power_records')
        .select('*')
        .order('checkup_date', { ascending: true });

      if (error) throw error;
      setPowerHistory(data || []);
    } catch (error) {
      console.error('Error fetching power history:', error);
      toast({
        title: "Error",
        description: "Failed to load eye power history",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddEntry = async () => {
    if (!user || !selectedDate) return;

    try {
      const { error } = await supabase
        .from('eye_power_records')
        .insert({
          user_id: user.id,
          checkup_date: format(selectedDate, 'yyyy-MM-dd'),
          left_eye_power: newEntry.leftEye ? parseFloat(newEntry.leftEye) : null,
          right_eye_power: newEntry.rightEye ? parseFloat(newEntry.rightEye) : null,
          left_eye_cylinder: newEntry.leftAstigmatism ? parseFloat(newEntry.leftAstigmatism) : null,
          right_eye_cylinder: newEntry.rightAstigmatism ? parseFloat(newEntry.rightAstigmatism) : null,
          notes: newEntry.notes || null
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Eye power record added successfully"
      });

      setShowAddForm(false);
      setNewEntry({
        leftEye: "",
        rightEye: "",
        leftAstigmatism: "",
        rightAstigmatism: "",
        notes: ""
      });

      fetchPowerHistory();
    } catch (error) {
      console.error('Error adding record:', error);
      toast({
        title: "Error",
        description: "Failed to add eye power record",
        variant: "destructive"
      });
    }
  };

  const handleDeleteEntry = async (entryId: string) => {
    if (!confirm('Are you sure you want to delete this eye power record? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('eye_power_records')
        .delete()
        .eq('id', entryId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Eye power record deleted successfully"
      });

      fetchPowerHistory();
    } catch (error) {
      console.error('Error deleting record:', error);
      toast({
        title: "Error",
        description: "Failed to delete eye power record",
        variant: "destructive"
      });
    }
  };

  const getTrend = (current: number, previous: number) => {
    if (Math.abs(current) > Math.abs(previous)) {
      return { type: "increase", icon: TrendingDown, color: "text-destructive" };
    } else if (Math.abs(current) < Math.abs(previous)) {
      return { type: "decrease", icon: TrendingUp, color: "text-success" };
    }
    return { type: "stable", icon: Minus, color: "text-muted-foreground" };
  };

  const latestEntry = powerHistory[powerHistory.length - 1];
  const previousEntry = powerHistory[powerHistory.length - 2];
  
  const leftTrend = previousEntry && latestEntry ? getTrend(latestEntry.left_eye_power || 0, previousEntry.left_eye_power || 0) : null;
  const rightTrend = previousEntry && latestEntry ? getTrend(latestEntry.right_eye_power || 0, previousEntry.right_eye_power || 0) : null;

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Optitrack</h1>
          <p className="text-lg text-muted-foreground">Track your eye power progression over time</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="gap-2">
          <Plus className="h-5 w-5" />
          Add Reading
        </Button>
      </div>

      {/* Current Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-0 shadow-custom-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Left Eye
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-foreground">
                  {latestEntry?.left_eye_power || '--'}
                </p>
                <p className="text-sm text-muted-foreground">Diopters</p>
              </div>
              {leftTrend && (
                <div className="flex items-center gap-1">
                  <leftTrend.icon className={`h-5 w-5 ${leftTrend.color}`} />
                  <span className={`text-sm ${leftTrend.color}`}>
                    {leftTrend.type}
                  </span>
                </div>
              )}
            </div>
            {latestEntry?.left_eye_cylinder && (
              <div className="mt-2 pt-2 border-t">
                <p className="text-sm text-muted-foreground">
                  Astigmatism: {latestEntry.left_eye_cylinder}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-custom-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="h-5 w-5 text-secondary" />
              Right Eye
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-foreground">
                  {latestEntry?.right_eye_power || '--'}
                </p>
                <p className="text-sm text-muted-foreground">Diopters</p>
              </div>
              {rightTrend && (
                <div className="flex items-center gap-1">
                  <rightTrend.icon className={`h-5 w-5 ${rightTrend.color}`} />
                  <span className={`text-sm ${rightTrend.color}`}>
                    {rightTrend.type}
                  </span>
                </div>
              )}
            </div>
            {latestEntry?.right_eye_cylinder && (
              <div className="mt-2 pt-2 border-t">
                <p className="text-sm text-muted-foreground">
                  Astigmatism: {latestEntry.right_eye_cylinder}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-custom-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-accent" />
              Last Checkup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              {latestEntry ? format(new Date(latestEntry.checkup_date), "MMM dd") : '--'}
            </p>
            <p className="text-sm text-muted-foreground">
              {latestEntry ? format(new Date(latestEntry.checkup_date), "yyyy") : '--'}
            </p>
            <div className="mt-2 pt-2 border-t">
              <Badge variant="secondary" className="text-xs">
                {powerHistory.length} total readings
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Entry Form */}
      {showAddForm && (
        <Card className="bg-gradient-card border-0 shadow-custom-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Eye Power Reading
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date of Checkup</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background border border-border rounded-md shadow-lg" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Left Eye</h3>
                <div className="space-y-2">
                  <Label htmlFor="leftEye">Spherical Power (D)</Label>
                  <Input
                    id="leftEye"
                    type="number"
                    step="0.25"
                    placeholder="-2.50"
                    value={newEntry.leftEye}
                    onChange={(e) => setNewEntry({ ...newEntry, leftEye: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leftAstigmatism">Astigmatism (D)</Label>
                  <Input
                    id="leftAstigmatism"
                    type="number"
                    step="0.25"
                    placeholder="-0.50"
                    value={newEntry.leftAstigmatism}
                    onChange={(e) => setNewEntry({ ...newEntry, leftAstigmatism: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Right Eye</h3>
                <div className="space-y-2">
                  <Label htmlFor="rightEye">Spherical Power (D)</Label>
                  <Input
                    id="rightEye"
                    type="number"
                    step="0.25"
                    placeholder="-2.75"
                    value={newEntry.rightEye}
                    onChange={(e) => setNewEntry({ ...newEntry, rightEye: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rightAstigmatism">Astigmatism (D)</Label>
                  <Input
                    id="rightAstigmatism"
                    type="number"
                    step="0.25"
                    placeholder="-0.75"
                    value={newEntry.rightAstigmatism}
                    onChange={(e) => setNewEntry({ ...newEntry, rightAstigmatism: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleAddEntry} className="flex-1">
                Save Reading
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Power History */}
      <Card className="bg-gradient-card border-0 shadow-custom-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Power History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <p className="text-center text-muted-foreground">Loading...</p>
            ) : powerHistory.length === 0 ? (
              <p className="text-center text-muted-foreground">No records found. Add your first reading!</p>
            ) : (
              powerHistory.map((entry, index) => (
                <div key={entry.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg group">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-semibold">{format(new Date(entry.checkup_date), "MMM dd, yyyy")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="grid grid-cols-2 gap-8 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Left Eye</p>
                        <p className="text-lg font-bold">{entry.left_eye_power || '--'}D</p>
                        {entry.left_eye_cylinder && (
                          <p className="text-xs text-muted-foreground">Astig: {entry.left_eye_cylinder}D</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Right Eye</p>
                        <p className="text-lg font-bold">{entry.right_eye_power || '--'}D</p>
                        {entry.right_eye_cylinder && (
                          <p className="text-xs text-muted-foreground">Astig: {entry.right_eye_cylinder}D</p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}