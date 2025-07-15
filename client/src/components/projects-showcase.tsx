import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Building2, Leaf, Truck, Coffee, Sparkles } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  location: string;
  funded: number;
  target: number;
  status: 'جاري التنفيذ' | 'تم التوثيق';
  icon: any;
  description: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'تجديد مدرسة أسوان',
    location: 'أسوان',
    funded: 85000,
    target: 85000,
    status: 'تم التوثيق',
    icon: Building2,
    description: 'مشروع تجديد مدرسة ابتدائية في أسوان'
  },
  {
    id: '2',
    title: 'مزارع أسطح القاهرة',
    location: 'القاهرة',
    funded: 45000,
    target: 60000,
    status: 'جاري التنفيذ',
    icon: Leaf,
    description: 'مشروع زراعة عضوية على أسطح المنازل'
  },
  {
    id: '3',
    title: 'أسطول توصيل الإسكندرية',
    location: 'الإسكندرية',
    funded: 130000,
    target: 130000,
    status: 'تم التوثيق',
    icon: Truck,
    description: 'شراء مركبات توصيل سريع'
  },
  {
    id: '4',
    title: 'سلسلة مقاهي القاهرة الجديدة',
    location: 'القاهرة الجديدة',
    funded: 80000,
    target: 100000,
    status: 'جاري التنفيذ',
    icon: Coffee,
    description: 'افتتاح فروع مقاهي عصرية'
  },
  {
    id: '5',
    title: 'مستحضرات تجميل عشبية',
    location: 'قنا',
    funded: 75000,
    target: 75000,
    status: 'تم التوثيق',
    icon: Sparkles,
    description: 'إنتاج مستحضرات تجميل طبيعية'
  }
];

export default function ProjectsShowcase() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          مشاريع بنستثمر فيها
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          نستثمر أموالك في مشاريع حقيقية مدروسة لضمان عوائد آمنة ومستدامة
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const Icon = project.icon;
          const progressPercent = (project.funded / project.target) * 100;
          const isCompleted = project.status === 'تم التوثيق';

          return (
            <Card 
              key={project.id} 
              className="glassmorphism card-3d overflow-hidden group"
            >
              <CardHeader className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600'
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold">{project.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{project.location}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={isCompleted ? "default" : "secondary"}
                    className={isCompleted 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>المبلغ المُجمع:</span>
                    <span className="font-bold">{project.funded.toLocaleString()} ج.م</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>الهدف:</span>
                    <span className="font-bold">{project.target.toLocaleString()} ج.م</span>
                  </div>
                  
                  <Progress 
                    value={progressPercent} 
                    className="h-2"
                  />
                  
                  <div className="text-center text-sm font-medium">
                    {progressPercent.toFixed(1)}% مكتمل
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full hover:bg-primary/10"
                  onClick={() => {/* Handle view details */}}
                >
                  شوف التفاصيل
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 max-w-4xl mx-auto">
          <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">
            💡 كيف نختار المشاريع؟
          </h3>
          <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
            نقوم بدراسة جدوى شاملة لكل مشروع ونختار المشاريع ذات العوائد المضمونة والمخاطر المحسوبة لضمان حماية استثماراتك
          </p>
        </div>
      </div>
    </div>
  );
}