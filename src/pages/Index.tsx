import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ServiceCatalog } from "@/components/ServiceCatalog";
import { ProductShowcase } from "@/components/ProductShowcase";
import { WasteEducation } from "@/components/WasteEducation";
import { WasteMetrics } from "@/components/WasteMetrics";
import { Gamification } from "@/components/Gamification";
import { AboutUs } from "@/components/AboutUs";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ServiceCatalog />
        <ProductShowcase />
        <WasteMetrics />
        <WasteEducation />
        <Gamification />
        <AboutUs />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
