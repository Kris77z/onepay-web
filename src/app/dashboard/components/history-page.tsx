'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconSearch, IconFilter, IconDownload, IconExternalLink, IconArrowUp, IconArrowDown } from "@tabler/icons-react";

// 模拟交易数据
const transactions = [
  {
    id: '1',
    type: 'send',
    token: 'USDC',
    amount: '-100.00',
    usdValue: '$100.00',
    to: '0x742d...4c2f',
    from: '0x8ba1...f308',
    status: 'completed',
    date: '2024-01-15 14:30:25',
    hash: '0x1234567890abcdef...',
    fee: '$2.45',
    network: 'Polygon'
  },
  {
    id: '2',
    type: 'receive',
    token: 'ETH',
    amount: '+0.045',
    usdValue: '$146.25',
    to: '0x8ba1...f308',
    from: '0x459a...7d8b',
    status: 'completed',
    date: '2024-01-15 12:15:10',
    hash: '0xabcdef1234567890...',
    fee: '$3.12',
    network: 'Ethereum'
  },
  {
    id: '3',
    type: 'swap',
    token: 'USDT → USDC',
    amount: '500.00',
    usdValue: '$500.00',
    to: '0x8ba1...f308',
    from: '0x8ba1...f308',
    status: 'pending',
    date: '2024-01-15 11:45:33',
    hash: '0x9876543210fedcba...',
    fee: '$4.89',
    network: 'Polygon'
  },
  {
    id: '4',
    type: 'receive',
    token: 'BTC',
    amount: '+0.0025',
    usdValue: '$169.73',
    to: '0x8ba1...f308',
    from: '0xc4e7...a9b3',
    status: 'completed',
    date: '2024-01-14 16:22:45',
    hash: '0xfedcba0987654321...',
    fee: '$1.23',
    network: 'Bitcoin'
  },
  {
    id: '5',
    type: 'send',
    token: 'USDC',
    amount: '-75.50',
    usdValue: '$75.50',
    to: '0x123e...8f4a',
    from: '0x8ba1...f308',
    status: 'failed',
    date: '2024-01-14 09:18:12',
    hash: '0x1122334455667788...',
    fee: '$2.45',
    network: 'Polygon'
  },
];

export function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.from.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
    const matchesType = typeFilter === 'all' || tx.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">已完成</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">处理中</Badge>;
      case 'failed':
        return <Badge variant="destructive">失败</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <IconArrowUp className="h-4 w-4 text-red-500" />;
      case 'receive':
        return <IconArrowDown className="h-4 w-4 text-green-500" />;
      case 'swap':
        return <IconArrowUp className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'send':
        return '发送';
      case 'receive':
        return '接收';
      case 'swap':
        return '交换';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">

      <Tabs defaultValue="all" className="w-full space-y-6">
        <TabsList>
          <TabsTrigger value="all">全部交易</TabsTrigger>
          <TabsTrigger value="analytics">统计分析</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>交易记录</CardTitle>
              <CardDescription>
                查看和管理您的所有加密货币交易记录
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* 搜索和筛选 */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="搜索交易哈希、代币或地址..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <IconFilter className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="completed">已完成</SelectItem>
                    <SelectItem value="pending">处理中</SelectItem>
                    <SelectItem value="failed">失败</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部类型</SelectItem>
                    <SelectItem value="send">发送</SelectItem>
                    <SelectItem value="receive">接收</SelectItem>
                    <SelectItem value="swap">交换</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline">
                  <IconDownload className="mr-2 h-4 w-4" />
                  导出
                </Button>
              </div>

              {/* 交易表格 */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>类型</TableHead>
                      <TableHead>代币/金额</TableHead>
                      <TableHead>USD 价值</TableHead>
                      <TableHead>发送方/接收方</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>时间</TableHead>
                      <TableHead>网络费用</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(tx.type)}
                            <span className="font-medium">{getTypeText(tx.type)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{tx.amount} {tx.token}</div>
                            <div className="text-sm text-muted-foreground">{tx.network}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{tx.usdValue}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {tx.type === 'send' && (
                              <div className="text-sm">
                                <span className="text-muted-foreground">至:</span> {tx.to}
                              </div>
                            )}
                            {tx.type === 'receive' && (
                              <div className="text-sm">
                                <span className="text-muted-foreground">从:</span> {tx.from}
                              </div>
                            )}
                            {tx.type === 'swap' && (
                              <div className="text-sm text-muted-foreground">内部交换</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(tx.status)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{tx.date.split(' ')[0]}</div>
                            <div className="text-muted-foreground">{tx.date.split(' ')[1]}</div>
                          </div>
                        </TableCell>
                        <TableCell>{tx.fee}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <IconExternalLink className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredTransactions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  没有找到匹配的交易记录
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">总交易次数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">125</div>
                <p className="text-xs text-muted-foreground">
                  +12% 较上月
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">总交易价值</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,345</div>
                <p className="text-xs text-muted-foreground">
                  +8% 较上月
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">网络费用</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$89.45</div>
                <p className="text-xs text-muted-foreground">
                  -3% 较上月
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">成功率</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.4%</div>
                <p className="text-xs text-muted-foreground">
                  +0.2% 较上月
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
