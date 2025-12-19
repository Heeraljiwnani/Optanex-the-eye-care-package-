import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome to OptaNex",
        tagline: "Complete Eye Care Companion",
        startbutton: "Start Eye Screening",
        manageCare: "Manage your Eye-care",
        dashboard: "Dashboard",
        features: "Eye Care Features",
        privacy: "Privacy & Data Protection",
        heroDescription:
      "Your complete eye care companion. Monitor, track, and maintain your vision health with AI-powered tools and comprehensive analytics.",
      checkup:"Last Checkup",
      eyepower:"Eye power",
      healthscore:"Health score",
      featureheading:"Eye Care Features",
      optiscreen:"OptiScreen",
      optitrack:"OptiTrack",
      prescripttracker:"PrescriptTracker",
      eyechronical:"EyeChronical",
      glareguard:"GlareGuard",
      optisdecsription:"AI-powered eye screening tests",
      optitdescription:"Track your eye power trends",
      prescriptdescription:"Store prescription images",
      eyechronicaldescription:"Medical history records",
      glaredescription:"Blue light exposure tracking",
      feat1stat:"4 Tests Available",
      feat2stat:"Visual Analytics",
      feat3stat:"Secure Storage",
      feat4stat:"Complete Records",
      feat5stat:"Real-time Monitor",
      open:"Open",
      privacydescription:"OptaNex is fully compliant with DPDP Act 2023. Your medical data is encrypted, stored securely, and never shared without your explicit consent. You have full control over your health information.",
     optiscreen1:"Diabetic Retinopathy",
     optiscreen2:"Age-Related Macular Degeneration",
     optiscreen3:"Color Blindness Test",
     optiscreen4:"Snellen Visual Acuity",
     optiscreen1des:"AI-powered screening for diabetic eye complications",
     optiscreen2des:"Early detection of macular degeneration",
     optiscreen3des:"Comprehensive color vision assessment",
     optiscreen4des:"Standard visual acuity measurement",
     desc1:"AI-powered eye screening tests",
     back:"Back to tests",
    symptomhead:"Common Sympotoms",
    dr_symptom_1: "Blurred or fluctuating vision",
  dr_symptom_2: "Dark spots or floaters",
  dr_symptom_3: "Difficulty seeing at night",
  dr_symptom_4: "Vision loss",
  dr_symptom_5: "Colors appearing faded",
  md_symptom_1: "Central vision becomes blurry",
  md_symptom_2: "Straight lines appear wavy",
  md_symptom_3: "Difficulty recognizing faces",
  md_symptom_4: "Need for brighter light when reading",
  md_symptom_5: "Decreased color intensity",
  cb_symptom_1: "Difficulty distinguishing colors",
  cb_symptom_2: "Problems with red and green colors",
  cb_symptom_3: "Trouble seeing in dim light",
  cb_symptom_4: "Colors appear less vibrant",
  cb_symptom_5: "Confusion with traffic lights",
  sn_symptom_1: "Blurry vision at distance",
  sn_symptom_2: "Squinting to see clearly",
  sn_symptom_3: "Eye strain and headaches",
  sn_symptom_4: "Difficulty reading signs",
  sn_symptom_5: "Need to sit closer to the TV",
  symptomHead: "Common Symptoms",
  testInformation: "Test Information",
  duration: "Duration:",
  accuracy: "Accuracy:",
  method: "Method:",
  aiAnalysis: "AI Analysis",
  beforeStarting: "Before Starting",
  goodLighting: "Ensure good lighting conditions",
  cleanLens: "Clean your camera lens",
  followInstructions: "Follow on-screen instructions carefully",
  keepDeviceStable: "Keep your device stable",
  startTestNow: "Start Test Now",
  chooseDifferentTest: "Choose Different Test",
  closeTest: "Close Test",
  medicalDisclaimer: "Important Medical Disclaimer",
  addReading: "Add Reading",
    leftEye: "Left Eye",
    rightEye: "Right Eye",
    diopters: "Diopters",
    lastCheckup: "Last Checkup",
    totalReadings: "total readings",
    addNewReading: "Add New Eye Power Reading",
    dateOfCheckup: "Date of Checkup",
    pickDate: "Pick a date",
    sphericalPower: "Spherical Power (D)",
    astigmatism: "Astigmatism (D)",
    saveReading: "Save Reading",
    cancel: "Cancel",
    loading: "Loading...",
    noRecords: "No records found. Add your first reading!",
    date: "Date",
    powerHistory: "Power History",
    confirmDelete: "Are you sure you want to delete this eye power record? This action cannot be undone.",
    successAdd: "Eye power record added successfully",
    successDelete: "Eye power record deleted successfully",
    errorLoad: "Failed to load eye power history",
    errorAdd: "Failed to add eye power record",
    errorDelete: "Failed to delete eye power record",
    stable: "Stable",
    increase: "Increase",
    decrease: "Decrease",
    
    prescripttracker_title: "PrescriptTracker",
prescripttracker_subtitle: "Store your prescriptions",

upload_prescription: "Upload Prescription",
upload_new_prescription: "Upload New Prescription",

total_prescriptions: "Total Prescriptions",
latest_upload: "Latest Upload",
storage_used: "Storage Used",

doctor_name: "Doctor Name",
clinic_name: "Clinic / Hospital",
date_of_prescription: "Date of Prescription",
prescription_type: "Prescription Type",
notes_optional: "Notes (Optional)",

pick_date: "Pick a date",

glasses_prescription: "Glasses Prescription",
contact_lens_prescription: "Contact Lens Prescription",
specialist_report: "Specialist Report",
eye_test_results: "Eye Test Results",
other: "Other",

upload_image_pdf: "Upload Prescription Image / PDF",
click_to_upload: "Click to upload or drag and drop",
file_types: "PNG, JPG, PDF up to 10MB",

search_prescriptions: "Search prescriptions by doctor, clinic, or type...",

your_prescriptions: "Your Prescriptions",
no_prescriptions_found: "No Prescriptions Found",
no_match_found: "No prescriptions match your search criteria.",
upload_first_prescription: "Upload your first prescription to get started.",

prescription_uploaded_success: "Prescription uploaded successfully",
prescription_upload_failed: "Failed to upload prescription",

prescription_deleted_success: "Prescription deleted successfully",
prescription_delete_failed: "Failed to delete prescription",

confirm_delete_prescription: "Are you sure you want to delete this prescription? This action cannot be undone.",

download: "Download",


eyechronicle_title: "EyeChronicle",
eyechronicle_subtitle: "Your complete eye history",

add_record: "Add Record",
add_medical_record: "Add Medical Record",




condition_diagnosis: "Condition / Diagnosis",
condition_placeholder: "e.g., Myopia progression",

doctor_placeholder: "e.g., Dr. Sarah Johnson",

treatment: "Treatment",
treatment_placeholder: "e.g., Updated prescription",

status: "Status",
select_status: "Select status",
status_ongoing: "Ongoing",
status_resolved: "Resolved",

notes: "Notes",
notes_placeholder: "Additional notes...",



total_records: "Total Records",


no_medical_records: "No medical records found. Add your first record!",

no_date: "No date",

doctor:"Doctor",
error: "Error",
success: "Success",

load_medical_history_failed: "Failed to load medical history",
medical_record_added: "Medical record added successfully",
medical_record_add_failed: "Failed to add medical record",
medical_record_deleted: "Medcal record deleted successfully",
medical_record_delete_failed: "Failed to delete medical record",

confirm_delete_medical_record: "Are you sure you want to delete this medical record? This action cannot be undone.",

glareguard_subtitle: "Monitors and protects your eyes",

active_monitoring: "Active monitoring",

today_screen_time: "Today's Screen Time",
exceeded_recommended: "Exceeded recommended",
minutes_remaining: "{{minutes}} min remaining",

blue_light_level: "Blue Light Level",
take_action: "Take action",
monitor: "Monitor",
good: "Good",

protection_score: "Protection Score",

protection_settings: "Protection Settings",
blue_light_filter: "Blue Light Filter",
blue_light_filter_desc: "Apply software blue light reduction",

break_reminders: "Break Reminders",
break_reminders_desc: "Get notified every 20 minutes",

immediate_action: "Immediate Action Recommended",
protection_tips: "Blue Light Protection Tips",

rec_breaks: "Consider taking more frequent breaks",
rec_blue_light: "Use blue light filtering glasses or screen filter",
rec_brightness: "Reduce screen brightness and increase ambient lighting",
rec_night_mode: "Consider night mode or reducing screen time before bed",

default_tip_1: "Take breaks every 20 minutes",
default_tip_2: "Use blue light filtering glasses",
default_tip_3: "Reduce screen brightness in low light",
default_tip_4: "Consider screen filters or apps"
    },
    },
    hi: {
      translation: {
        welcome: "OptaNex में आपका स्वागत है",
        tagline: "आपका संपूर्ण नेत्र देखभाल साथी",
        startbutton: "आंखों की जांच शुरू करें",
        manageCare: "नेत्र देखभाल प्रबंधित करें",
        dashboard: "डैशबोर्ड",
        features: "नेत्र देखभाल सुविधाएँ",
        privacy: "गोपनीयता और डेटा सुरक्षा",
        heroDescription:
      "आपका संपूर्ण नेत्र देखभाल साथी। एआई आधारित उपकरणों और विश्लेषण के साथ अपनी दृष्टि स्वास्थ्य की निगरानी और देखभाल करें।",
      checkup:"अंतिम जांच",
      eyepower:"नेत्र शक्ति",
      healthscore:"स्वास्थ्य स्तर",
      featureheading:"नेत्र देखभाल सुविधाएँ",
      optiscreen:"ऑप्टिस्क्रीन",
      optitrack:"ऑप्टिट्रैक",
      prescripttracker:"प्रिस्क्रिप्टट्रैकर",
      eyechronical:"आईक्रॉनिकल",
      glareguard:"ग्लेयरगार्ड",
      optisdecsription:"एआई-संचालित नेत्र जांच परीक्षण",
      optitdescription:"अपनी आंखों की रोशनी के रुझानों पर नज़र रखें",
      prescriptdescription:"प्रिस्क्रिप्शन छवियाँ संग्रहीत करें",
      eyechronicaldescription:"चिकित्सा इतिहास रिकॉर्ड",
      glaredescription:"नीली रोशनी एक्सपोज़र ट्रैकिंग",
      feat1stat:"4 परीक्षण उपलब्ध हैं",
      feat2stat:"Visual Analytics",
      feat3stat:"विज़ुअल एनालिटिक्स",
      feat4stat:"संपूर्ण रिकार्ड",
      feat5stat:"वास्तविक समय मॉनिटर",
      open:"खोलें",
      privacydescription:"ऑप्टानेक्स डीपीडीपी अधिनियम 2023 का पूर्णतया अनुपालन करता है। आपका चिकित्सा डेटा एन्क्रिप्टेड है, सुरक्षित रूप से संग्रहीत है और आपकी स्पष्ट सहमति के बिना कभी भी साझा नहीं किया जाता है। आपके स्वास्थ्य संबंधी जानकारी पर आपका पूर्ण नियंत्रण है।",
      optiscreen1:"डायबिटिक रेटिनोपैथी",
     optiscreen2:"उम्र से संबंधित मैकुलर डिजनरेशन",
     optiscreen3:"कलर ब्लाइंडनेस टेस्ट",
     optiscreen4:"स्नेलेन दृश्य तीक्ष्णता",
     optiscreen1des:"मधुमेह से संबंधित आंखों की जटिलताओं के लिए एआई-संचालित स्क्रीनिंग",
     optiscreen2des:"मैकुलर डिजनरेशन का शीघ्र पता लगाना",
     optiscreen3des:"व्यापक रंग दृष्टि मूल्यांकन",
     optiscreen4des:"मानक दृश्य तीक्ष्णता माप",
     desc1:"एआई-संचालित नेत्र जांच परीक्षण",
     back:"परीक्षणों पर वापस जाएँ",
     symptomhead:"सामान्य लक्षण",
dr_symptom_1: "धुंधली या बदलती हुई दृष्टि",
  dr_symptom_2: "आंखों के सामने काले धब्बे या तैरते बिंदु दिखाई देना",
  dr_symptom_3: "रात में देखने में कठिनाई",
  dr_symptom_4: "दृष्टि में कमी",
  dr_symptom_5: "रंग फीके दिखाई देना",
  md_symptom_1: "केंद्रीय दृष्टि धुंधली हो जाना",
  md_symptom_2: "सीधी रेखाएं टेढ़ी दिखाई देना",
  md_symptom_3: "चेहरे पहचानने में कठिनाई",
  md_symptom_4: "पढ़ते समय अधिक रोशनी की आवश्यकता",
  md_symptom_5: "रंगों की तीव्रता कम हो जाना",
  cb_symptom_1: "रंगों में अंतर करने में कठिनाई",
  cb_symptom_2: "लाल और हरे रंग पहचानने में समस्या",
  cb_symptom_3: "कम रोशनी में देखने में परेशानी",
  cb_symptom_4: "रंग कम चमकीले दिखाई देना",
  cb_symptom_5: "ट्रैफिक लाइट पहचानने में भ्रम",
  sn_symptom_1: "दूर की चीजें धुंधली दिखाई देना",
  sn_symptom_2: "स्पष्ट देखने के लिए आंखें सिकोड़ना",
  sn_symptom_3: "आंखों में थकान और सिरदर्द",
  sn_symptom_4: "साइन बोर्ड पढ़ने में कठिनाई",
  sn_symptom_5: "टीवी के पास बैठने की आवश्यकता",
  test_Information: "Test Information",
  
    symptomHead: "सामान्य लक्षण",
    testInformation: "परीक्षण जानकारी",
    duration: "समय:",
    accuracy: "सटीकता:",
    method: "विधि:",
    aiAnalysis: "एआई विश्लेषण",
    beforeStarting: "परीक्षण शुरू करने से पहले",
    goodLighting: "अच्छी रोशनी की स्थिति सुनिश्चित करें",
    cleanLens: "अपने कैमरे का लेंस साफ करें",
    followInstructions: "स्क्रीन पर दिए निर्देशों का ध्यानपूर्वक पालन करें",
    keepDeviceStable: "अपने डिवाइस को स्थिर रखें",
    startTestNow: "अब परीक्षण शुरू करें",
    chooseDifferentTest: "विभिन्न परीक्षण चुनें",
    closeTest: "परीक्षण बंद करें",
    medicalDisclaimer: "महत्वपूर्ण चिकित्सा अस्वीकरण",
   
    addReading: "रीडिंग जोड़ें",
    leftEye: "बाईं आंख",
    rightEye: "दाईं आंख",
    diopters: "डायॉप्टर",
    lastCheckup: "अंतिम जांच",
    totalReadings: "कुल रीडिंग्स",
    addNewReading: "नई आंख शक्ति रीडिंग जोड़ें",
    dateOfCheckup: "जांच की तारीख",
    pickDate: "तारीख चुनें",
    sphericalPower: "स्फेरिकल पावर (D)",
    astigmatism: "अस्तिग्मैटिज़्म (D)",
    saveReading: "रीडिंग सेव करें",
    cancel: "रद्द करें",
    loading: "लोड हो रहा है...",
    noRecords: "कोई रिकॉर्ड नहीं मिला। अपनी पहली रीडिंग जोड़ें!",
    date: "तारीख",
    powerHistory: "शक्ति इतिहास",
    confirmDelete: "क्या आप वाकई इस आंख शक्ति रिकॉर्ड को हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।",
    successAdd: "आंख शक्ति रिकॉर्ड सफलतापूर्वक जोड़ा गया",
    successDelete: "आंख शक्ति रिकॉर्ड सफलतापूर्वक हटाया गया",
    errorLoad: "आंख शक्ति इतिहास लोड करने में विफल",
    errorAdd: "आंख शक्ति रिकॉर्ड जोड़ने में विफल",
    errorDelete: "आंख शक्ति रिकॉर्ड हटाने में विफल",
    stable: "स्थिर",
    increase: "बढ़ा",
    decrease: "घटा",

    prescripttracker_title: "प्रिस्क्रिप्टट्रैकर",
prescripttracker_subtitle: "अपने प्रिस्क्रिप्शन सुरक्षित रखें",

upload_prescription: "प्रिस्क्रिप्शन अपलोड करें",
upload_new_prescription: "नया प्रिस्क्रिप्शन अपलोड करें",

total_prescriptions: "कुल प्रिस्क्रिप्शन",
latest_upload: "नवीनतम अपलोड",
storage_used: "स्टोरेज उपयोग",

doctor_name: "डॉक्टर का नाम",
clinic_name: "क्लिनिक / अस्पताल",
date_of_prescription: "प्रिस्क्रिप्शन की तारीख",
prescription_type: "प्रिस्क्रिप्शन प्रकार",
notes_optional: "नोट्स (वैकल्पिक)",

pick_date: "तारीख चुनें",

glasses_prescription: "चश्मे का प्रिस्क्रिप्शन",
contact_lens_prescription: "कॉन्टैक्ट लेंस प्रिस्क्रिप्शन",
specialist_report: "विशेषज्ञ रिपोर्ट",
eye_test_results: "आंखों की जांच रिपोर्ट",
other: "अन्य",

upload_image_pdf: "प्रिस्क्रिप्शन इमेज / पीडीएफ अपलोड करें",
click_to_upload: "अपलोड करने के लिए क्लिक करें या ड्रैग करें",
file_types: "PNG, JPG, PDF (10MB तक)",

search_prescriptions: "डॉक्टर, क्लिनिक या प्रकार से खोजें...",

your_prescriptions: "आपके प्रिस्क्रिप्शन",
no_prescriptions_found: "कोई प्रिस्क्रिप्शन नहीं मिला",
no_match_found: "आपकी खोज से मेल खाने वाला कोई प्रिस्क्रिप्शन नहीं मिला।",
upload_first_prescription: "शुरू करने के लिए पहला प्रिस्क्रिप्शन अपलोड करें।",

prescription_uploaded_success: "प्रिस्क्रिप्शन सफलतापूर्वक अपलोड हुआ",
prescription_upload_failed: "प्रिस्क्रिप्शन अपलोड करने में विफल",

prescription_deleted_success: "प्रिस्क्रिप्शन सफलतापूर्वक हटाया गया",
prescription_delete_failed: "प्रिस्क्रिप्शन हटाने में विफल",

confirm_delete_prescription: "क्या आप वाकई इस प्रिस्क्रिप्शन को हटाना चाहते हैं? यह क्रिया वापस नहीं की जा सकती।",

download: "डाउनलोड",

eyechronicle_title: "आई क्रॉनिकल",
eyechronicle_subtitle: "आपका संपूर्ण आँखों का इतिहास",

add_record: "रिकॉर्ड जोड़ें",
add_medical_record: "चिकित्सकीय रिकॉर्ड जोड़ें",



condition_diagnosis: "स्थिति / निदान",
condition_placeholder: "जैसे, मायोपिया में वृद्धि",


doctor_placeholder: "जैसे, डॉ. सारा जॉनसन",

treatment: "उपचार",
treatment_placeholder: "जैसे, नया प्रिस्क्रिप्शन",

status: "स्थिति",
select_status: "स्थिति चुनें",
status_ongoing: "जारी",
status_resolved: "समाप्त",

notes: "नोट्स",
notes_placeholder: "अतिरिक्त जानकारी...",


total_records: "कुल रिकॉर्ड",


no_medical_records: "कोई मेडिकल रिकॉर्ड नहीं मिला। अपना पहला रिकॉर्ड जोड़ें!",

no_date: "तारीख उपलब्ध नहीं",

doctor: "डॉक्टर",
error: "त्रुटि",
success: "सफलता",

load_medical_history_failed: "मेडिकल इतिहास लोड नहीं हो पाया",
medical_record_added: "मेडिकल रिकॉर्ड सफलतापूर्वक जोड़ा गया",
medical_record_add_failed: "मेडिकल रिकॉर्ड जोड़ने में विफल",
medical_record_deleted: "मेडिकल रिकॉर्ड सफलतापूर्वक हटाया गया",
medical_record_delete_failed: "मेडिकल रिकॉर्ड हटाने में विफल",

confirm_delete_medical_record: "क्या आप वाकई इस मेडिकल रिकॉर्ड को हटाना चाहते हैं? यह क्रिया वापस नहीं ली जा सकती।",
glareguard_subtitle: "आपकी आंखों की निगरानी और सुरक्षा करता है",

active_monitoring: "सक्रिय निगरानी",

today_screen_time: "आज का स्क्रीन समय",
exceeded_recommended: "अनुशंसित सीमा से अधिक",
minutes_remaining: "{{minutes}} मिनट शेष",

blue_light_level: "नीली रोशनी का स्तर",
take_action: "कार्रवाई करें",
monitor: "निगरानी करें",
good: "अच्छा",

protection_score: "सुरक्षा स्कोर",

protection_settings: "सुरक्षा सेटिंग्स",
blue_light_filter: "ब्लू लाइट फ़िल्टर",
blue_light_filter_desc: "सॉफ़्टवेयर द्वारा नीली रोशनी कम करें",

break_reminders: "ब्रेक रिमाइंडर",
break_reminders_desc: "हर 20 मिनट में सूचना प्राप्त करें",

immediate_action: "तत्काल कार्रवाई की आवश्यकता",
protection_tips: "ब्लू लाइट सुरक्षा सुझाव",

rec_breaks: "अधिक बार ब्रेक लेने पर विचार करें",
rec_blue_light: "ब्लू लाइट फ़िल्टर चश्मे या स्क्रीन फ़िल्टर का उपयोग करें",
rec_brightness: "स्क्रीन की ब्राइटनेस कम करें और आसपास की रोशनी बढ़ाएं",
rec_night_mode: "नाइट मोड का उपयोग करें या सोने से पहले स्क्रीन समय कम करें",

default_tip_1: "हर 20 मिनट में ब्रेक लें",
default_tip_2: "ब्लू लाइट फ़िल्टर चश्मे का उपयोग करें",
default_tip_3: "कम रोशनी में स्क्रीन की ब्राइटनेस कम रखें",
default_tip_4: "स्क्रीन फ़िल्टर या ऐप्स का उपयोग करें"
      },
    },
  },
  lng: "en",          // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
