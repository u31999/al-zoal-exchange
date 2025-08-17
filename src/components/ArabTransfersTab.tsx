import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, MessageCircle, ArrowRight } from 'lucide-react';
import { exchangeRates, sendToWhatsApp } from '@/config/exchangeRates';

// Arabic name -> ISO code (your source of truth)
const currencyMappings: Record<string, string> = {
  "ريال سعودي": "SAR",
  "درهم إماراتي": "AED", 
  "ريال عماني": "OMR",
  "ريال قطري": "QAR",
  "جنيه مصري": "EGP",
  "دولار أمريكي": "USD",
  "دولار رقمي": "USDT"
};

// ISO -> Arabic name
const isoToArabic: Record<string, string> = Object.entries(currencyMappings)
  .reduce((acc, [ar, iso]) => (acc[iso] = ar, acc), {} as Record<string, string>);

// Helper: get SDG-per-unit rate for an ISO code
const getRate = (iso: string): number | undefined => {
  if (iso === 'SDG') return 1; // base
  const ar = isoToArabic[iso];
  return ar ? exchangeRates[ar] : undefined;
};

// Generic converter using SDG as pivot
const convert = (amount: number, fromISO: string, toISO: string): { amount: number; rate: number } | null => {
  const fromRate = getRate(fromISO); // SDG per 1 from
  const toRate = getRate(toISO);     // SDG per 1 to
  if (!fromRate || !toRate || amount <= 0) return null;

  // from → SDG → to
  const inSDG = amount * fromRate;
  const out = inSDG / toRate;

  // For display, return the *effective* cross rate: 1 from = X to
  const crossRate = fromRate / toRate;
  return { amount: out, rate: crossRate };
};

const supportedISOs = ['SDG', ...Object.values(currencyMappings)]; // SDG + everything you mapped

const nameByISO = (iso: string, lang: 'ar' | 'en') => {
  if (iso === 'SDG') return lang === 'ar' ? 'جنيه سوداني' : 'Sudanese Pound';
  const ar = isoToArabic[iso];
  if (!ar) return iso;
  if (lang === 'ar') return ar;
  // quick English labels (adjust if you keep a dictionary)
  const enMap: Record<string, string> = {
    SAR: 'Saudi Riyal', AED: 'UAE Dirham', OMR: 'Omani Rial', QAR: 'Qatari Riyal',
    EGP: 'Egyptian Pound', USD: 'US Dollar', USDT: 'Tether (USDT)'
  };
  return enMap[iso] || iso;
};

const ArabTransfersTab = () => {
  const { t, language } = useLanguage();
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState<string>(''); // ISO
  const [toCurrency, setToCurrency] = useState<string>('');     // ISO
  const [result, setResult] = useState<{ amount: number; rate: number } | null>(null);

  const handleCalculate = () => {
    const num = Number(amount);
    if (!amount || !fromCurrency || !toCurrency || fromCurrency === toCurrency || Number.isNaN(num) || num <= 0) {
      setResult(null);
      return;
    }
    const res = convert(num, fromCurrency, toCurrency);
    setResult(res);
  };

  const handleWhatsApp = () => {
    if (!result || !amount || !fromCurrency || !toCurrency) return;
    const fromNameAr = nameByISO(fromCurrency, 'ar');
    const total = result.amount.toFixed(2);
    // keep your existing signature
    sendToWhatsApp(amount, fromNameAr, result.rate, total, language);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t('arabTitle')}</h2>
        <p className="text-muted-foreground text-lg">{t('arabSubtitle')}</p>
      </div>

      {/* Converter */}
      <Card className="card-elevated mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-primary" />
            {language === 'ar' ? 'حاسبة التحويل' : 'Currency Converter'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">{language === 'ar' ? 'المبلغ' : 'Amount'}</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="form-input text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{language === 'ar' ? 'من العملة' : 'From Currency'}</label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder={language === 'ar' ? 'اختر العملة' : 'Select Currency'} />
                  </SelectTrigger>
                  <SelectContent>
                    {supportedISOs.map((iso) => (
                      <SelectItem key={iso} value={iso}>
                        {nameByISO(iso, language as 'ar'|'en')} ({iso})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{language === 'ar' ? 'إلى العملة' : 'To Currency'}</label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="form-input">
                  <SelectValue placeholder={language === 'ar' ? 'اختر العملة' : 'Select Currency'} />
                </SelectTrigger>
                <SelectContent>
                  {supportedISOs.map((iso) => (
                    <SelectItem key={iso} value={iso}>
                      {nameByISO(iso, language as 'ar'|'en')} ({iso})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleCalculate}
              className="btn-primary w-full text-lg py-6"
              disabled={!amount || !fromCurrency || !toCurrency || fromCurrency === toCurrency}
            >
              {t('calculate')}
            </Button>

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
                        <div className="text-xs text-muted-foreground mt-1">
                          {/* Effective cross rate display (optional) */}
                          1 {fromCurrency} ≈ {result.rate.toFixed(6)} {toCurrency}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

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
    </div>
  );
};

export default ArabTransfersTab;
