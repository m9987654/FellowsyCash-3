import React, { useState, useEffect } from 'react';

interface WithdrawalNotification {
  id: number;
  name: string;
  city: string;
  amount: number;
  plan: string;
}

const names = ['منى', 'مصطفى', 'أحمد', 'فاطمة', 'محمد', 'نورا', 'عمرو', 'دينا', 'كريم', 'سارة', 'يوسف', 'هبة'];
const cities = ['الجيزة', 'المنصورة', 'الإسكندرية', 'القاهرة', 'أسوان', 'طنطا', 'المنيا', 'الأقصر', 'بورسعيد', 'السويس'];
const plans = ['Quick Boost', 'Fast Rise', 'Double Return', 'Power Investor', 'Elite Plus'];

export default function ProfitTicker() {
  const [notifications, setNotifications] = useState<WithdrawalNotification[]>([]);

  const generateNotification = (): WithdrawalNotification => {
    const name = names[Math.floor(Math.random() * names.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const plan = plans[Math.floor(Math.random() * plans.length)];
    
    let amount: number;
    switch (plan) {
      case 'Quick Boost': amount = Math.floor(Math.random() * 500) + 130; break;
      case 'Fast Rise': amount = Math.floor(Math.random() * 800) + 150; break;
      case 'Double Return': amount = Math.floor(Math.random() * 1000) + 200; break;
      case 'Power Investor': amount = Math.floor(Math.random() * 1500) + 220; break;
      case 'Elite Plus': amount = Math.floor(Math.random() * 2000) + 300; break;
      default: amount = 150;
    }

    return {
      id: Date.now() + Math.random(),
      name,
      city,
      amount,
      plan
    };
  };

  useEffect(() => {
    // Initialize with some notifications
    setNotifications([
      generateNotification(),
      generateNotification(),
      generateNotification()
    ]);

    // Add new notification every 12 seconds
    const interval = setInterval(() => {
      setNotifications(prev => {
        const newNotification = generateNotification();
        return [...prev.slice(-2), newNotification]; // Keep only last 3
      });
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm border border-green-300/30 rounded-xl p-4 mb-8 overflow-hidden">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <h3 className="text-green-700 dark:text-green-300 font-semibold text-sm">
          عمليات سحب حديثة
        </h3>
      </div>
      
      <div className="relative overflow-hidden h-8">
        <div className="animate-marquee whitespace-nowrap">
          {notifications.map((notification, index) => (
            <span 
              key={notification.id} 
              className="inline-block ml-8 text-green-800 dark:text-green-200 text-sm font-medium"
            >
              💸 {notification.name} من {notification.city} سحب {notification.amount} جنيه من خطة {notification.plan} ✅
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}