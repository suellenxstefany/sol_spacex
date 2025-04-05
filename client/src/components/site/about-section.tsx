import { motion } from "framer-motion";
import { Heart, Lightbulb, Flower } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-dancing text-4xl md:text-5xl text-[#C19B97] mb-3">Our Philosophy</h2>
            <p className="font-cormorant text-xl text-[#5D5348]/80 max-w-2xl mx-auto">
              A gentle approach to emotional wellbeing, guided by acceptance and mindfulness
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Card 1 */}
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-[#C19B97]/30 flex items-center justify-center group-hover:border-[#C19B97] transition-all">
                <Heart className="h-7 w-7 text-[#C19B97]" />
              </div>
              <h3 className="font-cormorant text-2xl font-medium text-[#5D5348] text-center mb-4">Emotional Presence</h3>
              <p className="text-[#5D5348]/80 text-center font-light leading-relaxed">
                We believe in honoring every emotion as a valid part of your human experience. No judgment, only acceptance.
              </p>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-[#C19B97]/30 flex items-center justify-center group-hover:border-[#C19B97] transition-all">
                <Lightbulb className="h-7 w-7 text-[#C19B97]" />
              </div>
              <h3 className="font-cormorant text-2xl font-medium text-[#5D5348] text-center mb-4">Gentle Wisdom</h3>
              <p className="text-[#5D5348]/80 text-center font-light leading-relaxed">
                Knowledge becomes wisdom when offered with kindness. Our AI whispers are designed to support, not direct.
              </p>
            </motion.div>
            
            {/* Card 3 */}
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-[#C19B97]/30 flex items-center justify-center group-hover:border-[#C19B97] transition-all">
                <Flower className="h-7 w-7 text-[#C19B97]" />
              </div>
              <h3 className="font-cormorant text-2xl font-medium text-[#5D5348] text-center mb-4">Growth Through Peace</h3>
              <p className="text-[#5D5348]/80 text-center font-light leading-relaxed">
                True transformation happens in spaces of safety and serenity. Our garden nurtures your emotional growth.
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-xl text-[#5D5348]/80 italic font-cormorant">
              "In the garden of your heart, every emotion is a flower deserving of sunlight."
            </p>
            <p className="mt-2 text-[#C19B97] font-dancing text-lg">— Sol Space Wisdom</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
