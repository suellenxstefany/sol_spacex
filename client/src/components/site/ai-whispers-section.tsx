import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle, Lightbulb, Heart } from "lucide-react";
import { JournalForm } from "./journal-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AIWhispersSection() {
  const [isInteractive, setIsInteractive] = useState(false);

  // Toggle between example and interactive modes
  const toggleInteractive = () => {
    setIsInteractive(!isInteractive);
  };

  return (
    <section id="ai-whispers" className="py-24 bg-white/70 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-dancing text-4xl md:text-5xl text-[#C19B97] mb-3">AI Whispers</h2>
            <h3 className="font-cormorant text-xl text-[#5D5348]/80 mb-6 italic mx-auto max-w-2xl">
              Gentle wisdom from your personal AI companion that offers insights based on your journaling patterns
            </h3>
          </motion.div>
        </div>

        <Tabs defaultValue={isInteractive ? "interactive" : "example"} className="relative" onValueChange={(value) => setIsInteractive(value === "interactive")}>
          <div className="flex justify-center mb-8">
            <TabsList className="bg-[#F9F5F2] border border-[#C19B97]/10">
              <TabsTrigger 
                value="example" 
                className="data-[state=active]:bg-white data-[state=active]:text-[#5D5348] text-[#5D5348]/70 font-cormorant text-lg"
              >
                Examples
              </TabsTrigger>
              <TabsTrigger 
                value="interactive" 
                className="data-[state=active]:bg-white data-[state=active]:text-[#5D5348] text-[#5D5348]/70 font-cormorant text-lg"
              >
                Try It Now
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="example">
            <div className="flex flex-col-reverse md:flex-row items-center gap-16">
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative">
                  <div className="relative">
                    {/* Whispers Visualization */}
                    <motion.div 
                      className="relative mb-8"
                      initial={{ y: 0 }}
                      animate={{ y: [-5, 0, -5] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#C19B97]/20 to-[#C19B97]/5 rounded-lg blur-sm"></div>
                      <div className="relative bg-white p-6 rounded-lg border border-[#C19B97]/10 shadow-sm">
                        <div className="flex items-center mb-4">
                          <MessageCircle className="h-5 w-5 text-[#C19B97] mr-3" />
                          <h4 className="font-cormorant text-xl font-medium text-[#5D5348]">AI Whisper</h4>
                        </div>
                        <p className="text-[#5D5348]/80 italic font-cormorant text-lg">
                          "I notice you often mention feeling overwhelmed in the mornings. Would a gentle morning ritual help create a more peaceful start to your day?"
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="relative ml-10 mb-8"
                      initial={{ y: 0 }}
                      animate={{ y: [-5, 0, -5] }}
                      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#C19B97]/20 to-[#C19B97]/5 rounded-lg blur-sm"></div>
                      <div className="relative bg-white p-6 rounded-lg border border-[#C19B97]/10 shadow-sm">
                        <div className="flex items-center mb-4">
                          <Lightbulb className="h-5 w-5 text-[#C19B97] mr-3" />
                          <h4 className="font-cormorant text-xl font-medium text-[#5D5348]">Insight</h4>
                        </div>
                        <p className="text-[#5D5348]/80 italic font-cormorant text-lg">
                          "Your journaling shows a pattern: creativity tends to flow after your evening walks. This connection between movement and inspiration seems significant."
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="relative ml-4"
                      initial={{ y: 0 }}
                      animate={{ y: [-5, 0, -5] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#C19B97]/20 to-[#C19B97]/5 rounded-lg blur-sm"></div>
                      <div className="relative bg-white p-6 rounded-lg border border-[#C19B97]/10 shadow-sm">
                        <div className="flex items-center mb-4">
                          <Heart className="h-5 w-5 text-[#C19B97] mr-3" />
                          <h4 className="font-cormorant text-xl font-medium text-[#5D5348]">Reflection</h4>
                        </div>
                        <p className="text-[#5D5348]/80 italic font-cormorant text-lg">
                          "When you wrote about that difficult conversation, you showed great self-awareness. Would you like to explore what helped you stay grounded in that moment?"
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-lg text-[#5D5348]/80 mb-8 leading-relaxed">
                  Gentle AI companions that offer insights based on your journaling patterns, without judgment or prescription. Like a wise friend who listens deeply.
                </p>
                
                <ul className="space-y-5 mb-10">
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 text-[#C19B97]">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <p className="text-[#5D5348]/80">
                      <span className="font-medium text-[#5D5348]">Pattern Recognition</span> — Discover emotional patterns you might not see on your own.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 text-[#C19B97]">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <p className="text-[#5D5348]/80">
                      <span className="font-medium text-[#5D5348]">Gentle Questions</span> — Receive thoughtful inquiries that deepen your self-understanding.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 text-[#C19B97]">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <p className="text-[#5D5348]/80">
                      <span className="font-medium text-[#5D5348]">Private & Secure</span> — Your thoughts remain completely confidential and protected.
                    </p>
                  </li>
                </ul>
                
                <Button 
                  onClick={toggleInteractive}
                  className="inline-flex items-center px-7 py-3 h-auto rounded-full bg-[#C19B97] text-white hover:bg-[#A88A86] hover:scale-105 transition-all"
                >
                  <span>Experience AI Whispers</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Button>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="interactive">
            <div className="max-w-4xl mx-auto">
              <div className="bg-[#F9F5F2]/50 p-8 rounded-xl border border-[#C19B97]/10 shadow-sm">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="font-cormorant text-2xl text-[#5D5348] text-center mb-8">
                    Experience AI Whispers
                  </h3>
                  <JournalForm />
                  
                  <div className="mt-10 text-center text-[#5D5348]/70 text-sm">
                    <p>Your journal entries are private and will not be saved after you leave this page.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
