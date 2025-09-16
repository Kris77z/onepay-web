'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { IconArrowRight, IconExchange, IconWallet, IconSend } from "@tabler/icons-react";

export function TradePage() {
  const [sendAmount, setSendAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [sendToken, setSendToken] = useState('USDC');
  const [receiveToken, setReceiveToken] = useState('ETH');

  // 模拟代币数据
  const tokens = [
    { symbol: 'USDC', name: 'USD Coin', balance: '1,234.56', price: '$1.00' },
    { symbol: 'ETH', name: 'Ethereum', balance: '2.15', price: '$3,245.67' },
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.125', price: '$67,890.12' },
    { symbol: 'USDT', name: 'Tether USD', balance: '890.45', price: '$1.00' },
  ];

  const handleSwapTokens = () => {
    const temp = sendToken;
    setSendToken(receiveToken);
    setReceiveToken(temp);
  };

  return (
    <div className="flex justify-center">
      <div className="space-y-6 max-w-4xl w-full">

      <Tabs defaultValue="swap" className="w-full space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="swap">
            <IconExchange className="mr-2 h-4 w-4" />
            Swap Tokens
          </TabsTrigger>
          <TabsTrigger value="send">
            <IconSend className="mr-2 h-4 w-4" />
            Send Tokens
          </TabsTrigger>
        </TabsList>

        {/* Swap Tokens */}
        <TabsContent value="swap" className="space-y-6 mt-4">
          <Card>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <IconExchange className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground">Coming Soon</h3>
                  <p className="text-sm text-muted-foreground mt-2">Token swap feature is under development</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Send Tokens */}
        <TabsContent value="send" className="space-y-6 mt-4">
          <Card>
            <CardContent className="space-y-6 pt-6">
              {/* Select Token */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Select Token</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select token to send" />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map((token) => (
                      <SelectItem key={token.symbol} value={token.symbol}>
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <div className="font-medium">{token.symbol}</div>
                            <div className="text-sm text-muted-foreground">{token.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm">{token.balance}</div>
                            <div className="text-xs text-muted-foreground">{token.price}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Recipient Address */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Recipient Address</Label>
                <Input placeholder="0x..." />
                <div className="text-sm text-muted-foreground">
                  Please double-check the address, transfers cannot be reversed
                </div>
              </div>

              {/* Send Amount */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Send Amount</Label>
                <div className="flex gap-2">
                  <Input placeholder="0.00" className="flex-1" />
                  <Button variant="outline">Max</Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Available balance: 1,234.56 USDC
                </div>
              </div>

              {/* Network Fee */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Network Fee</Label>
                <div className="flex gap-2">
                  <Badge variant="outline">Slow (~5min) - $1.23</Badge>
                  <Badge variant="default">Standard (~2min) - $2.45</Badge>
                  <Badge variant="outline">Fast (~30s) - $4.89</Badge>
                </div>
              </div>

              {/* Total */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>Send Amount</span>
                  <span>100.00 USDC</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Network Fee</span>
                  <span>$2.45</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-2">
                  <span>Total</span>
                  <span>102.45 USDC</span>
                </div>
              </div>

              <Button className="w-full" size="lg">
                <IconWallet className="mr-2 h-4 w-4" />
                Confirm Send
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}
