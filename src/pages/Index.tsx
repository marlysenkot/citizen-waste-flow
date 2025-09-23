import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductCatalog } from "@/components/ProductCatalog";
import { WasteEducation } from "@/components/WasteEducation";
import { AboutUs } from "@/components/AboutUs";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProductCatalog />
        <WasteEducation />
        <AboutUs />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
