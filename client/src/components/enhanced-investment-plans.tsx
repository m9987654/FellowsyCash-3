import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, DollarSign, Zap } from 'lucide-react';

interface InvestmentPlan {
  id: string;
  name: string;
  nameArabic: string;
  returnPercent: number;
  minAmount: number;
  duration: number;
  popular?: boolean;
  icon: any;
  gradient: string;
}

const investmentPlans: InvestmentPlan[] = [
  {
    id: 'quick-boost',
    name: 'Quick Boost',
    nameArabic: 'دفعة سريعة',
    returnPercent: 30,
    minAmount: 100,
    duration: 10,
    icon: Zap,
    gradient: 'from-blue-400 to-blue-600'
  },
  {
    id: 'fast-rise',
    name: 'Fast Rise',
    nameArabic: 'صعود سريع',
    returnPercent: 50,
    minAmount: 200,
    duration: 10,
    popular: true,
    icon: TrendingUp,
    gradient: 'from-green-400 to-green-600'
  },
  {
    id: 'double-return',
    name: 'Double Return',
    nameArabic: 'مضاعفة الأرباح',
    returnPercent: 100,
    minAmount: 500,
    duration: 10,
    icon: DollarSign,
    gradient: 'from-purple-400 to-purple-600'
  },
  {
    id: 'power-investor',
    name: 'Power Investor',
    nameArabic: 'المستثمر القوي',
    returnPercent: 120,
    minAmount: 1000,
    duration: 10,
    icon: TrendingUp,
    gradient: 'from-orange-400 to-red-500'
  },
  {
    id: 'elite-plus',
    name: 'Elite Plus',
    nameArabic: 'النخبة بلس',
    returnPercent: 200,
    minAmount: 2000,
    duration: 10,
    icon: DollarSign,
    gradient: 'from-yellow-400 to-yellow-600'
  }
];

interface EnhancedInvestmentPlansProps {
  onSelectPlan: (planId: string, amount: number) => void;
}

export default function EnhancedInvestmentPlans({ onSelectPlan }: EnhancedInvestmentPlansProps) {
  const [selectedAmounts, setSelectedAmounts] = useState<Record<string, number>>({});

  const calculateReturn = (amount: number, returnPercent: number) => {
    return amount + (amount * returnPercent / 100);
  };

  const handleAmountChange = (planId: string, amount: number) => {
    setSelectedAmounts(prev => ({
      ...prev,
      [planId]: amount
    }));
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          خطط الاستثمار العشرة أيام
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          استثمر بذكاء واحصل على أرباح مضمونة في 10 أيام فقط
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {investmentPlans.map((plan) => {
          const Icon = plan.icon;
          const amount = selectedAmounts[plan.id] || plan.minAmount;
          const expectedReturn = calculateReturn(amount, plan.returnPercent);

          return (
            <Card 
              key={plan.id} 
              className="glassmorphism card-3d relative overflow-hidden group"
            >
              {plan.popular && (
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  الأكثر طلباً
                </Badge>
              )}
              
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
              
              <CardHeader className="text-center relative z-10">
                <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{plan.nameArabic}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.name}</p>
              </CardHeader>

              <CardContent className="text-center space-y-4 relative z-10">
                <div className="space-y-2">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                    {plan.returnPercent}%
                  </div>
                  <p className="text-sm text-muted-foreground">عائد في 10 أيام</p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">المبلغ (جنيه)</label>
                    <Input
                      type="number"
                      min={plan.minAmount}
                      value={amount}
                      onChange={(e) => handleAmountChange(plan.id, Number(e.target.value))}
                      className="text-center font-bold"
                    />
                  </div>

                  <div className="bg-muted/50 rounded-lg p-3 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>المبلغ المستثمر:</span>
                      <span className="font-bold">{amount} ج.م</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>العائد المتوقع:</span>
                      <span className="font-bold text-green-600">{expectedReturn} ج.م</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold border-t pt-1">
                      <span>الربح الصافي:</span>
                      <span className="text-green-600">+{expectedReturn - amount} ج.م</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{plan.duration} أيام</span>
                </div>

                <Button 
                  className={`button-3d w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white font-bold py-3`}
                  onClick={() => onSelectPlan(plan.id, amount)}
                  disabled={amount < plan.minAmount}
                >
                  فعّل استثمارك دلوقتي
                </Button>

                <div className="text-xs text-muted-foreground bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded-lg">
                  <p className="font-medium text-yellow-700 dark:text-yellow-400">
                    برجاء تحويل المبلغ على فودافون كاش
                  </p>
                  <p className="font-bold text-yellow-800 dark:text-yellow-300">
                    الرقم المعتمد: 01026751430
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 max-w-4xl mx-auto">
          <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">
            ⚠️ إشعار مهم
          </h3>
          <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
            فلوس كاش ليست بنكًا، الأرباح تتوقف على أداء المشاريع. الاستثمار على مسؤوليتك بعد الموافقة على الشروط والأحكام.
          </p>
        </div>
      </div>
    </div>
  );
}