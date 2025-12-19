import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Upload,
  FileImage,
  Calendar,
  Eye,
  User,
  MapPin,
  Clock,
  Trash2,
  Download,
  Search,
  Calendar as CalendarIcon
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";


export default function PrescriptTracker() {
  const { t } = useTranslation();

  const { user } = useAuth();
  const { toast } = useToast();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({
    doctorName: "",
    clinic: "",
    date: "",
    type: "Glasses Prescription",
    notes: ""
  });

  // Fetch prescriptions from database
  useEffect(() => {
    if (user) {
      fetchPrescriptions();
      setupRealtimeSubscription();
    }
  }, [user]);

  const fetchPrescriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('prescriptions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrescriptions(data || []);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      toast({
        title: "Error",
        description: "Failed to load prescriptions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('prescriptions-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'prescriptions', filter: `user_id=eq.${user?.id}` },
        () => {
          fetchPrescriptions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !formData.doctorName || !selectedDate) return;

    try {
      // Upload file to Supabase storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user?.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('prescriptions')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Save prescription data to database
      const { error: dbError } = await supabase
        .from('prescriptions')
        .insert({
          user_id: user?.id,
          doctor_name: formData.doctorName,
          clinic_name: formData.clinic,
          prescription_date: format(selectedDate, 'yyyy-MM-dd'),
          image_url: filePath,
          notes: formData.notes
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Prescription uploaded successfully"
      });

      // Reload the page to show updated data
      window.location.reload();
    } catch (error) {
      console.error('Error uploading prescription:', error);
      toast({
        title: "Error",
        description: "Failed to upload prescription",
        variant: "destructive"
      });
    }
  };

  const handleDeletePrescription = async (prescriptionId: string, imageUrl: string) => {
    if (!confirm('Are you sure you want to delete this prescription? This action cannot be undone.')) {
      return;
    }

    try {
      // Delete file from storage
      if (imageUrl) {
        const { error: storageError } = await supabase.storage
          .from('prescriptions')
          .remove([imageUrl]);

        if (storageError) {
          console.error('Error deleting file from storage:', storageError);
          // Continue with database deletion even if storage deletion fails
        }
      }

      // Delete record from database
      const { error: dbError } = await supabase
        .from('prescriptions')
        .delete()
        .eq('id', prescriptionId);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Prescription deleted successfully"
      });

      // Reload the page to show updated data
      window.location.reload();
    } catch (error) {
      console.error('Error deleting prescription:', error);
      toast({
        title: "Error",
        description: "Failed to delete prescription",
        variant: "destructive"
      });
    }
  };

  const filteredPrescriptions = prescriptions.filter(
    prescription =>
      prescription.doctor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.clinic_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Glasses Prescription":
        return "bg-primary/10 text-primary";
      case "Contact Lens Prescription":
        return "bg-secondary/10 text-secondary";
      case "Specialist Report":
        return "bg-medical-purple/10 text-medical-purple";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-4">
  <div className="flex items-start justify-between">
    <div className="text-left space-y-1">
      <h1 className="text-4xl font-bold text-foreground flex items-center gap-2">
        <Link to="/">Dashboard</Link>
        <span className="text-muted-foreground">›</span>
        <span className="text-gradient-head">{t("prescripttracker_title")}</span>

      </h1>

      <p className="text-lg text-muted-foreground max-w-2xl">
  {t("prescripttracker_subtitle")}
</p>

    </div>

    <Button onClick={() => setShowUploadForm(true)} className="gap-2" variant="secondary">
          <Upload className="h-5 w-5" />
          {t("upload_prescription")}

        </Button>
  </div>
</div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
              <p className="text-sm text-black">{t("total_prescriptions")}</p>

                <p className="text-3xl font-bold text-black">{prescriptions.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileImage className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
              <p className="text-sm text-black">{t("latest_upload")}</p>

                <p className="text-lg font-bold text-black">
                  {prescriptions.length > 0 ? format(new Date(prescriptions[0].prescription_date), "MMM dd") : "No data"}
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
              <p className="text-sm text-black">{t("storage_used")}</p>

                <p className="text-lg font-bold text-black">12.5 MB</p>
                <p className="text-xs text-black">of 1 GB</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Upload className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload New Prescription
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="doctorName">
  {t("doctor_name")} *
</Label>

                  <Input
                    id="doctorName"
                    placeholder="Dr. John Smith"
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                <Label htmlFor="clinic">{t("clinic_name")}</Label>

                  <Input
                    id="clinic"
                    placeholder="Eye Care Center"
                    value={formData.clinic}
                    onChange={(e) => setFormData({ ...formData, clinic: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                <Label>{t("date_of_prescription")} *</Label>

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
                        {selectedDate ? format(selectedDate, "PPP") : <span>{t("pick_date")}</span>
                      }
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-background border border-border rounded-md shadow-lg" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Prescription Type</Label>
                  <select
                    id="type"
                    className="w-full p-2 border border-input rounded-md bg-background"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="Glasses Prescription">{t("glasses_prescription")}</option>
                    <option value="Contact Lens Prescription">{t("contact_lens_prescription")}</option>
                    <option value="Specialist Report">{t("specialist_report")}</option>
                    <option value="Eye Test Results">{t("eye_test_results")}</option>
                    <option value="Other">{t("other")}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="file">
  {t("upload_image_pdf")} *
</Label>

                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      id="file"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <label htmlFor="file" className="cursor-pointer">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      {selectedFile ? (
                        <div>
                          <p className="text-sm font-medium">{selectedFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-muted-foreground">
                          {t("click_to_upload")}

                          </p>
                          <p className="text-xs text-muted-foreground">
                          {t("file_types")}

                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">{t("notes_optional")}</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional notes about this prescription..."
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handleUpload} 
                className="flex-1"
                disabled={!selectedFile || !formData.doctorName || !selectedDate}
              >
              {t("upload_prescription")}

              </Button>
              <Button variant="outline" onClick={() => setShowUploadForm(false)}>
              {t("cancel")}

              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("search_prescriptions")}

            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Your Prescriptions</h2>
        
        {filteredPrescriptions.length === 0 ? (
          <Card className="bg-[hsl(var(--gradient-card))] border-0">
            <CardContent className="p-12 text-center">
              <FileImage className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-black mb-2"><h3>{t("no_prescriptions_found")}</h3>
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "No prescriptions match your search criteria." : "Upload your first prescription to get started."}
              </p>
              {!searchTerm && (
                <Button onClick={() => setShowUploadForm(true)} variant="outline" className="text-white">
                  Upload Prescription
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredPrescriptions.map((prescription) => (
              <Card key={prescription.id} className="bg-gradient-card border-0 shadow-custom-sm hover:shadow-custom-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileImage className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {prescription.image_url ? prescription.image_url.split('/').pop() : 'Prescription'}
                          </h3>
                          <Badge className="bg-primary/10 text-primary">
                            Prescription
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Dr:</span>
                          <span className="font-medium">{prescription.doctor_name}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Clinic:</span>
                          <span className="font-medium">{prescription.clinic_name || 'N/A'}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Date:</span>
                          <span className="font-medium">
                            {format(new Date(prescription.prescription_date), "MMM dd, yyyy")}
                          </span>
                        </div>
                      </div>
                      
                      {prescription.notes && (
                        <p className="text-sm text-muted-foreground italic">
                          {prescription.notes}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeletePrescription(prescription.id, prescription.image_url)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}