import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { X, Send, AlertTriangle } from "lucide-react";
import PaymentNotice from "./payment-notice";

const serviceFormSchema = z.object({
  type: z.string(),
  amount: z.string().min(1, "المبلغ مطلوب"),
  purpose: z.string().optional(),
  targetDate: z.string().optional(),
  paymentConfirmed: z.boolean().refine(val => val === true, "يجب تأكيد التحويل أولاً"),
});

type ServiceFormData = z.infer<typeof serviceFormSchema>;

interface ServiceFormProps {
  serviceType: string;
  onClose: () => void;
}

export default function ServiceForm({ serviceType, onClose }: ServiceFormProps) {
  const { toast } = useToast();
  
  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      type: serviceType,
      amount: "",
      purpose: "",
      targetDate: "",
      paymentConfirmed: false,
    },
  });

  const createServiceMutation = useMutation({
    mutationFn: async (data: ServiceFormData) => {
      return await apiRequest("POST", "/api/services", {
        ...data,
        amount: parseFloat(data.amount),
        targetDate: data.targetDate ? new Date(data.targetDate) : null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({
        title: "تم تقديم الطلب بنجاح",
        description: "سيتم مراجعة طلبك وإرسال العقد قريباً",
      });
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: "خطأ في تقديم الطلب",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ServiceFormData) => {
    createServiceMutation.mutate(data);
  };

  const getServiceConfig = () => {
    switch (serviceType) {
      case 'funding':
        return {
          title: 'طلب تمويل سريع',
          description: 'احصل على التمويل اللي محتاجه بأسرع وقت',
          fields: (
            <>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المبلغ المطلوب</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="أدخل المبلغ بالجنيه" 
                        className="glassmorphism border-0" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>غرض التمويل</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="glassmorphism border-0">
                          <SelectValue placeholder="اختر الغرض" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal_project">مشروع شخصي</SelectItem>
                        <SelectItem value="emergency">طوارئ</SelectItem>
                        <SelectItem value="investment">استثمار</SelectItem>
                        <SelectItem value="education">تعليم</SelectItem>
                        <SelectItem value="medical">علاج</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-600">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <p className="font-semibold text-yellow-800 dark:text-yellow-300">رسوم الخدمة</p>
                  </div>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                    رسوم الخدمة 50 جنيه غير قابلة للاسترداد إلا في حالة رفض الطلب
                  </p>
                </CardContent>
              </Card>
            </>
          )
        };
      
      case 'saving':
        return {
          title: 'خطة التحويش الذكي',
          description: 'حقق أهدافك المالية بخطة تحويش منظمة',
          fields: (
            <>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المبلغ المستهدف</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="أدخل المبلغ المستهدف بالجنيه" 
                        className="glassmorphism border-0" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الموعد المستهدف</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        className="glassmorphism border-0" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>هدف التحويش</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="glassmorphism border-0">
                          <SelectValue placeholder="اختر الهدف" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="car">شراء سيارة</SelectItem>
                        <SelectItem value="marriage">زواج</SelectItem>
                        <SelectItem value="travel">سفر</SelectItem>
                        <SelectItem value="emergency">طوارئ</SelectItem>
                        <SelectItem value="house">منزل</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600">
                <CardContent className="p-4">
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    ✓ خدمة التحويش مجانية تماماً بدون أي رسوم
                  </p>
                </CardContent>
              </Card>
            </>
          )
        };
      
      case 'investment':
        return {
          title: 'فرصة استثمار مربحة',
          description: 'عوائد عالية في فترات قصيرة بضمان كامل',
          fields: (
            <>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مبلغ الاستثمار</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="100"
                        placeholder="الحد الأدنى 100 جنيه" 
                        className="glassmorphism border-0" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>خطة الاستثمار</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="glassmorphism border-0">
                          <SelectValue placeholder="اختر الخطة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="10_days_40">10 أيام - عائد 40%</SelectItem>
                        <SelectItem value="15_days_50">15 يوم - عائد 50%</SelectItem>
                        <SelectItem value="30_days_80">30 يوم - عائد 80%</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600">
                <CardContent className="p-4">
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    💡 العائد المتوقع محسوب بناءً على أداء السوق والخبرة المتراكمة
                  </p>
                </CardContent>
              </Card>
            </>
          )
        };
      
      default:
        return { title: '', description: '', fields: null };
    }
  };

  const config = getServiceConfig();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glassmorphism-card rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{config.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{config.description}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {config.fields}
            
            <PaymentNotice />
            
            <FormField
              control={form.control}
              name="paymentConfirmed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rtl:space-x-reverse">
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-yellow-800 dark:text-yellow-300">
                      أنا حولت المبلغ ومستعد أكمل الطلب
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full glow-button bg-green-500 dark:bg-green-400 text-white py-4 rounded-2xl font-bold"
              disabled={createServiceMutation.isPending}
            >
              <Send className="mr-2 h-5 w-5" />
              {createServiceMutation.isPending ? "جاري تقديم الطلب..." : "تقديم الطلب"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
