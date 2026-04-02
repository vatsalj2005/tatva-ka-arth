import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoryBlocks from '@/components/CategoryBlocks';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CategoryBlocks />
      <Footer />
    </div>
  );
};

export default Index;
