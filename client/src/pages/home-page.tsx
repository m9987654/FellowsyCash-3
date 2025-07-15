import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GlassmorphismCard from "@/components/glassmorphism-card";
import ServiceForm from "@/components/service-form";
import PaymentNotice from "@/components/payment-notice";
import ProgressCircle from "@/components/progress-circle";
import { Moon, Sun, Coins, HandHeart, PiggyBank, TrendingUp, Shield, Users, Clock, FileText, Download, Plus, BarChart, Headphones } from "lucide-react";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleServiceRequest = (serviceType: string) => {
    setSelectedService(serviceType);
    setShowServiceModal(true);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glassmorphism fixed top-0 w-full z-50 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <h1 className="text-2xl font-bold baby-blue dark:golden">
                <Coins className="inline mr-2" />
                فلوس كاش
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
              <a href="#services" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">الخدمات</a>
              <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">عن المنصة</a>
              <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">لوحة التحكم</Link>
            </div>
            
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="glassmorphism-card">
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <span className="text-gray-700 dark:text-gray-300">مرحباً، {user?.fullName}</span>
              <Button variant="outline" onClick={() => logoutMutation.mutate()} className="glassmorphism-card">
                خروج
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="floating mb-8">
            <img 
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern financial technology interface" 
              className="mx-auto rounded-3xl shadow-2xl glassmorphism-card p-2 max-w-md"
            />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-gray-800 dark:text-white mb-6 leading-tight">
            مستقبل المال
            <span className="baby-blue dark:golden"> في إيدك</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            منصة فلوس كاش - الحل الأمثل للخدمات المالية الموثوقة في مصر. 
            تمويل سريع، تحويش ذكي، واستثمار مربح بأعلى معايير الأمان والشفافية
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard">
              <Button className="glow-button bg-baby-blue dark:bg-golden text-white dark:text-black px-8 py-4 rounded-2xl font-bold text-lg">
                <TrendingUp className="mr-2 h-5 w-5" />
                لوحة التحكم
              </Button>
            </Link>
            <Button variant="outline" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="glassmorphism-card px-8 py-4 rounded-2xl">
              اكتشف الخدمات
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">خدماتنا المميزة</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">حلول مالية متكاملة تلبي كل احتياجاتك</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Funding Service */}
            <GlassmorphismCard className="hover:scale-105 transition-all duration-300 group">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-500 dark:bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <HandHeart className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">تمويل سريع</h4>
                <p className="text-gray-600 dark:text-gray-300">احصل على التمويل اللي محتاجه بأسرع وقت</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">رسوم الخدمة</span>
                  <span className="font-bold text-green-600 dark:text-green-400">50 جنيه</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">وقت الموافقة</span>
                  <span className="font-bold baby-blue dark:golden">24 ساعة</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">عقد قانوني</span>
                  <span className="font-bold text-green-600 dark:text-green-400">✓ مضمون</span>
                </div>
              </div>
              
              <Button 
                onClick={() => handleServiceRequest('funding')} 
                className="w-full glow-button bg-green-500 dark:bg-green-400 text-white rounded-2xl"
              >
                اطلب تمويل دلوقتي
              </Button>
            </GlassmorphismCard>

            {/* Saving Service */}
            <GlassmorphismCard className="hover:scale-105 transition-all duration-300 group">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-500 dark:bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <PiggyBank className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">تحويش ذكي</h4>
                <p className="text-gray-600 dark:text-gray-300">حقق أهدافك المالية بخطة تحويش منظمة</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">رسوم الخدمة</span>
                  <span className="font-bold text-green-600 dark:text-green-400">مجاني</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">تتبع التقدم</span>
                  <span className="font-bold baby-blue dark:golden">مرئي</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">عقد حفظ</span>
                  <span className="font-bold text-green-600 dark:text-green-400">✓ موثق</span>
                </div>
              </div>
              
              <Button 
                onClick={() => handleServiceRequest('saving')} 
                className="w-full glow-button bg-blue-500 dark:bg-blue-400 text-white rounded-2xl"
              >
                ابدأ التحويش
              </Button>
            </GlassmorphismCard>

            {/* Investment Service */}
            <GlassmorphismCard className="hover:scale-105 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 left-0 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-1 rounded-br-2xl font-bold text-sm">
                الأكثر ربحية
              </div>
              
              <div className="text-center mb-6 mt-4">
                <div className="w-20 h-20 bg-yellow-500 dark:bg-golden rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-8 w-8 text-white dark:text-black" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">استثمار مربح</h4>
                <p className="text-gray-600 dark:text-gray-300">عوائد عالية في فترات قصيرة بضمان كامل</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">العائد المتوقع</span>
                  <span className="font-bold text-green-600 dark:text-green-400">40%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">مدة الاستثمار</span>
                  <span className="font-bold baby-blue dark:golden">10 أيام</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">الحد الأدنى</span>
                  <span className="font-bold text-yellow-600 dark:text-golden">100 جنيه</span>
                </div>
              </div>
              
              <Button 
                onClick={() => handleServiceRequest('investment')} 
                className="w-full glow-button bg-yellow-500 dark:bg-golden text-white dark:text-black rounded-2xl"
              >
                استثمر دلوقتي
              </Button>
            </GlassmorphismCard>
          </div>
        </div>
      </section>

      {/* Payment Notice */}
      <PaymentNotice />

      {/* Dashboard Preview */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">لوحة التحكم الشخصية</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">تتبع كل معاملاتك وخدماتك من مكان واحد</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Progress Card */}
            <div className="lg:col-span-2">
              <GlassmorphismCard>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">تقدم التحويش</h4>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <ProgressCircle percentage={60} />
                    <p className="text-gray-600 dark:text-gray-300 mt-4">هدف التحويش</p>
                    <p className="font-bold baby-blue dark:golden">6,000 من 10,000 جنيه</p>
                  </div>
                  
                  <div className="space-y-4">
                    <Card className="glassmorphism border-0">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300">المبلغ المحول</span>
                          <span className="font-bold text-green-600 dark:text-green-400">6,000 ج</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="glassmorphism border-0">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300">المتبقي</span>
                          <span className="font-bold text-blue-600 dark:text-blue-400">4,000 ج</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="glassmorphism border-0">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300">الموعد المستهدف</span>
                          <span className="font-bold text-yellow-600 dark:text-golden">15 يناير 2025</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </GlassmorphismCard>
            </div>

            {/* Quick Actions */}
            <GlassmorphismCard>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">إجراءات سريعة</h4>
              
              <div className="space-y-4">
                <Button variant="ghost" className="w-full glassmorphism rounded-2xl p-4 justify-between">
                  <Download className="h-5 w-5 baby-blue dark:golden" />
                  <span>تحميل العقد</span>
                </Button>
                
                <Button variant="ghost" className="w-full glassmorphism rounded-2xl p-4 justify-between">
                  <Plus className="h-5 w-5 text-green-500" />
                  <span>خدمة جديدة</span>
                </Button>
                
                <Button variant="ghost" className="w-full glassmorphism rounded-2xl p-4 justify-between">
                  <BarChart className="h-5 w-5 text-yellow-500 dark:text-golden" />
                  <span>تقرير مفصل</span>
                </Button>
                
                <Button variant="ghost" className="w-full glassmorphism rounded-2xl p-4 justify-between">
                  <Headphones className="h-5 w-5 text-blue-500" />
                  <span>الدعم الفني</span>
                </Button>
              </div>
            </GlassmorphismCard>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <GlassmorphismCard>
              <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h5 className="font-bold text-gray-800 dark:text-white">100% آمن</h5>
              <p className="text-gray-600 dark:text-gray-300 text-sm">تشفير عالي المستوى</p>
            </GlassmorphismCard>
            
            <GlassmorphismCard>
              <Users className="h-12 w-12 baby-blue dark:golden mx-auto mb-4" />
              <h5 className="font-bold text-gray-800 dark:text-white">10,000+ عميل</h5>
              <p className="text-gray-600 dark:text-gray-300 text-sm">يثقون في خدماتنا</p>
            </GlassmorphismCard>
            
            <GlassmorphismCard>
              <Clock className="h-12 w-12 text-yellow-500 dark:text-golden mx-auto mb-4" />
              <h5 className="font-bold text-gray-800 dark:text-white">24/7 دعم</h5>
              <p className="text-gray-600 dark:text-gray-300 text-sm">خدمة عملاء متاحة دائماً</p>
            </GlassmorphismCard>
            
            <GlassmorphismCard>
              <FileText className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h5 className="font-bold text-gray-800 dark:text-white">عقود موثقة</h5>
              <p className="text-gray-600 dark:text-gray-300 text-sm">حماية قانونية كاملة</p>
            </GlassmorphismCard>
          </div>
        </div>
      </section>

      {/* Service Modal */}
      {showServiceModal && (
        <ServiceForm 
          serviceType={selectedService}
          onClose={() => setShowServiceModal(false)}
        />
      )}
    </div>
  );
}
