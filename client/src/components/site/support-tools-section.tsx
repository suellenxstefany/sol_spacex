import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CurveSeparator } from './curve-separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, Heart, Clock, BookOpen, Leaf, Music, Feather } from 'lucide-react';

type SupportTool = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  content: string;
  category: 'meditation' | 'journaling' | 'mindfulness';
};

const supportTools: SupportTool[] = [
  {
    id: 'breathing',
    title: 'Breathing Exercises',
    description: 'Guided techniques to calm your mind and body',
    icon: <Feather className="h-6 w-6 text-[#C19B97]" />,
    content: 'Practice deep breathing by inhaling for 4 counts, holding for 7, and exhaling for 8. This technique, known as 4-7-8 breathing, helps activate your parasympathetic nervous system, promoting relaxation and reducing anxiety.',
    category: 'meditation'
  },
  {
    id: 'gratitude',
    title: 'Gratitude Practice',
    description: 'Cultivate appreciation in everyday moments',
    icon: <Heart className="h-6 w-6 text-[#C19B97]" />,
    content: "Begin each morning by noting three things you're grateful for. They can be as simple as a warm cup of tea or as profound as a meaningful relationship. This practice shifts your focus toward positivity and abundance.",
    category: 'journaling'
  },
  {
    id: 'body-scan',
    title: 'Body Scan Meditation',
    description: 'Connect with your physical sensations',
    icon: <Leaf className="h-6 w-6 text-[#C19B97]" />,
    content: 'Find a comfortable position and close your eyes. Slowly bring awareness to each part of your body, starting at your toes and moving upward. Notice any sensations without judgment, allowing tension to soften with each breath.',
    category: 'meditation'
  },
  {
    id: 'emotional-check',
    title: 'Emotional Check-In',
    description: 'Name and acknowledge your feelings',
    icon: <Lightbulb className="h-6 w-6 text-[#C19B97]" />,
    content: "Take a moment to identify what emotions are present right now. Name them specifically (e.g., \"I'm feeling frustrated and a bit anxious\"). This simple act of labeling helps process emotions and reduces their intensity.",
    category: 'mindfulness'
  },
  {
    id: 'nature-journal',
    title: 'Nature Connection',
    description: 'Deepen your connection with the natural world',
    icon: <Leaf className="h-6 w-6 text-[#C19B97]" />,
    content: 'Spend time observing something natural - a plant, the sky, or even the pattern of raindrops on a window. Write about its qualities, how it changes, and what it reminds you of. This practice grounds you in the present and fosters a sense of connection.',
    category: 'journaling'
  },
  {
    id: 'sound-bath',
    title: 'Sound Meditation',
    description: 'Immerse yourself in healing sounds',
    icon: <Music className="h-6 w-6 text-[#C19B97]" />,
    content: 'Choose a calming sound like gentle bells, singing bowls, or nature sounds. Close your eyes and follow the sounds as they arise and fade. Notice how they affect your body and mind, creating space for relaxation and renewal.',
    category: 'meditation'
  },
  {
    id: 'mindful-moment',
    title: 'Mindful Moments',
    description: 'Anchor yourself in present awareness',
    icon: <Clock className="h-6 w-6 text-[#C19B97]" />,
    content: 'Throughout your day, pause for 30-second mindful moments. Notice five things you can see, four things you can touch, three things you can hear, two things you can smell, and one thing you can taste. This practice interrupts autopilot and refreshes your awareness.',
    category: 'mindfulness'
  },
  {
    id: 'reflective-prompts',
    title: 'Reflective Prompts',
    description: 'Thought-provoking questions for deeper insight',
    icon: <BookOpen className="h-6 w-6 text-[#C19B97]" />,
    content: "Explore questions like 'What gave me energy today?' or 'What would I tell my younger self about this situation?' These prompts invite deeper reflection and can reveal patterns and insights you might otherwise miss.",
    category: 'journaling'
  }
];

export function SupportToolsSection() {
  const [selectedTool, setSelectedTool] = useState<SupportTool | null>(null);

  return (
    <section id="support-tools" className="relative py-24 bg-[#F9F5F2]">
      <CurveSeparator bgColor="#F9F5F2" topCurve={true} />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="font-dancing text-4xl md:text-5xl font-medium text-[#C19B97] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Garden of Support Tools
          </motion.h2>
          <motion.p 
            className="text-[#5D5348] text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Explore our collection of gentle practices to nurture your emotional wellbeing
          </motion.p>
        </div>

        <Tabs defaultValue="all" className="w-full max-w-5xl mx-auto">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-[#F1EBE4] p-1">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-white data-[state=active]:text-[#C19B97] px-6"
              >
                All Tools
              </TabsTrigger>
              <TabsTrigger 
                value="meditation" 
                className="data-[state=active]:bg-white data-[state=active]:text-[#C19B97] px-6"
              >
                Meditation
              </TabsTrigger>
              <TabsTrigger 
                value="journaling" 
                className="data-[state=active]:bg-white data-[state=active]:text-[#C19B97] px-6"
              >
                Journaling
              </TabsTrigger>
              <TabsTrigger 
                value="mindfulness" 
                className="data-[state=active]:bg-white data-[state=active]:text-[#C19B97] px-6"
              >
                Mindfulness
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} onSelect={() => setSelectedTool(tool)} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="meditation" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportTools
                .filter(tool => tool.category === 'meditation')
                .map((tool) => (
                  <ToolCard key={tool.id} tool={tool} onSelect={() => setSelectedTool(tool)} />
                ))
              }
            </div>
          </TabsContent>

          <TabsContent value="journaling" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportTools
                .filter(tool => tool.category === 'journaling')
                .map((tool) => (
                  <ToolCard key={tool.id} tool={tool} onSelect={() => setSelectedTool(tool)} />
                ))
              }
            </div>
          </TabsContent>

          <TabsContent value="mindfulness" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportTools
                .filter(tool => tool.category === 'mindfulness')
                .map((tool) => (
                  <ToolCard key={tool.id} tool={tool} onSelect={() => setSelectedTool(tool)} />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>

        {selectedTool && (
          <motion.div 
            className="mt-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-white border border-[#E2D9D0] shadow-sm overflow-hidden">
              <CardHeader className="bg-[#F9F5F2] border-b border-[#E2D9D0] flex flex-row items-center gap-4 p-6">
                <div className="bg-white p-3 rounded-full">
                  {selectedTool.icon}
                </div>
                <div>
                  <CardTitle className="text-2xl font-dancing text-[#5D5348]">{selectedTool.title}</CardTitle>
                  <CardDescription className="text-[#5D5348]/70">{selectedTool.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-[#5D5348] leading-relaxed">{selectedTool.content}</p>
                
                <div className="mt-6 space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="how-to-practice" className="border-[#E2D9D0]">
                      <AccordionTrigger className="text-[#5D5348] hover:text-[#C19B97] hover:no-underline">
                        How to Practice
                      </AccordionTrigger>
                      <AccordionContent className="text-[#5D5348]/80">
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Set aside 5-10 minutes in a quiet space</li>
                          <li>Begin with a few deep breaths to center yourself</li>
                          <li>Follow the guidance with an attitude of gentle curiosity</li>
                          <li>If your mind wanders, gently bring your attention back</li>
                          <li>Close your practice with gratitude for this moment of self-care</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="benefits" className="border-[#E2D9D0]">
                      <AccordionTrigger className="text-[#5D5348] hover:text-[#C19B97] hover:no-underline">
                        Benefits
                      </AccordionTrigger>
                      <AccordionContent className="text-[#5D5348]/80">
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Reduces stress and anxiety</li>
                          <li>Improves emotional awareness and regulation</li>
                          <li>Enhances focus and clarity</li>
                          <li>Promotes a sense of inner calm and balance</li>
                          <li>Builds resilience to life's challenges</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                
                <div className="mt-8 flex justify-center">
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedTool(null)}
                    className="rounded-full border border-[#C19B97] text-[#5D5348] hover:bg-[#C19B97]/10 transition-all"
                  >
                    Return to Garden
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="mt-20 text-center">
          <p className="text-[#5D5348]/70 italic mb-6">
            "The garden of the self needs tending with gentle, consistent care."
          </p>
          <Button 
            asChild
            className="rounded-full bg-[#C19B97] text-white hover:bg-[#A88A86] hover:scale-105 transition-all px-8 py-2 h-auto"
          >
            <a href="#journaling">Begin Journaling</a>
          </Button>
        </div>
      </div>
      
      <CurveSeparator bgColor="#F9F5F2" topCurve={false} />
    </section>
  );
}

function ToolCard({ tool, onSelect }: { tool: SupportTool; onSelect: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Card 
        className="h-full bg-white border border-[#E2D9D0] shadow-sm overflow-hidden cursor-pointer hover:border-[#C19B97]/50 transition-all duration-300"
        onClick={onSelect}
      >
        <CardHeader className="p-5 flex flex-row items-center space-y-0 gap-4">
          <div className="bg-[#F9F5F2] p-3 rounded-full">
            {tool.icon}
          </div>
          <div>
            <CardTitle className="text-xl font-medium text-[#5D5348]">{tool.title}</CardTitle>
            <CardDescription className="text-[#5D5348]/70">{tool.description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <p className="text-[#5D5348]/80 line-clamp-3">
            {tool.content}
          </p>
          <div className="mt-4">
            <Button 
              variant="ghost" 
              className="p-0 h-auto text-[#C19B97] hover:text-[#A88A86] hover:bg-transparent"
            >
              Explore this practice →
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}