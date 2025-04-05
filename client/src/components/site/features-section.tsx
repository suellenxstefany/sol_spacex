import { JournalingSection } from "./journaling-section";
import { AIWhispersSection } from "./ai-whispers-section";
import { motion } from "framer-motion";

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light text-[#333333] mb-4">
            Experience <span className="text-[#BD8C87]">Gentle Support</span>
          </h2>
          <p className="text-lg text-[#333333]/70 max-w-2xl mx-auto">
            Sol Space offers thoughtfully designed tools to nurture your emotional wellbeing journey
          </p>
        </motion.div>
        
        <div className="mt-12">
          {/* Individual feature sections */}
          <JournalingSection />
          
          {/* Curve Separator from white to lavender */}
          <div className="curve-separator bg-[#F0EBFA]">
            <div className="curve-top bg-white"></div>
          </div>
          
          <AIWhispersSection />
        </div>
      </div>
    </section>
  );
}