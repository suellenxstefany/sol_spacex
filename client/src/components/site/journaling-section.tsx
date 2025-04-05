import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export function JournalingSection() {
  return (
    <section id="garden" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-dancing text-4xl md:text-5xl text-[#C19B97] mb-3">The Garden</h2>
            <h3 className="font-cormorant text-xl text-[#5D5348]/80 mb-6 italic">Where your emotions bloom and grow</h3>
            
            <p className="text-lg text-[#5D5348]/80 mb-8 leading-relaxed">
              Express your feelings freely in a nurturing space that adapts to your unique emotional landscape. Our emotional journaling garden offers a private sanctuary for reflection and growth.
            </p>
            
            <ul className="space-y-5 mb-10">
              <li className="flex items-start">
                <div className="mr-4 mt-1 text-[#C19B97]">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <p className="text-[#5D5348]/80">
                  <span className="font-medium text-[#5D5348]">Emotion Recognition</span> — Our gentle AI recognizes emotional patterns in your writing to offer personalized insights.
                </p>
              </li>
              <li className="flex items-start">
                <div className="mr-4 mt-1 text-[#C19B97]">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <p className="text-[#5D5348]/80">
                  <span className="font-medium text-[#5D5348]">Reflection Prompts</span> — Thoughtful questions guide deeper self-understanding when you're ready.
                </p>
              </li>
              <li className="flex items-start">
                <div className="mr-4 mt-1 text-[#C19B97]">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <p className="text-[#5D5348]/80">
                  <span className="font-medium text-[#5D5348]">Emotional Timeline</span> — Visualize your emotional journey with beautiful, private analytics.
                </p>
              </li>
            </ul>
            
            <Button 
              asChild
              className="inline-flex items-center px-7 py-3 h-auto rounded-full bg-[#C19B97] text-white hover:bg-[#A88A86] hover:scale-105 transition-all"
            >
              <a href="#">
                <span>Start Journaling</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </Button>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#C19B97]/20 to-[#C19B97]/10 rounded-lg blur-sm"></div>
              <div className="relative bg-white p-8 rounded-lg border border-[#C19B97]/10 shadow-sm">
                <div className="mb-6 pb-4 border-b border-[#C19B97]/10 flex justify-between items-center">
                  <h3 className="font-cormorant text-xl font-medium text-[#5D5348]">My Journal</h3>
                  <div className="text-sm text-[#5D5348]/60">Today, 3:45 PM</div>
                </div>
                <div className="prose max-w-none">
                  <p className="text-[#5D5348]/80 mb-4 leading-relaxed">
                    Today I felt a mixture of anxiety and hope. The project deadline is approaching, but I made good progress and received positive feedback from my team. I noticed my shoulders tensing throughout the day...
                  </p>
                  <p className="text-[#5D5348]/80 leading-relaxed">
                    When I took a walk during lunch, I felt the tension begin to release. The sunshine helped shift my perspective. I'm learning that small breaks make a big difference in how I process stress.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#C19B97]/10">
                  <div className="text-sm text-[#C19B97] font-medium mb-2 font-dancing">Sol Space Reflection</div>
                  <p className="text-sm text-[#5D5348]/70 italic font-cormorant">
                    I notice you've found a connection between physical activity and emotional relief. Would you like to explore other moments when movement has helped shift your emotional state?
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
