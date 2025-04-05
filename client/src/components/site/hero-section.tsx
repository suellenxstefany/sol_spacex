import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export function HeroSection() {
  return (
    <section className="pt-32 pb-28 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            className="mb-1" // Reduced margin to bring elements closer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-center justify-center">
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Logo size="xxlarge" withText={false} />
              </motion.div>
              <motion.h1 
                className="font-dancing text-5xl md:text-7xl font-medium text-[#C19B97] leading-tight mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Sol Space
              </motion.h1>
            </div>
          </motion.div>
          
          <motion.p 
            className="mb-3 font-cormorant text-xl md:text-2xl text-[#5D5348] italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            A serene sanctuary for emotional wellbeing
          </motion.p>
          
          <motion.p 
            className="mt-6 text-lg md:text-xl text-[#5D5348]/90 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            A calm, elegant space where mindfulness meets gentle technology to support your personal journey.
          </motion.p>
          
          <motion.div 
            className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button 
              asChild
              className="px-8 py-6 h-auto rounded-full bg-[#C19B97] text-white hover:bg-[#A88A86] hover:scale-105 transition-all font-medium"
            >
              <a href="#features">Explore Features</a>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="px-8 py-6 h-auto rounded-full border border-[#C19B97] text-[#5D5348] hover:bg-[#C19B97]/10 hover:scale-105 transition-all"
            >
              <a href="#about">Learn More</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
