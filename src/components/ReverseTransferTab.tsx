import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, RefreshCw, TrendingUp, MessageCircle } from 'lucide-react';
import { exchangeRates, currencyMappings, sendToWhatsApp } from '@/config/exchangeRates';

const ReverseTransferTab = () => {
  const { t, language } = useLanguage();
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [result, setResult] = useState<{ amount: number; rate: number } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleCalculate = () => {
    if (amount && selectedCurrency) {
      const numAmount = parseFloat(amount);
      const rate = exchangeRates[selectedCurrency];
      setResult({ amount: numAmount * rate, rate });
    }
  };

  const handleWhatsApp = () => {
    if (result && amount && selectedCurrency) {
      const total = result.amount.toFixed(2);
      sendToWhatsApp(amount, selectedCurrency, result.rate, total, language);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {t('reverseTitle')}
        </h2>
        <p className="text-muted-foreground text-lg">
          {t('reverseSubtitle')}
        </p>
      </div>

      {/* Exchange Rates Card */}
      <Card className="rate-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary" />
              {t('officialRates')}
            </span>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              {t('lastUpdate')}: {lastUpdate.toLocaleTimeString()}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(exchangeRates).map(([currency, rate]) => (
              <div key={currency} className="bg-accent/50 rounded-lg p-4 text-center">
                <div className="font-semibold text-lg">{currencyMappings[currency] || currency}</div>
                <div className="text-2xl font-bold text-primary">{rate.toFixed(4)}</div>
                <div className="text-sm text-muted-foreground">1 SDG</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
            <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
            {t('autoRefresh')}
          </div>
        </CardContent>
      </Card>

      {/* Transfer Form */}
      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Amount Input */}
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

            {/* Currency Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('to')}
              </label>
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger className="form-input">
                  <SelectValue placeholder={t('to')} />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(exchangeRates).map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency} ({currencyMappings[currency]})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Calculate Button */}
            <Button 
              onClick={handleCalculate}
              className="btn-primary w-full text-lg py-6"
              disabled={!amount || !selectedCurrency}
            >
              {t('calculate')}
            </Button>

            {/* Result */}
            {result && (
              <div className="space-y-4">
                <Card className="bg-primary/10 border-primary/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-lg text-muted-foreground mb-1">
                      {amount} SDG = 
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      {result.amount.toFixed(2)} {currencyMappings[selectedCurrency]}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {selectedCurrency}
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
    </div>
  );
};

export default ReverseTransferTab;