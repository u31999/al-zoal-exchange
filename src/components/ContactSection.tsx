import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t('contactUs')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="card-gradient">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MessageSquare className="w-6 h-6 text-primary mr-3" />
                  <h3 className="font-semibold text-lg">{t('whatsapp')}</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  تواصل معنا عبر واتساب للحصول على المساعدة الفورية
                </p>
                <Button className="btn-primary w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  +966 50 123 4567
                </Button>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Phone className="w-6 h-6 text-primary mr-3" />
                  <h3 className="font-semibold text-lg">الهاتف | Phone</h3>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <p>السعودية: +966 11 234 5678</p>
                  <p>الإمارات: +971 4 567 8901</p>
                  <p>السودان: +249 183 456 789</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Mail className="w-6 h-6 text-primary mr-3" />
                  <h3 className="font-semibold text-lg">{t('email')}</h3>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <p>info@afrotransfers.com</p>
                  <p>support@afrotransfers.com</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-primary mr-3" />
                  <h3 className="font-semibold text-lg">المكاتب | Offices</h3>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <div>
                    <p className="font-medium">الرياض، السعودية</p>
                    <p className="text-sm">شارع التحلية، الرياض 12345</p>
                  </div>
                  <div>
                    <p className="font-medium">دبي، الإمارات</p>
                    <p className="text-sm">شارع الشيخ زايد، دبي</p>
                  </div>
                  <div>
                    <p className="font-medium">الخرطوم، السودان</p>
                    <p className="text-sm">شارع الجامعة، الخرطوم</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>إرسال رسالة | Send Message</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      الاسم | Name
                    </label>
                    <Input 
                      className="form-input" 
                      placeholder="أدخل اسمك"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      البريد الإلكتروني | Email
                    </label>
                    <Input 
                      type="email"
                      className="form-input" 
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    الهاتف | Phone
                  </label>
                  <Input 
                    type="tel"
                    className="form-input" 
                    placeholder="+966 50 123 4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    الموضوع | Subject
                  </label>
                  <Input 
                    className="form-input" 
                    placeholder="موضوع الرسالة"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    الرسالة | Message
                  </label>
                  <Textarea 
                    className="form-input min-h-[120px]" 
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>

                <Button className="btn-primary w-full text-lg py-6">
                  <Mail className="w-4 h-4 mr-2" />
                  إرسال الرسالة | Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Social Media */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-6">{t('socialMedia')}</h3>
          <div className="flex justify-center space-x-4 rtl:space-x-reverse">
            {[
              { name: 'Facebook', icon: '📘', link: '#' },
              { name: 'Twitter', icon: '🐦', link: '#' },
              { name: 'Instagram', icon: '📷', link: '#' },
              { name: 'LinkedIn', icon: '💼', link: '#' },
              { name: 'YouTube', icon: '📺', link: '#' }
            ].map((social) => (
              <Button
                key={social.name}
                variant="outline"
                size="lg"
                className="w-12 h-12 rounded-full"
              >
                <span className="text-xl">{social.icon}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;