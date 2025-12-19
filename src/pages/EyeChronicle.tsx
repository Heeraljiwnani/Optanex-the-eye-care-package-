import { useState, useEffect } from "react";
import { format } from "date-fns";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar"; // your UI Calendar component
import { useTranslation } from "react-i18next";

import { History, Calendar as CalendarIcon, User, FileText, Plus, Eye, Trash2 } from "lucide-react"; // renamed lucide Calendar

import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function EyeChronicle() {
  const { t } = useTranslation();

  const [medicalHistory, setMedicalHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({
    condition_name: "",
    doctor_name: "",
    treatment: "",
    status: "",
    notes: ""
  });

  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchMedicalHistory();
    }
  }, [user]);

  const fetchMedicalHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('medical_history')
        .select('*')
        .order('diagnosis_date', { ascending: false });

      if (error) throw error;
      setMedicalHistory(data || []);
    } catch (error) {
      console.error('Error fetching medical history:', error);
      toast({
        title: "Error",
        description: "Failed to load medical history",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!user || !selectedDate || !formData.condition_name) return;

    try {
      const { error } = await supabase
        .from('medical_history')
        .insert({
          user_id: user.id,
          diagnosis_date: format(selectedDate, 'yyyy-MM-dd'),
          condition_name: formData.condition_name,
          doctor_name: formData.doctor_name || null,
          treatment: formData.treatment || null,
          status: formData.status || null,
          notes: formData.notes || null
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Medical record added successfully"
      });

      setOpen(false);
      setFormData({
        condition_name: "",
        doctor_name: "",
        treatment: "",
        status: "",
        notes: ""
      });
      
      fetchMedicalHistory();
    } catch (error) {
      console.error('Error adding record:', error);
      toast({
        title: "Error",
        description: "Failed to add medical record",
        variant: "destructive"
      });
    }
  };

  const handleDeleteRecord = async (recordId: string) => {
    if (!confirm('Are you sure you want to delete this medical record? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('medical_history')
        .delete()
        .eq('id', recordId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Medical record deleted successfully"
      });

      fetchMedicalHistory();
    } catch (error) {
      console.error('Error deleting record:', error);
      toast({
        title: "Error",
        description: "Failed to delete medical record",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
       <div className="text-left space-y-1">
           <h1 className="text-4xl font-bold text-foreground flex items-center gap-2">
             <Link to="/">{t("dashboard")}</Link>
             <span className="text-muted-foreground">›</span>
             <span className="text-gradient-head">{t("eyechronicle_title")}</span>
           </h1>
     
           <p className="text-lg text-muted-foreground max-w-2xl">
          {t("eyechronicle_subtitle")}
           </p>
         </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" variant="secondary">
              <Plus className="h-5 w-5" />
              {t("add_record")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{t("add_medical_record")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t("date")}</Label>
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
                      {selectedDate ? format(selectedDate, "PPP") : <span>{t("pick_date")}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background border border-border rounded-md shadow-lg" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="condition"> {t("condition_diagnosis")} *</Label>
                <Input
                  id="condition"
                  value={formData.condition_name}
                  onChange={(e) => setFormData({ ...formData, condition_name: e.target.value })}
                  placeholder={t("condition_placeholder")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="doctor">{t("doctor_name")}</Label>
                <Input
                  id="doctor"
                  value={formData.doctor_name}
                  onChange={(e) => setFormData({ ...formData, doctor_name: e.target.value })}
                  placeholder={t("doctor_placeholder")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="treatment">{t("treatment")}</Label>
                <Input
                  id="treatment"
                  value={formData.treatment}
                  onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                  placeholder={t("treatment_placeholder")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">{t("status")}</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("select_status")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ongoing">{t("status_ongoing")}</SelectItem>
                    <SelectItem value="resolved">{t("status_resolved")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">{t("notes")}</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={t("notes_placeholder")}
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleSubmit} className="flex-1">
                {t("add_record")}
                </Button>
                <Button variant="outline" onClick={() => setOpen(false)}>
                {t("cancel")}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-black">{t("total_records")}</p>
                <p className="text-3xl font-bold text-black">{medicalHistory.length}</p>
              </div>
              <History className="h-6 w-6 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-black">{t("loading")}</p>
        ) : medicalHistory.length === 0 ? (
          <p className="text-center text-black">{t("no_medical_records")}</p>
        ) : (
          medicalHistory.map((record) => (
            <Card key={record.id} className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Eye className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">{record.condition_name}</h3>
                      <p className="text-sm text-black">
                        {record.diagnosis_date ? format(new Date(record.diagnosis_date), "MMM dd, yyyy") : 'No date'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ">
                    {record.status && <Badge variant="secondary">{record.status}</Badge>}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteRecord(record.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    {record.doctor_name && (
                      <p className="text-muted-foreground">Doctor: <span className="font-medium text-black">{record.doctor_name}</span></p>
                    )}
                  </div>
                  <div>
                    {record.treatment && (
                      <p className="text-muted-foreground">Treatment: <span className="font-medium text-black">{record.treatment}</span></p>
                    )}
                  </div>
                </div>
                
                {record.notes && (
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground italic">{record.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}