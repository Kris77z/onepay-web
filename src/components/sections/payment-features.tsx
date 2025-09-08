"use client";

import { Users, Zap, Settings } from "lucide-react";

const features = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Dedicated Support",
    description: "Dedicated account manager providing full integration assistance and technical support."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Mass Payouts",
    description: "Make mass payouts to thousands of addresses with automatic conversion in just one moment."
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Flexible Commissions",
    description: "Set additional commissions or add a discount for chosen coins to optimize your fee structure."
  }
];

export default function PaymentFeatures() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
              What are OnePay crypto payment gateway features?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive cryptocurrency payment solutions designed for modern businesses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl border border-white/10 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-medium">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Key Statistics */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-extralight mb-2">No rolling reserves/</div>
              <div className="text-sm text-muted-foreground">Funds never held</div>
            </div>
            <div>
              <div className="text-3xl font-extralight mb-2">Global coverage/</div>
              <div className="text-sm text-muted-foreground">Worldwide access</div>
            </div>
            <div>
              <div className="text-3xl font-extralight mb-2">Zero chargebacks/</div>
              <div className="text-sm text-muted-foreground">No reversals</div>
            </div>
            <div>
              <div className="text-3xl font-extralight mb-2">Instant transactions</div>
              <div className="text-sm text-muted-foreground">Real-time processing</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
