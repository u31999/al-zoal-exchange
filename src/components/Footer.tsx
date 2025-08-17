import { useLanguage } from '@/contexts/LanguageContext';
import NexusPixelLogo from '../res/n-pixel.png';


const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="hero-gradient text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          {/* 
          <div>
            <h3 className="text-xl font-bold mb-4">{t('siteName')}</h3>
            <p className="text-white/80 mb-4">
              {t('tagline')}
            </p>
            <div className="text-white/60 text-sm">
              {t('copyright')}
            </div>
          </div>
          */}

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">روابط سريعة | Quick Links</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('reverseTransfer')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('standardTransfer')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('arabTransfers')}
                </a>
              </li>
              {/*
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('aboutUs')}
                </a>
              </li>
               */}
            </ul>
          </div>

          {/* Legal */}
          {/* 
          <div>
            <h4 className="font-semibold mb-4">قانوني | Legal</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('privacyPolicy')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('termsOfUse')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('contactUs')}
                </a>
              </li>
            </ul>
          </div>
          */}
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60">
          <a href='https://nexus-pixel.com/' target='_blank' 
          className="flex flex-row-reverse justify-center items-center">
         <div className="flex items-center gap-2 text-white text-sm">
      
      <span>
        Developed by{' '}
        <span className="font-semibold text-green-400">Nexus Pixel</span>
      </span>
    </div>
          </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;