import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, AlertTriangle } from "lucide-react";

export default function PaymentNotice() {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <Card className="glassmorphism-card border-2 border-baby-blue dark:border-golden">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Smartphone className="h-16 w-16 baby-blue dark:golden mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">رقم التحويل الرسمي</h3>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 border-2 border-dashed border-baby-blue dark:border-golden">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">برجاء تحويل المبلغ إلى رقم فودافون كاش الرسمي:</p>
              <div className="text-4xl font-black baby-blue dark:golden">
                📱 01026751430
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <p className="text-gray-600 dark:text-gray-300 text-lg font-semibold">
                هذا هو الرقم الوحيد المعتمد للتحويلات
              </p>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300">
              تأكد من صحة الرقم قبل التحويل. أي تحويل لرقم آخر لن يكون معتمداً
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
