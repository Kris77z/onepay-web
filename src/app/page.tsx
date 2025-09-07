import Navbar from "@/components/sections/navbar";
import { PremiumHero } from "@/components/ui/hero";
import Features from "@/components/sections/features";
import SupportedAssets from "@/components/sections/supported-assets";
import Testimonials from "@/components/sections/testimonials";
import Faq from "@/components/sections/faq";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <PremiumHero />
        <Features />
        <SupportedAssets />
        <Testimonials />
        <section id="faq">
          <Faq />
        </section>
      </main>
      <Footer />
    </div>
  );
}
