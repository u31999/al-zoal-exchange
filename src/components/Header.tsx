import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 hero-gradient text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo and Tagline */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-1 animate-fade-in-up">
              {t('siteName')}
            </h1>
            <p className="text-white/90 text-sm md:text-base animate-fade-in-up">
              {t('tagline')}
            </p>
          </div>

          {/* Language Toggle */}
          <Button
            onClick={toggleLanguage}
            variant="outline"
            size="sm"
            className="lang-toggle border-white/30 hover:border-white/50 text-black">
            <Globe className="w-4 h-4 mr-2" />
            {t('languageToggle')}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;