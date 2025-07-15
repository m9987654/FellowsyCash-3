import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GlassmorphismCard from "@/components/glassmorphism-card";
import { Service, User } from "@shared/schema";
import { Redirect } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Clock, Download, Users, TrendingUp, DollarSign } from "lucide-react";

type ServiceWithUser = Service & { user: User };

export default function AdminPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  if (!user?.isAdmin) {
    return <Redirect to="/" />;
  }
  
  const { data: services, isLoading } = useQuery<ServiceWithUser[]>({
    queryKey: ["/api/admin/services"],
  });

  const updateServiceMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return await apiRequest("PATCH", `/api/admin/services/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      toast({
        title: "تم تحديث الحالة",
        description: "تم تحديث حالة الخدمة بنجاح",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "فشل في تحديث حالة الخدمة",
        variant: "destructive",
      });
    },
  });

  const getServiceTypeInArabic = (type: string) => {
    switch (type) {
      case 'funding': return 'تمويل';
      case 'saving': return 'تحويش';
      case 'investment': return 'استثمار';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'قيد المراجعة';
      case 'approved': return 'موافق عليه';
      case 'rejected': return 'مرفوض';
      case 'completed': return 'مكتمل';
      default: return status;
    }
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

  const pendingServices = services?.filter(s => s.status === 'pending') || [];
  const approvedServices = services?.filter(s => s.status === 'approved') || [];
  const totalAmount = services?.reduce((sum, s) => sum + parseFloat(s.amount), 0) || 0;

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">لوحة إدارة المنصة</h1>
        <p className="text-gray-600 dark:text-gray-300">إدارة الخدمات والعملاء</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <GlassmorphismCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">إجمالي الخدمات</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{services?.length || 0}</p>
            </div>
            <TrendingUp className="h-8 w-8 baby-blue dark:golden" />
          </div>
        </GlassmorphismCard>

        <GlassmorphismCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">في انتظار المراجعة</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingServices.length}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </GlassmorphismCard>

        <GlassmorphismCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">خدمات موافق عليها</p>
              <p className="text-2xl font-bold text-green-600">{approvedServices.length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </GlassmorphismCard>

        <GlassmorphismCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">إجمالي المبالغ</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalAmount.toLocaleString()} ج</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </GlassmorphismCard>
      </div>

      {/* Pending Services */}
      {pendingServices.length > 0 && (
        <GlassmorphismCard className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
              الخدمات في انتظار المراجعة ({pendingServices.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingServices.map((service) => (
                <Card key={service.id} className="glassmorphism border-0">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-4 gap-4 items-center">
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                          {service.user.fullName}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {service.user.phone}
                        </p>
                        <p className="text-xs text-gray-500">
                          {service.user.nationalId}
                        </p>
                      </div>
                      
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {getServiceTypeInArabic(service.type)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {service.amount} جنيه
                        </p>
                        <p className="text-xs text-gray-500">
                          {service.purpose}
                        </p>
                      </div>
                      
                      <div>
                        <Badge className={getStatusColor(service.status)}>
                          {getStatusText(service.status)}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(service.createdAt!).toLocaleDateString('ar-EG')}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-green-500 text-white"
                          onClick={() => updateServiceMutation.mutate({ id: service.id, status: 'approved' })}
                          disabled={updateServiceMutation.isPending}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          موافقة
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateServiceMutation.mutate({ id: service.id, status: 'rejected' })}
                          disabled={updateServiceMutation.isPending}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          رفض
                        </Button>
                        {service.contractGenerated && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => downloadContract(service.id)}
                            className="glassmorphism border-0"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </GlassmorphismCard>
      )}

      {/* All Services */}
      <GlassmorphismCard>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
            جميع الخدمات ({services?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services?.map((service) => (
              <Card key={service.id} className="glassmorphism border-0">
                <CardContent className="p-4">
                  <div className="grid md:grid-cols-5 gap-4 items-center text-sm">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">{service.user.fullName}</p>
                      <p className="text-gray-600 dark:text-gray-300">{service.user.phone}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {getServiceTypeInArabic(service.type)}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">{service.amount} ج</p>
                    </div>
                    
                    <div>
                      <Badge className={getStatusColor(service.status)}>
                        {getStatusText(service.status)}
                      </Badge>
                    </div>
                    
                    <div>
                      <p className="text-gray-500">
                        {new Date(service.createdAt!).toLocaleDateString('ar-EG')}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      {service.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-500 text-white text-xs"
                            onClick={() => updateServiceMutation.mutate({ id: service.id, status: 'approved' })}
                          >
                            موافقة
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="text-xs"
                            onClick={() => updateServiceMutation.mutate({ id: service.id, status: 'rejected' })}
                          >
                            رفض
                          </Button>
                        </>
                      )}
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
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">لا توجد خدمات حتى الآن</p>
              </div>
            )}
          </div>
        </CardContent>
      </GlassmorphismCard>
    </div>
  );
}
