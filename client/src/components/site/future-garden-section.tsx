import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookHeart, Users, CalendarHeart, Bell } from "lucide-react";

export function FutureGardenSection() {
  return (
    <section id="garden" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-[#E4EFD9]/30 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light text-[#333333]">The Garden</h2>
          <div className="w-20 h-1 bg-[#BD8C87] mx-auto mt-4"></div>
          <p className="mt-6 text-lg text-[#333333]/80 leading-relaxed">
            We're cultivating a collection of tools to nurture your emotional wellbeing. Here's what's growing in our garden:
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#BD8C87]/20 to-[#E2D9F3]/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-white p-8 rounded-2xl shadow-lg group-hover:shadow-xl transition-all">
              <div className="w-16 h-16 mb-6 rounded-full bg-[#E4EFD9] flex items-center justify-center">
                <BookHeart className="h-7 w-7 text-[#BD8C87]" />
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#333333] mb-4">Guided Meditations</h3>
              <p className="text-[#333333]/80 mb-4">
                Voice-guided meditations tailored to your emotional needs, based on your journaling patterns.
              </p>
              <div className="flex items-center text-[#BD8C87] font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Coming Summer 2025</span>
              </div>
            </div>
          </motion.div>
          
          {/* Card 2 */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E2D9F3]/20 to-[#D1E2C4]/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-white p-8 rounded-2xl shadow-lg group-hover:shadow-xl transition-all">
              <div className="w-16 h-16 mb-6 rounded-full bg-[#F0EBFA] flex items-center justify-center">
                <Users className="h-7 w-7 text-[#BD8C87]" />
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#333333] mb-4">Community Circles</h3>
              <p className="text-[#333333]/80 mb-4">
                Optional small communities for shared growth, with privacy controls and guided discussions.
              </p>
              <div className="flex items-center text-[#BD8C87] font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Coming Fall 2025</span>
              </div>
            </div>
          </motion.div>
          
          {/* Card 3 */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D1E2C4]/20 to-[#FFF9E6]/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-white p-8 rounded-2xl shadow-lg group-hover:shadow-xl transition-all">
              <div className="w-16 h-16 mb-6 rounded-full bg-[#E8D0CC] flex items-center justify-center">
                <CalendarHeart className="h-7 w-7 text-[#BD8C87]" />
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#333333] mb-4">Emotional Rituals</h3>
              <p className="text-[#333333]/80 mb-4">
                Personalized daily practices to honor your emotions and build emotional resilience.
              </p>
              <div className="flex items-center text-[#BD8C87] font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Coming Winter 2025</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button 
            asChild
            className="inline-flex items-center px-8 py-3 h-auto rounded-full bg-[#D1E2C4] text-[#333333] hover:bg-[#B3C8A4] hover:scale-105 transition-all font-medium"
          >
            <a href="#contact">
              <Bell className="mr-2 h-5 w-5" />
              <span>Get Notified About New Features</span>
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
