import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertUserSchema } from "@shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Coins, Shield, TrendingUp, Users, Moon, Sun } from "lucide-react";

const loginSchema = insertUserSchema.pick({ username: true, password: true });
const registerSchema = insertUserSchema;

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullName: "",
      nationalId: "",
      phone: "",
      job: "",
      address: "",
    },
  });

  if (user) {
    return <Redirect to="/" />;
  }

  const onLoginSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: RegisterForm) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex">
      {/* Theme Toggle */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleTheme} 
        className="fixed top-4 left-4 z-50 glassmorphism-card"
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>

      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Card className="glassmorphism-card border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold baby-blue dark:golden">
                <Coins className="inline mr-2" />
                فلوس كاش
              </CardTitle>
              <CardDescription className="text-lg">
                {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLogin ? (
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>اسم المستخدم</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="أدخل اسم المستخدم" 
                              className="glassmorphism border-0" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>كلمة المرور</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="أدخل كلمة المرور" 
                              className="glassmorphism border-0" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full glow-button bg-baby-blue dark:bg-golden text-white dark:text-black" 
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? "جاري التسجيل..." : "دخول"}
                    </Button>
                  </form>
                </Form>
              ) : (
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الاسم الكامل</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل الاسم الكامل" className="glassmorphism border-0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="nationalId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الرقم القومي</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل الرقم القومي" className="glassmorphism border-0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رقم الهاتف</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل رقم الهاتف" className="glassmorphism border-0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="job"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الوظيفة</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل الوظيفة" className="glassmorphism border-0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>العنوان</FormLabel>
                          <FormControl>
                            <Textarea placeholder="أدخل العنوان" className="glassmorphism border-0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>اسم المستخدم</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل اسم المستخدم" className="glassmorphism border-0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>البريد الإلكتروني</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="أدخل البريد الإلكتروني" className="glassmorphism border-0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>كلمة المرور</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="أدخل كلمة المرور" className="glassmorphism border-0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full glow-button bg-baby-blue dark:bg-golden text-white dark:text-black" 
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? "جاري إنشاء الحساب..." : "سجّل دلوقتي"}
                    </Button>
                  </form>
                </Form>
              )}
              
              <div className="text-center mt-6">
                <p className="text-gray-600 dark:text-gray-300">
                  {isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}
                  <Button 
                    variant="link" 
                    onClick={() => setIsLogin(!isLogin)} 
                    className="baby-blue dark:golden font-semibold"
                  >
                    {isLogin ? "سجّل الآن" : "سجّل دخول"}
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Hero */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-baby-blue/20 to-transparent">
        <div className="text-center max-w-lg">
          <div className="floating mb-8">
            <div className="w-32 h-32 bg-baby-blue dark:bg-golden rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Coins className="h-16 w-16 text-white dark:text-black" />
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
            مرحباً بك في
            <span className="baby-blue dark:golden"> فلوس كاش</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            منصة الخدمات المالية الموثوقة في مصر. انضم لآلاف العملاء الذين يثقون في خدماتنا المتميزة
          </p>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="glassmorphism-card p-4 rounded-2xl">
              <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h5 className="font-bold text-gray-800 dark:text-white">آمان كامل</h5>
            </div>
            <div className="glassmorphism-card p-4 rounded-2xl">
              <TrendingUp className="h-8 w-8 baby-blue dark:golden mx-auto mb-2" />
              <h5 className="font-bold text-gray-800 dark:text-white">عوائد عالية</h5>
            </div>
            <div className="glassmorphism-card p-4 rounded-2xl">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h5 className="font-bold text-gray-800 dark:text-white">10,000+ عميل</h5>
            </div>
            <div className="glassmorphism-card p-4 rounded-2xl">
              <Coins className="h-8 w-8 text-yellow-500 dark:text-golden mx-auto mb-2" />
              <h5 className="font-bold text-gray-800 dark:text-white">خدمات متميزة</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
