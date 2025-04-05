import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, MapPin, Heart, Instagram, Twitter, Linkedin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  consent: z.boolean().refine(val => val === true, {
    message: "You must agree to receive emails",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactSection() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      consent: false,
    },
  });

  const mutation = useMutation({
    mutationFn: (values: FormValues) => {
      return apiRequest("POST", "/api/newsletter", values);
    },
    onSuccess: () => {
      toast({
        title: "Subscription successful!",
        description: "You've been added to our newsletter.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Something went wrong.",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: FormValues) {
    mutation.mutate(values);
  }

  return (
    <section id="contact" className="py-20 bg-[#FFF9E6] relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 bg-gradient-to-br from-[#BD8C87]/90 to-[#E2D9F3]/90 text-white">
                <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-light mb-6">Join Our Community</h2>
                <p className="mb-8 leading-relaxed">
                  Be among the first to experience Sol Space Garden. We're cultivating a space of emotional wisdom and peace.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 mr-4" />
                    <span>hello@solspacegarden.com</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 mr-4" />
                    <span>Digital Gardens, Everywhere</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-6 w-6 mr-4" />
                    <span>Made with love and intention</span>
                  </div>
                </div>
                
                <div className="mt-12">
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-8 md:p-12">
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#333333] mb-6">Stay Connected</h3>
                <p className="text-[#333333]/70 mb-8">
                  Join our newsletter to receive updates about new features and emotional wellbeing insights.
                </p>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-[#333333]/70">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              className="w-full px-4 py-6 h-auto rounded-lg border border-[#F0EBFA] focus:outline-none focus:ring-2 focus:ring-[#BD8C87]/50 focus:border-[#BD8C87] transition-colors"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-[#333333]/70">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your email address" 
                              type="email"
                              className="w-full px-4 py-6 h-auto rounded-lg border border-[#F0EBFA] focus:outline-none focus:ring-2 focus:ring-[#BD8C87]/50 focus:border-[#BD8C87] transition-colors"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="consent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-[#BD8C87] data-[state=checked]:border-[#BD8C87]"
                            />
                          </FormControl>
                          <div className="leading-none">
                            <FormLabel className="text-sm text-[#333333]/70">
                              I agree to receive occasional emails about Sol Space Garden
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full px-6 py-6 h-auto rounded-lg bg-[#BD8C87] text-white hover:bg-[#A47A76] focus:outline-none focus:ring-2 focus:ring-[#BD8C87]/50 transition-colors"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Submitting..." : "Join the Journey"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
