import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { exchangeRates, sendToWhatsApp, currencyMappings } from '@/config/exchangeRates';



// Helper: reverse mapping ISO → Arabic
const isoToArabic: Record<string, string> = Object.entries(currencyMappings)
  .reduce((acc, [ar, iso]) => {
    acc[iso] = ar;
    return acc;
  }, {} as Record<string, string>);

const StandardTransferTab = () => {
  const { t, language } = useLanguage();
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState<string>(''); // ISO code
  const [result, setResult] = useState<{ amount: number; rate: number } | null>(null);

  const handleCalculate = () => {
    if (!amount || !fromCurrency) return;

    const numAmount = Number(amount);
    if (Number.isNaN(numAmount) || numAmount <= 0) {
      setResult(null);
      return;
    }

    const arName = isoToArabic[fromCurrency];       // get Arabic name
    const rate = exchangeRates[arName];             // SDG per 1 unit
    if (!rate) return;

    setResult({ amount: numAmount * rate, rate });
  };

  const handleWhatsApp = () => {
    if (!result || !amount || !fromCurrency) return;
    const arName = isoToArabic[fromCurrency];
    const total = result.amount.toFixed(2);
    sendToWhatsApp(amount, arName, result.rate, total, language);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t('standardTitle')}</h2>
        <p className="text-muted-foreground text-lg">{t('standardSubtitle')}</p>
      </div>

      <Card className="card-elevated">
        <CardContent className="p-6 space-y-6">
          {/* Currency & Amount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t('fromCurrency')}</label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="form-input">
                  <SelectValue placeholder={t('fromCurrency')} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(currencyMappings).map(([ar, iso]) => (
                    <SelectItem key={iso} value={iso}>
                      {ar} ({iso})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">أدخل المبلغ</label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-input text-lg"
              />
            </div>
          </div>

          {/* Calculate */}
          <Button 
            onClick={handleCalculate}
            className="btn-primary w-full text-lg py-6"
            disabled={!amount || !fromCurrency}
          >
            {t('calculate')}
          </Button>

          {/* Result */}
          {result && (
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-lg text-muted-foreground mb-1">{t('fromCurrency')}</div>
                    <div className="text-2xl font-bold">
                      {amount} {fromCurrency}
                    </div>
                  </div>

                  <ArrowLeft className="w-8 h-8 text-primary" />

                  <div className="text-center">
                    <div className="text-lg text-muted-foreground mb-1">السودان (SDG)</div>
                    <div className="text-2xl font-bold text-primary">
                      {result.amount.toFixed(2)} SDG
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Button
                    onClick={handleWhatsApp}
                    className="btn-success w-full text-lg py-6 bg-green-600 hover:bg-green-700"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t('sendWhatsApp')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StandardTransferTab;
