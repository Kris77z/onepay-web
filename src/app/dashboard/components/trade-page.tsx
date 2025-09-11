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

        {/* 代币转换 */}
        <TabsContent value="swap" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>代币转换</CardTitle>
              <CardDescription>在不同代币之间进行交换</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 发送代币 */}
              <div className="space-y-2">
                <Label>发送</Label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="0.00"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      className="text-xl"
                    />
                  </div>
                  <Select value={sendToken} onValueChange={setSendToken}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tokens.map((token) => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{token.symbol}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-sm text-muted-foreground">
                  余额: {tokens.find(t => t.symbol === sendToken)?.balance} {sendToken}
                </div>
              </div>

              {/* 交换按钮 */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSwapTokens}
                  className="rounded-full"
                >
                  <IconArrowRight className="h-4 w-4" />
                </Button>
              </div>

              {/* 接收代币 */}
              <div className="space-y-2">
                <Label>接收</Label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="0.00"
                      value={receiveAmount}
                      onChange={(e) => setReceiveAmount(e.target.value)}
                      className="text-xl"
                      readOnly
                    />
                  </div>
                  <Select value={receiveToken} onValueChange={setReceiveToken}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tokens.map((token) => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{token.symbol}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-sm text-muted-foreground">
                  余额: {tokens.find(t => t.symbol === receiveToken)?.balance} {receiveToken}
                </div>
              </div>

              {/* 交易信息 */}
              <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>汇率</span>
                  <span>1 {sendToken} = 0.00031 {receiveToken}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>网络费用</span>
                  <span>~$2.45</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>价格影响</span>
                  <span className="text-green-600">&lt; 0.01%</span>
                </div>
              </div>

              <Button className="w-full" size="lg">
                确认交换
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 发送代币 */}
        <TabsContent value="send" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>发送代币</CardTitle>
              <CardDescription>向其他地址发送加密货币</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 选择代币 */}
              <div className="space-y-2">
                <Label>选择代币</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择要发送的代币" />
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

              {/* 接收地址 */}
              <div className="space-y-2">
                <Label>接收地址</Label>
                <Input placeholder="0x..." />
                <div className="text-sm text-muted-foreground">
                  请仔细核对地址，转账无法撤销
                </div>
              </div>

              {/* 发送数量 */}
              <div className="space-y-2">
                <Label>发送数量</Label>
                <div className="flex gap-2">
                  <Input placeholder="0.00" className="flex-1" />
                  <Button variant="outline">最大</Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  可用余额: 1,234.56 USDC
                </div>
              </div>

              {/* 网络费用 */}
              <div className="space-y-2">
                <Label>网络费用</Label>
                <div className="flex gap-2">
                  <Badge variant="outline">慢 (~5分钟) - $1.23</Badge>
                  <Badge variant="default">标准 (~2分钟) - $2.45</Badge>
                  <Badge variant="outline">快 (~30秒) - $4.89</Badge>
                </div>
              </div>

              {/* 总计 */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>发送数量</span>
                  <span>100.00 USDC</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>网络费用</span>
                  <span>$2.45</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-2">
                  <span>总计</span>
                  <span>102.45 USDC</span>
                </div>
              </div>

              <Button className="w-full" size="lg">
                <IconWallet className="mr-2 h-4 w-4" />
                确认发送
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}
