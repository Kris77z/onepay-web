"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SuccessToast from "@/components/ui/success-toast";

export default function ContactSection() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // 模拟提交延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setShowSuccess(true);
  };
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Contact Section */}
          <div className="bg-card/50 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-light tracking-tight mb-4">
                  Discover new opportunities with our crypto payment solution
                </h3>
                <p className="text-muted-foreground mb-6">
                  Our expert team is ready to provide you with personalized crypto payment solutions,
                  whether you&apos;re a small business or a large enterprise, we can meet your specific needs.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Dedicated account manager</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Custom integration solutions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Priority technical support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Flexible rate negotiation</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="px-4 py-3 rounded-lg border border-white/20 bg-background/50 backdrop-blur-sm focus:border-primary focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="px-4 py-3 rounded-lg border border-white/20 bg-background/50 backdrop-blur-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 backdrop-blur-sm focus:border-primary focus:outline-none"
                />
                <textarea
                  placeholder="Please describe your requirements..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 backdrop-blur-sm focus:border-primary focus:outline-none resize-none"
                />
                <Button 
                  className="w-full" 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Contact OnePay team"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <SuccessToast 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Message sent successfully!"
        message="Thank you for your interest. We'll get back to you within 24 hours."
      />
    </section>
  );
}
