import { Header } from "@/components/Header";
import { ServiceCatalog } from "@/components/ServiceCatalog";

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ServiceCatalog />
    </div>
  );
}