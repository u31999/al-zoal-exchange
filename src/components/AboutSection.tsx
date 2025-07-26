import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Clock, Award, DollarSign } from 'lucide-react';

const AboutSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      titleKey: 'secureEncryption',
      descKey: 'secureDesc'
    },
    {
      icon: Award,
      titleKey: 'licensed',
      descKey: 'licensedDesc'
    },
    {
      icon: Clock,
      titleKey: 'fastDelivery',
      descKey: 'fastDesc'
    },
    {
      icon: DollarSign,
      titleKey: 'transparent',
      descKey: 'transparentDesc'
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* About Us */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t('aboutUs')}
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('aboutText')}
            </p>
          </div>
        </div>

        {/* Why Trust Us */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            {t('whyTrustUs')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="card-gradient text-center hover:card-elevated transition-all duration-300">
                <CardContent className="p-6">
                  <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-3">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t(feature.descKey)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            {t('testimonials')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <Card key={num} className="card-gradient">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      {num}
                    </div>
                    <div className="mr-4">
                      <div className="font-semibold">عميل راضي</div>
                      <div className="text-sm text-muted-foreground">Satisfied Customer</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "{t(`testimonial${num}`)}"
                  </p>
                  <div className="flex justify-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;