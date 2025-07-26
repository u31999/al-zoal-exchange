import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, DollarSign, MapPin, Shield, MessageCircle, ArrowRight } from 'lucide-react';
import { sendToWhatsApp } from '@/config/exchangeRates';

const ArabTransfersTab = () => {
  const { t, language } = useLanguage();
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [result, setResult] = useState<{ amount: number; rate: number } | null>(null);

  // Arab country exchange rates
  const arabRates = {
    SAR_SDG: 188.68,
    AED_SDG: 181.82,
    USD_SDG: 666.67,
    QAR_SDG: 183.15,
    KWD_SDG: 2173.91,
    OMR_SDG: 1736.11,
    BHD_SDG: 1769.23,
    SDG_SAR: 0.0053,
    SDG_AED: 0.0055,
    SDG_USD: 0.0015,
    SDG_QAR: 0.0055,
    SDG_KWD: 0.00046,
    SDG_OMR: 0.00058,
    SDG_BHD: 0.00056
  };

  const currencies = [
    { code: 'SDG', name: 'جنيه سوداني', nameEn: 'Sudanese Pound' },
    { code: 'SAR', name: 'ريال سعودي', nameEn: 'Saudi Riyal' },
    { code: 'AED', name: 'درهم إماراتي', nameEn: 'UAE Dirham' },
    { code: 'USD', name: 'دولار أمريكي', nameEn: 'US Dollar' },
    { code: 'QAR', name: 'ريال قطري', nameEn: 'Qatari Riyal' },
    { code: 'KWD', name: 'دينار كويتي', nameEn: 'Kuwaiti Dinar' },
    { code: 'OMR', name: 'ريال عماني', nameEn: 'Omani Rial' },
    { code: 'BHD', name: 'دينار بحريني', nameEn: 'Bahraini Dinar' }
  ];

  const handleCalculate = () => {
    if (amount && fromCurrency && toCurrency && fromCurrency !== toCurrency) {
      const numAmount = parseFloat(amount);
      const rateKey = `${fromCurrency}_${toCurrency}` as keyof typeof arabRates;
      const rate = arabRates[rateKey];
      if (rate) {
        setResult({ amount: numAmount * rate, rate });
      }
    }
  };

  const handleWhatsApp = () => {
    if (result && amount && fromCurrency && toCurrency) {
      const fromCurrencyName = currencies.find(c => c.code === fromCurrency)?.name || fromCurrency;
      const toCurrencyName = currencies.find(c => c.code === toCurrency)?.name || toCurrency;
      const total = result.amount.toFixed(2);
      sendToWhatsApp(amount, fromCurrencyName, result.rate, total, language);
    }
  };

  const countries = [
    {
      name: 'Saudi Arabia',
      nameAr: 'السعودية',
      currency: 'SAR',
      time: '2-4 hours',
      timeAr: '2-4 ساعات',
      fee: '2.5%',
      flag: '🇸🇦'
    },
    {
      name: 'UAE',
      nameAr: 'الإمارات',
      currency: 'AED',
      time: '1-3 hours',
      timeAr: '1-3 ساعات',
      fee: '2.0%',
      flag: '🇦🇪'
    },
    {
      name: 'Qatar',
      nameAr: 'قطر',
      currency: 'QAR',
      time: '3-6 hours',
      timeAr: '3-6 ساعات',
      fee: '3.0%',
      flag: '🇶🇦'
    },
    {
      name: 'Kuwait',
      nameAr: 'الكويت',
      currency: 'KWD',
      time: '4-8 hours',
      timeAr: '4-8 ساعات',
      fee: '2.8%',
      flag: '🇰🇼'
    },
    {
      name: 'Oman',
      nameAr: 'عُمان',
      currency: 'OMR',
      time: '6-12 hours',
      timeAr: '6-12 ساعة',
      fee: '3.5%',
      flag: '🇴🇲'
    },
    {
      name: 'Bahrain',
      nameAr: 'البحرين',
      currency: 'BHD',
      time: '4-8 hours',
      timeAr: '4-8 ساعات',
      fee: '3.2%',
      flag: '🇧🇭'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {t('arabTitle')}
        </h2>
        <p className="text-muted-foreground text-lg">
          {t('arabSubtitle')}
        </p>
      </div>

      {/* Features Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="card-gradient text-center">
          <CardContent className="p-6">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">{t('secureEncryption')}</h3>
            <p className="text-muted-foreground text-sm">{t('secureDesc')}</p>
          </CardContent>
        </Card>

        <Card className="card-gradient text-center">
          <CardContent className="p-6">
            <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">{t('fastDelivery')}</h3>
            <p className="text-muted-foreground text-sm">{t('fastDesc')}</p>
          </CardContent>
        </Card>

        <Card className="card-gradient text-center">
          <CardContent className="p-6">
            <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">{t('transparent')}</h3>
            <p className="text-muted-foreground text-sm">{t('transparentDesc')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Currency Converter */}
      <Card className="card-elevated mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-primary" />
            {language === 'ar' ? 'حاسبة التحويل' : 'Currency Converter'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Amount and From Currency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'ar' ? 'المبلغ' : 'Amount'}
                </label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="form-input text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'ar' ? 'من العملة' : 'From Currency'}
                </label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder={language === 'ar' ? 'اختر العملة' : 'Select Currency'} />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {language === 'ar' ? currency.name : currency.nameEn} ({currency.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* To Currency */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === 'ar' ? 'إلى العملة' : 'To Currency'}
              </label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="form-input">
                  <SelectValue placeholder={language === 'ar' ? 'اختر العملة' : 'Select Currency'} />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {language === 'ar' ? currency.name : currency.nameEn} ({currency.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Calculate Button */}
            <Button 
              onClick={handleCalculate}
              className="btn-primary w-full text-lg py-6"
              disabled={!amount || !fromCurrency || !toCurrency || fromCurrency === toCurrency}
            >
              {t('calculate')}
            </Button>

            {/* Result */}
            {result && (
              <div className="space-y-4">
                <Card className="bg-primary/10 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-lg text-muted-foreground mb-1">
                          {language === 'ar' ? 'المبلغ المرسل' : 'Sending Amount'}
                        </div>
                        <div className="text-2xl font-bold">
                          {amount} {fromCurrency}
                        </div>
                      </div>
                      
                      <ArrowRight className="w-8 h-8 text-primary" />
                      
                      <div className="text-center">
                        <div className="text-lg text-muted-foreground mb-1">
                          {language === 'ar' ? 'المبلغ المستلم' : 'Receiving Amount'}
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          {result.amount.toFixed(2)} {toCurrency}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* WhatsApp Button */}
                <Button 
                  onClick={handleWhatsApp}
                  className="btn-success w-full text-lg py-6 bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t('sendWhatsApp')}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Supported Countries */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            {t('supportedCountries')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {countries.map((country, index) => (
              <Card key={index} className="border border-border/50 hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">{country.flag}</span>
                      <div>
                        <h4 className="font-semibold">{country.nameAr}</h4>
                        <p className="text-sm text-muted-foreground">{country.name}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{country.currency}</Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('estimatedTime')}:</span>
                      <span className="font-medium">{country.timeAr}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('feesLimits')}:</span>
                      <span className="font-medium text-primary">{country.fee}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-accent/30 border-accent">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-3 text-accent-foreground">
              معلومات مهمة
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• جميع التحويلات محمية بأعلى معايير الأمان</li>
              <li>• أسعار صرف تنافسية ومحدثة لحظياً</li>
              <li>• خدمة عملاء 24/7</li>
              <li>• تتبع التحويل في الوقت الفعلي</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-primary/10 border-primary/30">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-3 text-primary">
              Important Information
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• All transfers protected with highest security standards</li>
              <li>• Competitive exchange rates updated in real-time</li>
              <li>• 24/7 customer service</li>
              <li>• Real-time transfer tracking</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArabTransfersTab;