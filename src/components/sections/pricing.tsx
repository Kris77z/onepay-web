"use client";

import { useState } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";

type Plan = {
  id: string;
  name: string;
  description: string;
  priceMonthly: string;
  priceYearly: string;
  yearlyTotal?: number;
  features: string[];
};

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Get started with basic features",
    priceMonthly: "Free",
    priceYearly: "Free",
    yearlyTotal: 0,
    features: ["Basic APIs", "Community support"],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing projects",
    priceMonthly: "$19",
    priceYearly: "$190",
    yearlyTotal: 190,
    features: ["Priority APIs", "Email support", "Higher limits"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom solutions for scale",
    priceMonthly: "-",
    priceYearly: "-",
    features: ["Custom SLAs", "Dedicated support", "Onboarding"],
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-pretty font-extralight text-4xl lg:text-6xl tracking-tight">Simple, Transparent Pricing</h2>
          <p className="text-white/75 lg:text-xl font-light leading-relaxed tracking-tight">
            Choose the plan that fits your business needs.
          </p>
          <div className="flex items-center gap-3 text-lg">
            Monthly
            <button onClick={() => setIsYearly((v) => !v)} className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
              <span className={`inline-block h-4 w-4 transform rounded-full bg-background transition ${isYearly ? "translate-x-6" : "translate-x-1"}`} />
            </button>
            Yearly
          </div>
          <div className="flex flex-col items-stretch gap-6 md:flex-row">
            {PLANS.map((plan) => (
              <div key={plan.id} className="flex w-80 flex-col justify-between rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-left">
                <div>
                  <h3 className="font-light tracking-tight text-xl">{plan.name}</h3>
                  <p className="text-white/75 text-sm font-light leading-relaxed tracking-tight">{plan.description}</p>
                  <span className="mt-4 block font-extralight text-4xl tracking-tight">
                    {isYearly ? plan.priceYearly : plan.priceMonthly}
                  </span>
                  <p className="text-muted-foreground text-sm">
                    {plan.priceMonthly === "Free" ? (
                      "Forever free"
                    ) : plan.priceMonthly === "-" ? (
                      "Custom pricing"
                    ) : (
                      <>
                        Billed {isYearly ? `$${plan.yearlyTotal} annually` : `${plan.priceMonthly} monthly`}
                      </>
                    )}
                  </p>
                </div>
                <div className="my-6 border-t border-white/10" />
                <ul className="space-y-4">
                  {plan.features.map((f, i) => (
                    <li key={`${plan.id}-f-${i}`} className="flex items-center gap-2">
                      <CircleCheck className="size-4" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  {plan.id === "enterprise" ? (
                    <a className="w-full inline-flex items-center justify-center rounded-md bg-white/10 text-white backdrop-blur-sm px-4 py-2 text-sm hover:bg-white/20" href="#contact">
                      Contact Us
                      <ArrowRight className="ml-2 size-4" />
                    </a>
                  ) : (
                    <a className="w-full inline-flex items-center justify-center rounded-md bg-white/10 text-white backdrop-blur-sm px-4 py-2 text-sm hover:bg-white/20" href="#login">
                      {plan.id === "free" ? "Get Started" : "Start Now"}
                      <ArrowRight className="ml-2 size-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


