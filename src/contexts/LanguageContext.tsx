import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Header
    siteName: "الزول للتحويلات المالية",
    tagline: "خدمة تحويلات مالية آمنة وسريعة",
    languageToggle: "EN",
    
    // Main Tabs
    reverseTransfer: "التحويل العكسي",
    standardTransfer: "التحويل العادي", 
    arabTransfers: "تحويلات الدول العربية",
    
    // Reverse Transfer Tab
    reverseTitle: "الزول للتحويلات العكسية",
    reverseSubtitle: "التحويل من الجنيه السوداني إلى العملات الأجنبية",
    officialRates: "أسعار الصرف المباشرة",
    lastUpdate: "آخر تحديث",
    autoRefresh: "تحديث تلقائي كل 30 ثانية",
    enterAmount: "أدخل المبلغ بالجنيه السوداني",
    to: "إلى",
    saudiRiyal: "ريال سعودي",
    emiratiDirham: "درهم إماراتي", 
    usDollar: "دولار أمريكي",
    calculate: "احسب المبلغ",
    sendWhatsApp: "إرسال التفاصيل عبر واتساب",
    
    // Standard Transfer Tab
    standardTitle: "التحويل العادي",
    standardSubtitle: "التحويل إلى السودان",
    fromCurrency: "من العملة",
    recipientCity: "مدينة المستلم",
    khartoum: "الخرطوم",
    portSudan: "بورتسودان",
    kassala: "كسلا",
    deliveryMethod: "طريقة التسليم",
    bankTransfer: "تحويل بنكي",
    mobileWallet: "محفظة موبايل",
    cashPickup: "استلام نقدي",
    
    // Arab Transfers Tab
    arabTitle: "تحويلات الدول العربية",
    arabSubtitle: "التحويل بين السودان والدول العربية",
    supportedCountries: "الدول المدعومة",
    estimatedTime: "الوقت المتوقع",
    feesLimits: "الرسوم والحدود",
    
    // Additional Sections
    aboutUs: "من نحن",
    aboutText: "الزول للتحويلات المالية هي شركة رائدة في مجال التحويلات المالية، نقدم خدمات آمنة وسريعة لتحويل الأموال من وإلى السودان بأفضل الأسعار وأعلى معايير الأمان.",
    
    whyTrustUs: "لماذا الزول؟",
    secureEncryption: "تشفير آمن",
    secureDesc: "نستخدم أحدث تقنيات التشفير لحماية معاملاتك",
    licensed: "مرخص ومعتمد",
    licensedDesc: "شركة مرخصة ومعتمدة من الجهات المختصة",
    fastDelivery: "تسليم سريع",
    fastDesc: "تحويلات سريعة وموثوقة في وقت قياسي",
    transparent: "أسعار شفافة",
    transparentDesc: "لا توجد رسوم خفية، أسعار واضحة ومحددة",
    
    testimonials: "آراء العملاء",
    testimonial1: "خدمة ممتازة وسريعة، أنصح بها بشدة",
    testimonial2: "أسعار مناسبة وتحويل آمن وموثوق",
    testimonial3: "فريق محترف ومساعد في كل الأوقات",
    
    contactUs: "تواصل معنا",
    whatsapp: "واتساب",
    email: "البريد الإلكتروني",
    socialMedia: "وسائل التواصل",
    
    // Footer
    privacyPolicy: "سياسة الخصوصية",
    termsOfUse: "شروط الاستخدام",
    copyright: "© 2025 الزول للتحويلات المالية. جميع الحقوق محفوظة"
  },
  en: {
    // Header
    siteName: "Al-Zoul Transfers",
    tagline: "Safe and Fast Money Transfer Service",
    languageToggle: "العربية",
    
    // Main Tabs
    reverseTransfer: "Reverse Transfer",
    standardTransfer: "Standard Transfer",
    arabTransfers: "Arab Transfers",
    
    // Reverse Transfer Tab
    reverseTitle: "Al-Zoul Reverse Transfers",
    reverseSubtitle: "Transfer from Sudanese Pound to Foreign Currencies",
    officialRates: "Direct Exchange Rates",
    lastUpdate: "Last Update",
    autoRefresh: "Auto refresh every 30 seconds",
    enterAmount: "Enter amount in Sudanese Pounds",
    to: "To",
    saudiRiyal: "Saudi Riyal",
    emiratiDirham: "UAE Dirham",
    usDollar: "US Dollar",
    calculate: "Calculate Amount",
    sendWhatsApp: "Send Details via WhatsApp",
    
    // Standard Transfer Tab
    standardTitle: "Standard Transfer",
    standardSubtitle: "Transfer to Sudan",
    fromCurrency: "From Currency",
    recipientCity: "Recipient City",
    khartoum: "Khartoum",
    portSudan: "Port Sudan",
    kassala: "Kassala",
    deliveryMethod: "Delivery Method",
    bankTransfer: "Bank Transfer",
    mobileWallet: "Mobile Wallet",
    cashPickup: "Cash Pickup",
    
    // Arab Transfers Tab
    arabTitle: "Arab Country Transfers",
    arabSubtitle: "Transfers between Sudan and Arab countries",
    supportedCountries: "Supported Countries",
    estimatedTime: "Estimated Time",
    feesLimits: "Fees & Limits",
    
    // Additional Sections
    aboutUs: "About Us",
    aboutText: "Al-Zoul Transfers is a leading money transfer company, providing secure and fast services for money transfers to and from Sudan with the best rates and highest security standards.",
    
    whyTrustUs: "Why Al-Zoul?",
    secureEncryption: "Secure Encryption",
    secureDesc: "We use the latest encryption technology to protect your transactions",
    licensed: "Licensed & Compliant",
    licensedDesc: "Licensed and certified company by relevant authorities",
    fastDelivery: "Fast Delivery",
    fastDesc: "Quick and reliable transfers in record time",
    transparent: "Transparent Pricing",
    transparentDesc: "No hidden fees, clear and defined prices",
    
    testimonials: "Customer Reviews",
    testimonial1: "Excellent and fast service, highly recommended",
    testimonial2: "Fair prices and secure, reliable transfer",
    testimonial3: "Professional and helpful team at all times",
    
    contactUs: "Contact Us",
    whatsapp: "WhatsApp",
    email: "Email",
    socialMedia: "Social Media",
    
    // Footer
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
    copyright: "© 2025 Al-Zoul Transfers. All rights reserved"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.className = language === 'ar' ? 'font-arabic' : 'font-english';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};