import React, { useState } from 'react';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Shield, Clock, Users, Star, ArrowLeft, Moon, Sun, Coins } from 'lucide-react';
import ServiceForm from '@/components/service-form';
import GlassmorphismCard from '@/components/glassmorphism-card';
import PaymentNotice from '@/components/payment-notice';
import ProfitTicker from '@/components/profit-ticker';
import EnhancedInvestmentPlans from '@/components/enhanced-investment-plans';
import ProjectsShowcase from '@/components/projects-showcase';
import Testimonials from '@/components/testimonials';
import CurrencyRates from '@/components/currency-rates';
import Logo3D from '@/components/logo-3d';

export default function EnhancedHomePage() {
  const { user, logoutMutation } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handlePlanSelection = (planId: string, amount: number) => {
    setSelectedService('investment');
  };

  const quickServices = [
    {
      type: 'funding',
      title: 'تمويل سريع',
      description: 'احصل على التمويل اللي محتاجه في أسرع وقت',
      icon: TrendingUp,
      gradient: 'from-blue-500 to-purple-600',
      notice: 'عمولة إدارية 50 جنيه غير مستردة'
    },
    {
      type: 'referral',
      title: 'إحالة',
      description: 'اكسب مع كل صديق تدعوه للمنصة',
      icon: Users,
      gradient: 'from-green-500 to-emerald-600',
      notice: 'عمولة 5% من كل استثمار'
    }
  ];

  const stats = [
    { label: 'عملاء سعداء', value: '10,000+', icon: Users },
    { label: 'معدل النجاح', value: '98%', icon: Star },
    { label: 'سنوات خبرة', value: '15+', icon: Clock },
    { label: 'أموال محمية', value: '50م+ جنيه', icon: Shield }
  ];

  const partners = [
    { name: 'فودافون كاش', logo: '📱' },
    { name: 'بريد مصر', logo: '📮' },
    { name: 'البنك الأهلي', logo: '🏛️' },
    { name: 'بنك مصر', logo: '🏦' }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glassmorphism fixed top-0 w-full z-50 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Logo3D size={48} className="floating-3d" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-3d">
                فلوس كاش
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
              <a href="#services" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">الخدمات</a>
              <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">المشاريع</a>
              <a href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">آراء العملاء</a>
              {user && <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">لوحة التحكم</Link>}
            </div>
            
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="glassmorphism-card">
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              {user ? (
                <>
                  <span className="text-gray-700 dark:text-gray-300">مرحباً، {user?.fullName}</span>
                  <Button variant="outline" onClick={() => logoutMutation.mutate()} className="glassmorphism-card">
                    خروج
                  </Button>
                </>
              ) : (
                <Link href="/auth">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    تسجيل الدخول
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="floating-3d mb-8">
            <Logo3D size={120} className="mx-auto" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent text-3d">
            فلوس كاش
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            عقدك في جيبك • ابدأ بـ ١٠٠ جنيه • استلم أرباحك بعد ١٠ أيام
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/auth">
                <Button size="lg" className="button-3d px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  ابدأ رحلتك المالية
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="button-3d px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
                تعرف أكتر عن خدماتنا
              </Button>
            </div>
          )}

          {/* Profit Ticker */}
          <ProfitTicker />

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <GlassmorphismCard key={index} className="card-3d p-4 sm:p-6 text-center">
                  <Icon className="w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-3 text-blue-600" />
                  <div className="text-lg sm:text-2xl font-bold text-blue-800 dark:text-blue-200">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </GlassmorphismCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section id="services" className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              خدماتنا السريعة
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
            {quickServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <GlassmorphismCard key={index} className="card-3d p-6 sm:p-8 text-center">
                  <div className={`w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-4 sm:mb-6 mx-auto floating-3d`}>
                    <Icon className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-3d">{service.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{service.description}</p>
                  
                  <Button 
                    className={`button-3d w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white font-bold mb-3 sm:mb-4 py-2 sm:py-3`}
                    onClick={() => setSelectedService(service.type)}
                  >
                    اطلب الخدمة دلوقتي
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  </Button>
                  
                  <div className="text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                    {service.notice}
                  </div>
                </GlassmorphismCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Investment Plans */}
      <section className="py-12 px-4 bg-white/30 dark:bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <EnhancedInvestmentPlans onSelectPlan={handlePlanSelection} />
        </div>
      </section>

      {/* Currency Rates */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <CurrencyRates />
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="py-12 px-4 bg-white/30 dark:bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <ProjectsShowcase />
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Testimonials />
        </div>
      </section>

      {/* Payment Notice */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <PaymentNotice />
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            شركاؤنا الموثوقون
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <GlassmorphismCard key={index} className="p-8 text-center hover:scale-105 transition-transform">
                <div className="text-4xl mb-4">{partner.logo}</div>
                <div className="font-semibold text-gray-700 dark:text-gray-300">{partner.name}</div>
              </GlassmorphismCard>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
            <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
              ⚠️ إشعار قانوني مهم
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm leading-relaxed">
              فلوس كاش ليست بنكًا، الأرباح تتوقف على أداء المشاريع. الاستثمار على مسؤوليتك بعد الموافقة على الشروط والأحكام.
            </p>
            <div className="flex justify-center gap-4 mt-4 text-xs">
              <a href="#" className="text-yellow-600 dark:text-yellow-400 hover:underline">سياسة الاستخدام</a>
              <a href="#" className="text-yellow-600 dark:text-yellow-400 hover:underline">سياسة الخصوصية</a>
              <a href="#" className="text-yellow-600 dark:text-yellow-400 hover:underline">ملف المخاطر</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            جاهز تبدأ رحلتك المالية؟
          </h2>
          <p className="text-xl mb-8 opacity-90">
            انضم لآلاف العملاء اللي وثقوا فينا وحققوا أهدافهم المالية
          </p>
          {!user && (
            <Link href="/auth">
              <Button size="lg" className="px-8 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100">
                ابدأ دلوقتي مجاناً
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Service Form Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <ServiceForm 
              serviceType={selectedService} 
              onClose={() => setSelectedService(null)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}