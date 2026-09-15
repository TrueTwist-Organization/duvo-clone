import { AutomationSection } from "@/components/AutomationSection";
import { Hero } from "@/components/Hero";
import { PartnersAndOutcomes } from "@/components/PartnersAndOutcomes";
import { ProductJourney } from "@/components/ProductJourney";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { StartForm } from "@/components/StartForm";
import { Stories } from "@/components/Stories";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <PartnersAndOutcomes />
        <ProductJourney />
        <AutomationSection />
        <Stories />
        <Testimonials />
        <StartForm />
      </main>
      <SiteFooter />
    </>
  );
}
