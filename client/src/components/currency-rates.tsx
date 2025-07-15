import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CurrencyRate {
  currency: string;
  name: string;
  rate: number;
  change: number;
  flag: string;
}

export default function CurrencyRates() {
  const [rates, setRates] = useState<CurrencyRate[]>([
    { currency: 'USD', name: 'دولار أمريكي', rate: 50.85, change: 0.12, flag: '🇺🇸' },
    { currency: 'EUR', name: 'يورو', rate: 54.23, change: -0.08, flag: '🇪🇺' },
    { currency: 'SAR', name: 'ريال سعودي', rate: 13.56, change: 0.03, flag: '🇸🇦' },
    { currency: 'AED', name: 'درهم إماراتي', rate: 13.84, change: 0.05, flag: '🇦🇪' },
    { currency: 'GBP', name: 'جنيه إسترليني', rate: 62.40, change: -0.15, flag: '🇬🇧' },
    { currency: 'KWD', name: 'دينار كويتي', rate: 164.20, change: 0.20, flag: '🇰🇼' }
  ]);

  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const updateRates = () => {
      setRates(prev => prev.map(rate => ({
        ...rate,
        rate: rate.rate + (Math.random() - 0.5) * 0.1,
        change: (Math.random() - 0.5) * 0.3
      })));
      setLastUpdate(new Date());
    };

    // Update every 15 seconds
    const interval = setInterval(updateRates, 15000);
    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (change: number) => {
    if (change > 0.05) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < -0.05) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0.05) return 'text-green-600 dark:text-green-400';
    if (change < -0.05) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="py-8">
      <Card className="glassmorphism">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            أسعار العملات الآن
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            آخر تحديث: {lastUpdate.toLocaleTimeString('ar-EG')}
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {rates.map((rate) => (
              <div 
                key={rate.currency}
                className="bg-white/50 dark:bg-black/20 rounded-lg p-4 text-center hover:scale-105 transition-transform"
              >
                <div className="text-2xl mb-2">{rate.flag}</div>
                <div className="font-bold text-sm mb-1">{rate.currency}</div>
                <div className="text-xs text-muted-foreground mb-2">{rate.name}</div>
                <div className="font-bold text-lg">{rate.rate.toFixed(2)}</div>
                <div className={`flex items-center justify-center gap-1 text-xs ${getTrendColor(rate.change)}`}>
                  {getTrendIcon(rate.change)}
                  <span>{rate.change > 0 ? '+' : ''}{rate.change.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30">
              الأسعار تحديث تلقائي كل 15 ثانية
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}