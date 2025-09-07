"use client";

import { Shield, Zap, Globe, Lock, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Enterprise Security",
    description: "Multi-layer security protection with 2FA, whitelist, PIN codes and more to ensure fund safety."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Real-time Processing",
    description: "Fast transaction processing with real-time status tracking for complete payment transparency."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Multi-chain Support",
    description: "Support for Ethereum, TRON, BSC and other major blockchain networks for diverse business needs."
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Auto Conversion",
    description: "Smart exchange rate conversion to effectively avoid market volatility risks and protect fund value."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Dedicated Support",
    description: "Dedicated account manager providing full integration assistance and technical support."
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Flexible Rates",
    description: "Transparent fee structure with no hidden costs, competitive rates starting from 0.4%."
  }
];

export default function Features() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extralight tracking-tight mb-6">
            Why Choose OnePay
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Cryptocurrency payment solutions designed for modern businesses, providing secure, fast, and reliable payment experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </div>
    </section>
  );
}
