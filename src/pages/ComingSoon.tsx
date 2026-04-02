import { Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Construction } from 'lucide-react';

const ComingSoon = ({ title }: { title: string }) => {
  const { t } = useApp();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16 px-4 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Construction className="w-16 h-16 text-gold/50 mx-auto mb-4" />
          <h1 className="text-3xl font-heading text-gradient-gold mb-3">{title}</h1>
          <p className="text-muted-foreground mb-6">{t('comingSoon')}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {t('backToHome')}
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ComingSoon;
