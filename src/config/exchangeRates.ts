// ===================================
// EASY-TO-EDIT CONFIGURATION
// ===================================
// Update exchange rates here - rates show how much foreign currency you get for 1 SDG
export const exchangeRates = {
  "ريال سعودي": 0.0067,
  "درهم إماراتي": 0.0065, 
  "دولار أمريكي": 0.00175
};

// Currency mappings for English
export const currencyMappings = {
  "ريال سعودي": "SAR",
  "درهم إماراتي": "AED", 
  "دولار أمريكي": "USD"
};

// WhatsApp Configuration - CHANGE PHONE NUMBER HERE
export const whatsappConfig = {
  phoneNumber: "+966578030378", // Change this to your WhatsApp business number
  
  // WhatsApp message template (Arabic)
  messageTemplateAr: (amount: string, currency: string, rate: number, total: string) => 
    `تفاصيل التحويل:\n` +
    `المبلغ بالجنيه السوداني: ${amount}\n` +
    `العملة المستلمة: ${currency}\n` +
    `السعر المستخدم: ${rate}\n` +
    `المبلغ المستلم: ${total} ${currency}`,
    
  // WhatsApp message template (English)  
  messageTemplateEn: (amount: string, currency: string, rate: number, total: string) =>
    `Transfer Details:\n` +
    `Amount in Sudanese Pounds: ${amount}\n` + 
    `Receiving Currency: ${currency}\n` +
    `Exchange Rate Used: ${rate}\n` +
    `Amount to Receive: ${total} ${currency}`
};

// Helper function to send WhatsApp message
export const sendToWhatsApp = (amount: string, currency: string, rate: number, total: string, language: 'ar' | 'en' = 'ar') => {
  const message = language === 'ar' 
    ? whatsappConfig.messageTemplateAr(amount, currency, rate, total)
    : whatsappConfig.messageTemplateEn(amount, currency, rate, total);
    
  const url = `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};