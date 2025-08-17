import { useState } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import ReverseTransferTab from '@/components/ReverseTransferTab';
import StandardTransferTab from '@/components/StandardTransferTab';
import ArabTransfersTab from '@/components/ArabTransfersTab';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

type TabType = 'reverse' | 'standard' | 'arab';

const MainContent = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('reverse');

  const tabs = [
    { id: 'reverse' as TabType, label: t('reverseTransfer') },
    { id: 'standard' as TabType, label: t('standardTransfer') },
    { id: 'arab' as TabType, label: t('arabTransfers') }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'reverse':
        return <ReverseTransferTab />;
      case 'standard':
        return <StandardTransferTab />;
      case 'arab':
        return <ArabTransfersTab />;
      default:
        return <ReverseTransferTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Tabs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'tab-active' 
                    : 'tab-inactive'
                }`}
                variant={activeTab === tab.id ? "default" : "outline"}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {renderTabContent()}
          </div>
        </div>
      </section>
{/* 
      <AboutSection />
      <ContactSection />
      */}
      <Footer />
    </div>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
};

export default Index;
