import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

import { History, Calendar as CalendarIcon, User, FileText, Plus, Eye, Trash2, HelpCircle, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function EyeChronicle() {
  const { t } = useTranslation();

  const [records, setRecords] = useState<any[]>([]); // Renamed from medicalHistory to match usage in map
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({
    title: "",
    record_type: "",
    doctor_name: "",
    clinic_name: "",
    diagnosis: "",
    treatment: "",
    status: "",
    notes: ""
  });

  const { toast } = useToast();
  const { user } = useAuth();
  const [managementConsent, setManagementConsent] = useState<boolean | null>(null);

  useEffect(() => {
    if (user) {
      fetchMedicalHistory();
      fetchConsent();
    }
  }, [user]);

  const fetchConsent = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("management_consent")
      .eq("user_id", user?.id)
      .single();
    if (data) {
      setManagementConsent(data.management_consent);
    }
  };

  const fetchMedicalHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('medical_history') // Assuming this is the table name, check if it stores 'title', 'record_type' etc or map them
        .select('*')
        .order('diagnosis_date', { ascending: false });

      if (error) throw error;
      setRecords(data || []);
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
    console.log("handleSubmit called. User:", user?.id, "SelectedDate:", selectedDate, "FormData:", formData);

    if (!user) {
      console.error("No user found");
      toast({ title: "Error", description: "You must be logged in to add a record", variant: "destructive" });
      return;
    }

    if (!managementConsent) {
      toast({
        title: "Consent required",
        description: "You need to enable 'Data Management' in Settings to save your history.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedDate) {
      console.error("No date selected");
      toast({ title: "Error", description: "Please select a date", variant: "destructive" });
      return;
    }
    if (!formData.title) {
      console.error("No title provided");
      toast({ title: "Error", description: "Please enter a title (Condition Name)", variant: "destructive" });
      return;
    }

    try {
      console.log("Attempting Supabase insert...");
      // Construct notes with clinic name, type, and diagnosis
      let finalNotes = formData.diagnosis;
      if (formData.record_type) {
        finalNotes = `Type: ${formData.record_type}\n${finalNotes}`;
      }
      if (formData.clinic_name) {
        finalNotes += `\nClinic: ${formData.clinic_name}`;
      }
      if (formData.notes) {
        finalNotes += `\n${formData.notes}`;
      }

      const { error } = await supabase
        .from('medical_history')
        .insert({
          user_id: user.id,
          diagnosis_date: format(selectedDate, 'yyyy-MM-dd'),
          condition_name: formData.title,
          doctor_name: formData.doctor_name || null,
          treatment: formData.treatment || null,
          status: null, // Avoiding invalid value violation; type is now in notes
          notes: finalNotes || null
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Medical record added successfully"
      });

      setOpen(false);
      setFormData({
        title: "",
        record_type: "",
        doctor_name: "",
        clinic_name: "",
        diagnosis: "",
        treatment: "",
        status: "",
        notes: ""
      });

      fetchMedicalHistory();
    } catch (error: any) {
      console.error('Error adding record:', error);
      console.log('Error details:', error.message, error.details, error.hint);
      toast({
        title: "Error adding record",
        description: error.message || "An unexpected error occurred",
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


  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gradient-head flex items-center gap-2 flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">{t("dashboard")}</Link>
            <span className="text-muted-foreground">›</span>
            {t("eyechronicle_title")}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-0 sm:ml-2 rounded-full hover:bg-primary/10">
                  <HelpCircle className="h-6 w-6 sm:h-7 sm:w-7 text-dashboard" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card border-0">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gradient-head mb-4">{t("eyechronicle_help_title")}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {t("eyechronicle_help_content")}
                </div>
              </DialogContent>
            </Dialog>
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground">
            {t("eyechronicle_subtitle")}
          </p>
        </div>
        <div className="flex w-full sm:w-auto gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all">
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
                  <Label htmlFor="record_type">{t("record_type")}</Label>
                  <Select value={formData.record_type} onValueChange={(value) => setFormData({ ...formData, record_type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("select_record_type")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consultation">{t("record_type_consultation")}</SelectItem>
                      <SelectItem value="Surgery">{t("record_type_surgery")}</SelectItem>
                      <SelectItem value="Medication">{t("record_type_medication")}</SelectItem>
                      <SelectItem value="Test Result">{t("record_type_test_result")}</SelectItem>
                      <SelectItem value="Other">{t("record_type_other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">{t("title")} *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder={t("title_placeholder")}
                  />
                </div>

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
                  <Label htmlFor="doctor">{t("doctor_name")}</Label>
                  <Input
                    id="doctor"
                    value={formData.doctor_name}
                    onChange={(e) => setFormData({ ...formData, doctor_name: e.target.value })}
                    placeholder={t("doctor_placeholder")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diagnosis">{t("diagnosis")}</Label>
                  <Textarea
                    id="diagnosis"
                    value={formData.diagnosis}
                    onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                    placeholder={t("diagnosis_placeholder")}
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
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-3">
          <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">
                {t("total_records")}
              </CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{records.length}</div>
            </CardContent>
          </Card>
        </motion.div>

        {loading ? (
          <p>{t("loading")}</p>
        ) : records.length === 0 ? (
          <div className="col-span-full text-center p-8 border rounded-lg border-dashed">
            <p className="text-muted-foreground">{t("no_records_found")}</p>
          </div>
        ) : (
          records.map((record) => (
            <motion.div key={record.id} variants={itemVariants}>
              <Card className="flex flex-col bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm hover:shadow-custom-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    {record.status && (
                      <Badge variant="default">
                        {record.status}
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(record.diagnosis_date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <CardTitle className="mt-2 text-black">{record.condition_name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-2 text-sm text-black">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{record.doctor_name || 'N/A'}</span>
                    </div>
                    {record.notes && (
                      <div className="mt-4 p-2 bg-muted rounded-md text-black">
                        <span className="font-semibold text-black">{t("notes")}: </span>
                        {record.notes}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteRecord(record.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}