import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  timeAgo: string;
  rating: number;
  comment: string;
  plan?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    location: 'المنصورة',
    timeAgo: 'من 3 أيام',
    rating: 5,
    comment: 'الفلوس وصلت زي ما وعدتوا، خدمة محترمة وسريعة. انا استثمرت في خطة Fast Rise وحصلت على العائد في الوقت المحدد.',
    plan: 'Fast Rise'
  },
  {
    id: '2',
    name: 'فاطمة أحمد',
    location: 'القاهرة',
    timeAgo: 'من 5 أيام',
    rating: 5,
    comment: 'العقد كان احترافي جدًا ومفصل، والخدمة ممتازة. فريق الدعم بيرد بسرعة على كل الاستفسارات.',
    plan: 'Power Investor'
  },
  {
    id: '3',
    name: 'محمد عبدالله',
    location: 'الإسكندرية',
    timeAgo: 'من أسبوع',
    rating: 5,
    comment: 'خدمة محترمة وناس بترد بسرعة. استثمرت مبلغ صغير في البداية وكانت التجربة ممتازة، هبدأ استثمارات أكبر قريب.',
    plan: 'Quick Boost'
  },
  {
    id: '4',
    name: 'نورا حسن',
    location: 'الجيزة',
    timeAgo: 'من أسبوعين',
    rating: 5,
    comment: 'منصة موثوقة وآمنة، والعوائد حقيقية مش وهم. التعامل مع فودافون كاش سهل جداً ومريح.',
    plan: 'Double Return'
  },
  {
    id: '5',
    name: 'كريم سامي',
    location: 'طنطا',
    timeAgo: 'من شهر',
    rating: 5,
    comment: 'بصراحة كنت متردد في البداية، بس دلوقتي بقيت عميل دائم. الشفافية والمصداقية عالية جداً.',
    plan: 'Elite Plus'
  },
  {
    id: '6',
    name: 'هبة محمود',
    location: 'أسوان',
    timeAgo: 'من شهر',
    rating: 5,
    comment: 'أفضل منصة استثمار جربتها في مصر. الفريق محترف والنتائج مضمونة. شكراً فلوس كاش!',
    plan: 'Fast Rise'
  }
];

export default function Testimonials() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
          آراء عملائنا
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          اكتشف تجارب عملائنا الحقيقية ونجاحاتهم في الاستثمار معنا
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card 
            key={testimonial.id} 
            className="glassmorphism card-3d group"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{testimonial.location}</span>
                    <span>•</span>
                    <span>{testimonial.timeAgo}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <blockquote className="text-sm leading-relaxed text-muted-foreground italic">
                "{testimonial.comment}"
              </blockquote>

              {testimonial.plan && (
                <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium">
                  خطة {testimonial.plan}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 max-w-4xl mx-auto">
          <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
            ⭐ تقييم عملائنا
          </h3>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-lg font-bold text-yellow-800 dark:text-yellow-200">4.9</span>
            <span className="text-yellow-700 dark:text-yellow-300 text-sm">(+2000 تقييم)</span>
          </div>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm">
            أكثر من 95% من عملائنا يوصون بخدماتنا لأصدقائهم وعائلاتهم
          </p>
        </div>
      </div>
    </div>
  );
}