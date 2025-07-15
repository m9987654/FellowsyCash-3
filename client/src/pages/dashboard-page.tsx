import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GlassmorphismCard from "@/components/glassmorphism-card";
import ProgressCircle from "@/components/progress-circle";
import { Service } from "@shared/schema";
import { Link } from "wouter";
import { ArrowLeft, Download, Plus, TrendingUp, PiggyBank, HandHeart, Calendar, DollarSign } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const savingServices = services?.filter(s => s.type === "saving") || [];
  const fundingServices = services?.filter(s => s.type === "funding") || [];
  const investmentServices = services?.filter(s => s.type === "investment") || [];

  const calculateSavingProgress = () => {
    if (savingServices.length === 0) return 0;
    const totalTarget = savingServices.reduce((sum, s) => sum + parseFloat(s.amount), 0);
    const totalProgress = savingServices.reduce((sum, s) => sum + (parseFloat(s.progress) || 0), 0);
    return totalTarget > 0 ? (totalProgress / totalTarget) * 100 : 0;
  };

  const downloadContract = async (serviceId: number) => {
    try {
      const response = await fetch(`/api/services/${serviceId}/contract`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `contract-${serviceId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading contract:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">لوحة التحكم</h1>
          <p className="text-gray-600 dark:text-gray-300">مرحباً، {user?.fullName}</p>
        </div>
        <div className="flex gap-4">
          <Link href="/">
            <Button variant="outline" className="glassmorphism-card">
              <ArrowLeft className="mr-2 h-4 w-4" />
              العودة للرئيسية
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <GlassmorphismCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">إجمالي الخدمات</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{services?.length || 0}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </GlassmorphismCard>

        <GlassmorphismCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">التحويش النشط</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{savingServices.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <PiggyBank className="h-6 w-6 text-white" />
            </div>
          </div>
        </GlassmorphismCard>

        <GlassmorphismCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">طلبات التمويل</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{fundingServices.length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
              <HandHeart className="h-6 w-6 text-white" />
            </div>
          </div>
        </GlassmorphismCard>

        <GlassmorphismCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">الاستثمارات</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{investmentServices.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </GlassmorphismCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Saving Progress */}
        <div className="lg:col-span-2">
          <GlassmorphismCard>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">تقدم التحويش</h3>
            
            {savingServices.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <ProgressCircle percentage={calculateSavingProgress()} />
                  <p className="text-gray-600 dark:text-gray-300 mt-4">إجمالي التقدم</p>
                  <p className="font-bold baby-blue dark:golden">
                    {calculateSavingProgress().toFixed(1)}%
                  </p>
                </div>
                
                <div className="space-y-4">
                  {savingServices.slice(0, 3).map((service) => (
                    <Card key={service.id} className="glassmorphism border-0">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-white">{service.purpose}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {service.progress || 0} من {service.amount} جنيه
                            </p>
                          </div>
                          <div className="text-left">
                            <p className="text-sm text-gray-600 dark:text-gray-300">التقدم</p>
                            <p className="font-bold text-green-600 dark:text-green-400">
                              {service.amount ? ((parseFloat(service.progress) / parseFloat(service.amount)) * 100).toFixed(1) : 0}%
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <PiggyBank className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">لا توجد خطط تحويش نشطة</p>
                <Link href="/">
                  <Button className="mt-4 bg-blue-500 text-white">ابدأ التحويش الآن</Button>
                </Link>
              </div>
            )}
          </GlassmorphismCard>
        </div>

        {/* Recent Services */}
        <GlassmorphismCard>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">الخدمات الأخيرة</h3>
          
          <div className="space-y-4">
            {services?.slice(0, 5).map((service) => (
              <Card key={service.id} className="glassmorphism border-0">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {service.type === 'funding' ? 'تمويل' : 
                         service.type === 'saving' ? 'تحويش' : 'استثمار'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {service.amount} جنيه
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(service.createdAt!).toLocaleDateString('ar-EG')}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        service.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        service.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {service.status === 'pending' ? 'قيد المراجعة' :
                         service.status === 'approved' ? 'موافق عليه' :
                         service.status === 'rejected' ? 'مرفوض' : service.status}
                      </span>
                      {service.contractGenerated && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => downloadContract(service.id)}
                          className="glassmorphism border-0"
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {(!services || services.length === 0) && (
              <div className="text-center py-8">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">لا توجد خدمات حتى الآن</p>
                <Link href="/">
                  <Button className="mt-4 glow-button bg-baby-blue dark:bg-golden text-white dark:text-black">
                    <Plus className="mr-2 h-4 w-4" />
                    اطلب خدمة جديدة
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </GlassmorphismCard>
      </div>
    </div>
  );
}
