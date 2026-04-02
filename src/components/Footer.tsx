import { useApp } from '@/contexts/AppContext';

const Footer = () => {
  const { t } = useApp();

  return (
    <footer className="border-t border-border/50 py-8 px-4 relative" style={{ zIndex: 1 }}>
      <div className="container mx-auto text-center">
        <p className="text-gold font-heading text-lg mb-2">🙏 {t('siteName')}</p>
        <p className="text-sm text-muted-foreground">{t('siteTagline')}</p>
      </div>
    </footer>
  );
};

export default Footer;
