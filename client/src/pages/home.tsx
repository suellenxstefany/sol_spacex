import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { HeroSection } from "@/components/site/hero-section";
import { AboutSection } from "@/components/site/about-section";
import { FeaturesSection } from "@/components/site/features-section";
import { GardenSection } from "@/components/site/garden-section";
import { SupportToolsSection } from "@/components/site/support-tools-section";
import { ContactSection } from "@/components/site/contact-section";
import { CurveSeparator } from "@/components/site/curve-separator";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        
        {/* Curve Separator from cream to white */}
        <CurveSeparator bgColor="#FFF9E6" />
        
        {/* Features section now contains both Journaling and AI Whispers */}
        <FeaturesSection />
        
        {/* Curve Separator from lavender to white */}
        <CurveSeparator bgColor="#F0EBFA" />
        
        {/* "The Garden" section */}
        <div id="garden">
          <GardenSection />
        </div>
        
        {/* Support Tools Section */}
        <div id="support-tools">
          <SupportToolsSection />
        </div>
        
        {/* Curve Separator from white to cream */}
        <div className="curve-separator bg-[#FFF9E6]">
          <div className="curve-top bg-white"></div>
        </div>
        
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
