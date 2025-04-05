import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { demoJournalSchema, type DemoJournal } from "@shared/schema";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Pen, Heart, Lightbulb, MessageCircle, ArrowDown, Loader2, AlertTriangle, MapPin, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

// Mood options for the journal entry
const moodOptions = [
  { value: "calm", label: "Calm" },
  { value: "happy", label: "Happy" },
  { value: "grateful", label: "Grateful" },
  { value: "anxious", label: "Anxious" },
  { value: "sad", label: "Sad" },
  { value: "frustrated", label: "Frustrated" },
  { value: "neutral", label: "Neutral" },
  { value: "tired", label: "Tired" },
  { value: "curious", label: "Curious" },
  { value: "hopeful", label: "Hopeful" },
];

// List of emotions users can select from
const emotionOptions = [
  { value: "joy", label: "Joy" },
  { value: "peace", label: "Peace" },
  { value: "gratitude", label: "Gratitude" },
  { value: "love", label: "Love" },
  { value: "excitement", label: "Excitement" },
  { value: "sadness", label: "Sadness" },
  { value: "anger", label: "Anger" },
  { value: "fear", label: "Fear" },
  { value: "anxiety", label: "Anxiety" },
  { value: "frustration", label: "Frustration" },
  { value: "disappointment", label: "Disappointment" },
  { value: "shame", label: "Shame" },
  { value: "guilt", label: "Guilt" },
  { value: "jealousy", label: "Jealousy" },
  { value: "loneliness", label: "Loneliness" },
  { value: "confusion", label: "Confusion" },
  { value: "hope", label: "Hope" },
  { value: "pride", label: "Pride" },
  { value: "awe", label: "Awe" },
  { value: "contentment", label: "Contentment" },
];

export function JournalForm() {
  // Create form with zodResolver for validation
  const form = useForm<DemoJournal>({
    resolver: zodResolver(demoJournalSchema),
    defaultValues: {
      content: "",
      mood: undefined,
      emotions: [],
      physicalSensations: "",
      triggers: "",
      date: new Date().toISOString(),
    },
  });

  // Access the toast function
  const { toast } = useToast();

  // State for the journal entry and AI response
  const [journalEntry, setJournalEntry] = useState<any>(null);
  const [whisper, setWhisper] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(true);
  const [hasApiError, setHasApiError] = useState(false);
  
  // Fallback prompts in case the API is unavailable
  const fallbackPrompts = [
    "Reflect on a moment today that brought you peace. What was happening, and how did it make you feel?",
    "What emotions have been most present for you today? How have they influenced your thoughts and actions?",
    "Write about something you're grateful for today, no matter how small it might seem.",
    "What has been challenging for you lately? How have you been coping with these challenges?",
    "Describe your current emotional state using colors, textures, or weather patterns."
  ];
  
  // Select a random fallback prompt
  const randomFallbackPrompt = fallbackPrompts[Math.floor(Math.random() * fallbackPrompts.length)];

  // Define response types
  interface PromptResponse {
    prompt: string;
  }

  interface JournalResponse {
    message: string;
    journalEntry: {
      id: number;
      content: string;
      mood: string | null;
      primaryEmotion: string | null;
      createdAt: string;
    };
    whisper: {
      id: number;
      content: string;
      journalEntryId: number;
      emotionalAnalysis: {
        primaryEmotion: string;
        secondaryEmotions: string[];
        emotionalTone: string;
      };
      createdAt: string;
    };
  }

  // Query for getting a journaling prompt
  const { data: promptData, isLoading: promptLoading, error } = useQuery<PromptResponse>({
    queryKey: ['/api/journal/prompt'],
    enabled: showPrompt,
    retry: 0
  });
  
  // Handle API errors
  React.useEffect(() => {
    if (error) {
      setHasApiError(true);
      toast({
        title: "AI Service Unavailable",
        description: "We're experiencing an issue with our AI service. You can still write journal entries.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Mutation for submitting a journal entry
  const journalMutation = useMutation({
    mutationFn: async (values: DemoJournal) => {
      try {
        const response = await fetch("/api/journal/demo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        
        if (!response.ok) {
          throw new Error("API request failed");
        }
        
        return await response.json() as JournalResponse;
      } catch (error: any) {
        setHasApiError(true);
        toast({
          title: "AI Service Error",
          description: "We're experiencing an issue with our AI service. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
    onSuccess: (data) => {
      setJournalEntry(data.journalEntry);
      setWhisper(data.whisper);
      setShowPrompt(false);
    },
  });

  // Handle form submission
  function onSubmit(values: DemoJournal) {
    journalMutation.mutate(values);
  }

  // Reset the form to start a new journal entry
  function handleReset() {
    form.reset({ 
      content: "", 
      mood: undefined,
      emotions: [],
      physicalSensations: "",
      triggers: "",
      date: new Date().toISOString(),
    });
    setJournalEntry(null);
    setWhisper(null);
    setShowPrompt(true);
  }

  return (
    <div className="max-w-3xl w-full mx-auto">
      {!journalEntry ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-xl border border-[#C19B97]/20 bg-white p-6 mb-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Pen className="h-5 w-5 text-[#C19B97]" />
              <h3 className="font-cormorant text-2xl text-[#5D5348]">
                Write in your Garden
              </h3>
            </div>

            {hasApiError && (
              <Alert className="mb-5 border-[#E5A2A2] bg-[#FDF4F4]">
                <AlertTriangle className="h-4 w-4 text-[#C19B97]" />
                <AlertDescription className="text-[#8A5858] font-cormorant">
                  We're experiencing an issue with our AI service. You can still write your journal entry, but AI-generated insights may be unavailable at this time.
                </AlertDescription>
              </Alert>
            )}

            {showPrompt && (
              <div className="mb-5 p-4 bg-[#F9F5F2] rounded-lg italic text-[#5D5348]/80 font-cormorant text-lg">
                {hasApiError ? randomFallbackPrompt : (promptData?.prompt || "What's on your mind today?")}
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-cormorant text-[#5D5348] text-lg">
                        Journal Entry
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your thoughts and feelings here..."
                          className="min-h-[200px] resize-none font-cormorant text-lg bg-[#FCFAF7] border-[#C19B97]/20 focus-visible:ring-[#C19B97]/40"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Tabs defaultValue="basic" className="mt-6">
                  <TabsList className="w-full bg-[#F9F5F2] text-[#5D5348]">
                    <TabsTrigger value="basic" className="font-cormorant text-base">Basic</TabsTrigger>
                    <TabsTrigger value="emotions" className="font-cormorant text-base">Emotions</TabsTrigger>
                    <TabsTrigger value="details" className="font-cormorant text-base">Details</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="mt-4 space-y-6">
                    <FormField
                      control={form.control}
                      name="mood"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-cormorant text-[#5D5348] text-lg">How are you feeling?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-[#FCFAF7] border-[#C19B97]/20 focus:ring-[#C19B97]/40 font-cormorant text-lg">
                                <SelectValue placeholder="Select your mood" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="font-cormorant text-[#5D5348]">
                              {moodOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="font-cormorant text-[#5D5348] text-lg">Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className="w-full pl-3 text-left font-normal bg-[#FCFAF7] border-[#C19B97]/20 focus:ring-[#C19B97]/40 font-cormorant text-lg"
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP")
                                  ) : (
                                    <span>Select a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : new Date()}
                                onSelect={(date) => field.onChange(date ? date.toISOString() : new Date().toISOString())}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <TabsContent value="emotions" className="mt-4 space-y-6">
                    <FormField
                      control={form.control}
                      name="emotions"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="font-cormorant text-[#5D5348] text-lg">What emotions are you experiencing?</FormLabel>
                            <FormDescription className="font-cormorant text-[#5D5348]/70">
                              Select all that apply
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {emotionOptions.map((emotion) => (
                              <FormField
                                key={emotion.value}
                                control={form.control}
                                name="emotions"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={emotion.value}
                                      className="flex flex-row items-start space-x-2 space-y-0 rounded-md border border-[#C19B97]/20 p-3 bg-[#FCFAF7]"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(emotion.value)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value || [], emotion.value])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== emotion.value
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-cormorant text-[#5D5348] cursor-pointer">
                                        {emotion.label}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  
                  <TabsContent value="details" className="mt-4 space-y-6">
                    <FormField
                      control={form.control}
                      name="physicalSensations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-cormorant text-[#5D5348] text-lg">
                            Physical Sensations
                          </FormLabel>
                          <FormDescription className="font-cormorant text-[#5D5348]/70">
                            Where do you feel these emotions in your body?
                          </FormDescription>
                          <FormControl>
                            <Textarea
                              placeholder="Describe any physical sensations you're experiencing..."
                              className="resize-none font-cormorant text-lg bg-[#FCFAF7] border-[#C19B97]/20 focus-visible:ring-[#C19B97]/40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="triggers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-cormorant text-[#5D5348] text-lg">
                            Triggers
                          </FormLabel>
                          <FormDescription className="font-cormorant text-[#5D5348]/70">
                            What triggered these emotions?
                          </FormDescription>
                          <FormControl>
                            <Textarea
                              placeholder="Describe what might have triggered these emotions..."
                              className="resize-none font-cormorant text-lg bg-[#FCFAF7] border-[#C19B97]/20 focus-visible:ring-[#C19B97]/40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>

                <Button
                  type="submit"
                  className="w-full py-6 h-auto rounded-lg bg-[#C19B97] text-white hover:bg-[#A88A86] transition-colors mt-6"
                  disabled={journalMutation.isPending}
                >
                  {journalMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
                    </>
                  ) : (
                    "Receive Insight"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Journal Entry Display */}
          <div className="rounded-xl border border-[#C19B97]/20 bg-white p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Pen className="h-5 w-5 text-[#C19B97]" />
                <h3 className="font-cormorant text-2xl text-[#5D5348]">Your Journal Entry</h3>
              </div>
              <div className="flex gap-2">
                {journalEntry.date && (
                  <div className="px-3 py-1 rounded-full bg-[#F5F0EA] text-[#5D5348] font-cormorant text-sm flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    {format(new Date(journalEntry.date || journalEntry.createdAt), "MMM d, yyyy")}
                  </div>
                )}
                {journalEntry.mood && (
                  <div className="px-3 py-1 rounded-full bg-[#F9F5F2] text-[#5D5348] font-cormorant text-sm">
                    {journalEntry.mood.charAt(0).toUpperCase() + journalEntry.mood.slice(1)}
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-[#5D5348]/90 mb-4 font-cormorant text-lg">{journalEntry.content}</p>
            
            {/* Additional emotional details */}
            <div className="mt-4 space-y-3">
              {journalEntry.emotions && journalEntry.emotions.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {journalEntry.emotions.map((emotion: string) => (
                    <span 
                      key={emotion} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F9F5F2] text-[#C19B97] border border-[#C19B97]/20"
                    >
                      <Heart className="mr-1 h-3 w-3" />
                      {emotion}
                    </span>
                  ))}
                </div>
              )}
              
              {journalEntry.physicalSensations && (
                <div className="rounded-md bg-[#FCFAF7] p-3 border border-[#C19B97]/10">
                  <div className="flex items-center mb-1">
                    <MapPin className="h-4 w-4 text-[#C19B97] mr-2" />
                    <span className="font-cormorant text-base text-[#5D5348] font-medium">Physical Sensations</span>
                  </div>
                  <p className="font-cormorant text-[#5D5348]/80 text-sm">{journalEntry.physicalSensations}</p>
                </div>
              )}
              
              {journalEntry.triggers && (
                <div className="rounded-md bg-[#FCFAF7] p-3 border border-[#C19B97]/10">
                  <div className="flex items-center mb-1">
                    <Sparkles className="h-4 w-4 text-[#C19B97] mr-2" />
                    <span className="font-cormorant text-base text-[#5D5348] font-medium">Triggers</span>
                  </div>
                  <p className="font-cormorant text-[#5D5348]/80 text-sm">{journalEntry.triggers}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center py-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <ArrowDown className="text-[#C19B97] h-8 w-8" />
            </motion.div>
          </div>

          {/* AI Whisper Display */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="rounded-xl border border-[#C19B97]/20 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-5">
              <MessageCircle className="h-5 w-5 text-[#C19B97]" />
              <h3 className="font-cormorant text-2xl text-[#5D5348]">AI Whisper</h3>
            </div>
            
            <p className="text-[#5D5348]/90 italic font-cormorant text-lg mb-6">
              {whisper.content}
            </p>

            <Separator className="my-5 bg-[#C19B97]/10" />

            {whisper.emotionalAnalysis && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-5 w-5 text-[#C19B97]" />
                  <h4 className="font-cormorant text-xl text-[#5D5348]">Emotional Themes</h4>
                </div>
                <div className="space-y-2 font-cormorant">
                  {whisper.emotionalAnalysis.primaryEmotion && (
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-[#C19B97]" />
                      <span className="text-[#5D5348]/80">
                        <span className="font-medium text-[#5D5348]">Primary: </span>
                        {whisper.emotionalAnalysis.primaryEmotion}
                      </span>
                    </div>
                  )}
                  
                  {whisper.emotionalAnalysis.secondaryEmotions && 
                   whisper.emotionalAnalysis.secondaryEmotions.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Heart className="h-4 w-4 text-[#C19B97] mt-1" />
                      <span className="text-[#5D5348]/80">
                        <span className="font-medium text-[#5D5348]">Secondary: </span>
                        {whisper.emotionalAnalysis.secondaryEmotions.join(", ")}
                      </span>
                    </div>
                  )}
                  
                  {whisper.emotionalAnalysis.emotionalTone && (
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-[#C19B97]" />
                      <span className="text-[#5D5348]/80">
                        <span className="font-medium text-[#5D5348]">Tone: </span>
                        {whisper.emotionalAnalysis.emotionalTone}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          <div className="flex justify-center mt-6">
            <Button
              onClick={handleReset}
              className="px-8 py-6 h-auto rounded-lg bg-[#C19B97] text-white hover:bg-[#A88A86] transition-colors"
            >
              Write Another Entry
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}