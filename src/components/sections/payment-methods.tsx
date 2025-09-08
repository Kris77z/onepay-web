"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const paymentMethods = [
  {
    id: "invoices",
    title: "Invoices",
    subtitle: "E-commerce choice",
    description: "This method is suitable for paying for goods or services. You can set the price in a fiat currency so the payer chooses a cryptocurrency and pays a corresponding amount, or specify the preferable cryptocurrency right away, and the cryptocurrency address will be generated after choosing a network.",
    mockContent: "invoice"
  },
  {
    id: "recurring",
    title: "Recurring payments", 
    subtitle: "Subscription businesses choice",
    description: "Subscription-based payments for your business. Your client needs to set it up just once to be charged regularly.",
    mockContent: "recurring"
  },
  {
    id: "host",
    title: "Host",
    subtitle: "Universal solution for any business", 
    description: "The most customizable option, suitable for any type of project. Allow your customers to top up their personal credit in any amount and use it without delay.",
    mockContent: "qr"
  },
  {
    id: "links",
    title: "Payment links",
    subtitle: "Single payment choice",
    description: "Create an invoice, share the link and get paid – it's an easy payment solution for your online business of any kind.",
    mockContent: "chat"
  }
];

const blockchains = [
  { name: "BNB Chain", symbol: "BNB", standard: "BEP-20" },
  { name: "Ethereum", symbol: "ETH", standard: "ERC-20" },
  { name: "Polygon", symbol: "MATIC", standard: "ERC-20" },
  { name: "Arbitrum", symbol: "ARB", standard: "ERC-20" }
];

export default function PaymentMethods() {
  const [activeMethod, setActiveMethod] = useState("invoices");
  const [selectedBlockchain, setSelectedBlockchain] = useState("BNB Chain");
  const [showBlockchainDropdown, setShowBlockchainDropdown] = useState(false);

  const renderMockContent = (type: string) => {
    switch(type) {
      case "invoice":
        return (
          <Card className="w-full max-w-md border-white/10 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-start mb-6">
                <Image 
                  src="/images/onepay.png" 
                  alt="OnePay" 
                  width={100} 
                  height={100} 
                  className="rounded"
                />
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold mb-2 text-left">10.00 USDT</div>
                <div className="text-sm text-muted-foreground text-left">{selectedBlockchain} ({blockchains.find(b => b.name === selectedBlockchain)?.standard || "BEP-20"})</div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full relative">
                  <div className="absolute inset-0 w-8 h-8 rounded-full border-2 border-muted"></div>
                  <div className="absolute inset-0 w-8 h-8 rounded-full border-2 border-green-500 border-r-transparent border-b-transparent transform rotate-45"></div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Expiration time</div>
                  <div className="text-sm font-mono text-green-500">02:34:54</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={() => setShowBlockchainDropdown(!showBlockchainDropdown)}
                  >
                    <span>{selectedBlockchain}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showBlockchainDropdown ? 'rotate-180' : ''}`} />
                  </Button>
                  
                  {showBlockchainDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-white/20 rounded-lg shadow-lg z-10">
                      {blockchains.map((blockchain) => (
                        <button
                          key={blockchain.name}
                          className="w-full px-3 py-2 text-left hover:bg-accent rounded-lg text-sm"
                          onClick={() => {
                            setSelectedBlockchain(blockchain.name);
                            setShowBlockchainDropdown(false);
                          }}
                        >
                          {blockchain.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                  Pay with OnePay
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      
      case "recurring":
        return (
          <Card className="w-full max-w-md border-white/10 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-start mb-6">
                <Image 
                  src="/images/onepay.png" 
                  alt="OnePay" 
                  width={100} 
                  height={100} 
                  className="rounded"
                />
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 mb-2">
                  <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">!</span>
                  </div>
                  <span className="text-sm font-medium">Confirm the recurring payment</span>
                </div>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  The funds will be debited <span className="bg-amber-200 dark:bg-amber-800/50 px-1 rounded">Every month</span> cancel any time.
                </p>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold mb-2 text-left">6 USDT</div>
                <div className="text-sm text-muted-foreground text-left">Name • Crypto2</div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                Pay with OnePay
              </Button>
            </CardContent>
          </Card>
        );
        
      case "qr":
        return (
          <Card className="w-full max-w-md border-white/10 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-48 h-48 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="w-40 h-40 bg-black rounded-lg relative">
                    <div className="absolute inset-2 bg-white"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded overflow-hidden">
                      <Image 
                        src="/images/onepay.png" 
                        alt="OnePay" 
                        width={48} 
                        height={48} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* QR Code pattern simulation */}
                    {Array.from({length: 8}).map((_, i) => (
                      <div key={i} className={`absolute w-2 h-2 bg-black`} style={{
                        top: `${Math.random() * 80}%`,
                        left: `${Math.random() * 80}%`
                      }}></div>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-1">Recipient wallet address</div>
                <div className="text-xs font-mono bg-muted/20 p-2 rounded break-all">
                  0xb3eec98166b930ca8d5f5d2f2bc3egc44
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      case "chat":
        return (
          <Card className="w-full max-w-md border-white/10 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="text-right text-xs text-muted-foreground mb-4">Today</div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Image 
                  src="/avatar/jack.png" 
                  alt="User" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">Hi, where can i pay? <span className="text-xs text-muted-foreground">11:47</span></p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 justify-end">
                <div className="bg-foreground text-background rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">Hi, check the invoice here <span className="text-xs opacity-70">11:47</span></p>
                </div>
                <Image 
                  src="/avatar/Albert Juan.png" 
                  alt="Support" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
              </div>
              
              <div className="flex items-start gap-3 justify-end">
                <div className="bg-foreground text-background rounded-lg p-3 max-w-[80%]">
                  <p className="text-xs font-mono">
                    https://pay.onepay.com/pay<br/>
                    ***************
                  </p>
                  <span className="text-xs opacity-70">11:47</span>
                </div>
                <Image 
                  src="/avatar/Albert Juan.png" 
                  alt="Support" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
              </div>
              
              <div className="flex items-start gap-3">
                <Image 
                  src="/avatar/jack.png" 
                  alt="User" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">Paid! <span className="text-xs text-muted-foreground">11:47</span></p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 justify-end">
                <div className="bg-foreground text-background rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">I see, thanks😊 <span className="text-xs opacity-70">11:47</span></p>
                </div>
                <Image 
                  src="/avatar/Albert Juan.png" 
                  alt="Support" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
              </div>
            </CardContent>
          </Card>
        );
        
      default:
        return null;
    }
  };
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
              We make it easy for you to plug into digital payments
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Multiple payment methods to meet different business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Payment Methods List */}
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <Card 
                  key={method.id} 
                  className="border-white/10 bg-card/50 backdrop-blur-sm cursor-pointer hover:bg-card/70 transition-all"
                  onClick={() => setActiveMethod(method.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-medium">{method.title}</CardTitle>
                      {activeMethod === method.id ? 
                        <Minus className="w-5 h-5 text-muted-foreground" /> : 
                        <Plus className="w-5 h-5 text-muted-foreground" />
                      }
                    </div>
                    <p className="text-sm text-muted-foreground">{method.subtitle}</p>
                  </CardHeader>
                  {activeMethod === method.id && (
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {method.description}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {/* Right Side - Payment Interface */}
            <div className="flex items-start justify-center">
              {renderMockContent(paymentMethods.find(m => m.id === activeMethod)?.mockContent || "invoice")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
