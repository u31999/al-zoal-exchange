import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, CreditCard, Smartphone, Banknote, ArrowRight, MessageCircle } from 'lucide-react';
import { sendToWhatsApp } from '@/config/exchangeRates';

const StandardTransferTab = () => {
  const { t, language } = useLanguage();
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [city, setCity] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [result, setResult] = useState<{ amount: number; rate: number } | null>(null);

  // Mock conversion rates (opposite of reverse transfer)
  const rates = {
    SAR: 188.68, // 1 SAR = 188.68 SDG
    AED: 181.82, // 1 AED = 181.82 SDG
    USD: 666.67  // 1 USD = 666.67 SDG
  };

  const handleCalculate = () => {
    if (amount && fromCurrency) {
      const numAmount = parseFloat(amount);
      const rate = rates[fromCurrency as keyof typeof rates];
      setResult({ amount: numAmount * rate, rate });
    }
  };

  const handleWhatsApp = () => {
    if (result && amount && fromCurrency) {
      const currencyNames = {
        SAR: 'ريال سعودي',
        AED: 'درهم إماراتي', 
        USD: 'دولار أمريكي'
      };
      const total = result.amount.toFixed(2);
      sendToWhatsApp(amount, currencyNames[fromCurrency as keyof typeof currencyNames], result.rate, total, language);
    }
  };

  const getDeliveryIcon = (method: string) => {
    switch (method) {
      case 'bank': return <CreditCard className="w-5 h-5" />;
      case 'mobile': return <Smartphone className="w-5 h-5" />;
      case 'cash': return <Banknote className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {t('standardTitle')}
        </h2>
        <p className="text-muted-foreground text-lg">
          {t('standardSubtitle')}
        </p>
      </div>

      {/* Transfer Form */}
      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* From Currency and Amount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('fromCurrency')}
                </label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder={t('fromCurrency')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAR">{t('saudiRiyal')} (SAR)</SelectItem>
                    <SelectItem value="AED">{t('emiratiDirham')} (AED)</SelectItem>
                    <SelectItem value="USD">{t('usDollar')} (USD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('enterAmount')}
                </label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="form-input text-lg"
                />
              </div>
            </div>

            {/* Recipient City */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {t('recipientCity')}
              </label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="form-input">
                  <SelectValue placeholder={t('recipientCity')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="khartoum">{t('khartoum')}</SelectItem>
                  <SelectItem value="portsudan">{t('portSudan')}</SelectItem>
                  <SelectItem value="kassala">{t('kassala')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Delivery Method */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('deliveryMethod')}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { value: 'bank', label: t('bankTransfer'), icon: 'bank' },
                  { value: 'mobile', label: t('mobileWallet'), icon: 'mobile' },
                  { value: 'cash', label: t('cashPickup'), icon: 'cash' }
                ].map((method) => (
                  <Button
                    key={method.value}
                    variant={deliveryMethod === method.value ? "default" : "outline"}
                    onClick={() => setDeliveryMethod(method.value)}
                    className="h-16 flex flex-col items-center justify-center space-y-1"
                  >
                    {getDeliveryIcon(method.icon)}
                    <span className="text-sm">{method.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <Button 
              onClick={handleCalculate}
              className="btn-primary w-full text-lg py-6"
              disabled={!amount || !fromCurrency || !city || !deliveryMethod}
            >
              {t('calculate')}
            </Button>

            {/* Result */}
            {result && (
              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-lg text-muted-foreground mb-1">
                        {t('fromCurrency')}
                      </div>
                      <div className="text-2xl font-bold">
                        {amount} {fromCurrency}
                      </div>
                    </div>
                    
                    <ArrowRight className="w-8 h-8 text-primary" />
                    
                    <div className="text-center">
                      <div className="text-lg text-muted-foreground mb-1">
                        السودان (SDG)
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        {result.amount.toFixed(2)} SDG
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{t('recipientCity')}: {city}</span>
                      <span>{t('deliveryMethod')}: {deliveryMethod}</span>
                    </div>
                  </div>
                  
                  {/* WhatsApp Button */}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StandardTransferTab;