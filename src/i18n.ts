import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome to OptaNex",
        tagline: "Complete Eye Care Companion",
        startEyeScreening: "Start Eye Screening",
        manageCare: "Manage your Eye-care",
        dashboard: "Dashboard",
        features: "Eye Care Features",
        privacy: "Privacy & Data Protection",
        heroDescription:
      "Your complete eye care companion. Monitor, track, and maintain your vision health with AI-powered tools and comprehensive analytics.",
      },
    },
    hi: {
      translation: {
        welcome: "OptaNex में आपका स्वागत है",
        tagline: "आपका संपूर्ण नेत्र देखभाल साथी",
        startEyeScreening: "आंखों की जांच शुरू करें",
        manageCare: "नेत्र देखभाल प्रबंधित करें",
        dashboard: "डैशबोर्ड",
        features: "नेत्र देखभाल सुविधाएँ",
        privacy: "गोपनीयता और डेटा सुरक्षा",
        heroDescription:
      "आपका संपूर्ण नेत्र देखभाल साथी। एआई आधारित उपकरणों और विश्लेषण के साथ अपनी दृष्टि स्वास्थ्य की निगरानी और देखभाल करें।",
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
