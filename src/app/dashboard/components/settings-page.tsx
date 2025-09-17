'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  IconShield, 
  IconBell, 
  IconKey, 
  IconCopy, 
  IconEye, 
  IconEyeOff,
  IconPlus,
  IconTrash,
  IconRefresh
} from "@tabler/icons-react";
import { postJson } from "@/lib/api";

export function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    trading: true,
    security: true,
    news: false,
  });

  // 模拟 API 密钥数据
  const [apiKeys, setApiKeys] = useState([
    {
      id: '1',
      name: 'Production API',
      key: 'pk_live_1234567890abcdef...',
      created: '2024-01-10',
      lastUsed: '2024-01-15',
      permissions: ['read', 'write'],
      status: 'active'
    },
    {
      id: '2',
      name: 'Development API',
      key: 'pk_test_abcdef1234567890...',
      created: '2024-01-05',
      lastUsed: '2024-01-14',
      permissions: ['read'],
      status: 'active'
    }
  ]);

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // 可以添加toast提示
  };

  const generateNewApiKey = () => {
    const newKey = {
      id: Date.now().toString(),
      name: 'New API Key',
      key: 'pk_live_' + Math.random().toString(36).substr(2, 20) + '...',
      created: new Date().toISOString().split('T')[0],
      lastUsed: '-',
      permissions: ['read'],
      status: 'active'
    };
    setApiKeys(prev => [...prev, newKey]);
  };

  const deleteApiKey = (id: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== id));
  };

  // API Quickstart envs (dev convenience)
  const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || '').replace(/\/$/, '')
  const MERCHANT_ID = process.env.NEXT_PUBLIC_MERCHANT_ID || ''
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY || ''
  const maskedKey = API_KEY ? `${API_KEY.slice(0,4)}••••••••${API_KEY.slice(-4)}` : ''
  const base = API_BASE || 'http://localhost:3002'
  const MERCHANT_PLACEHOLDER = MERCHANT_ID || '<YOUR_MERCHANT_ID>'
  const APIKEY_PLACEHOLDER = API_KEY || '<YOUR_API_KEY>'
  const EVM_DEFAULT_RECEIVER = '0x2f28db7b3a6f62f0c425f0196db2dfea29d824a0'
  const SOL_DEFAULT_RECEIVER = 'DVgDzRZpwM4iNbMihUiTyhy6FVE6SBYeSGiXqtaSpcST'
  const curlCreateOrder = `curl -X POST ${base}/api/orders \\
  -H 'Content-Type: application/json' \\
  -H 'X-API-Key: ${APIKEY_PLACEHOLDER}' \\
  -d '{"id":"ORDER_001","chain":"bsc-testnet","token_symbol":"USDT","token_address":"0x337610d27c682E347C9cD60BD4b3b107C9d34dDd","decimals":18,"expected_amount":"20.00"}'`
  const nodeCreateOrder = `const res = await fetch('${base}/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-API-Key': '${APIKEY_PLACEHOLDER}' }, body: JSON.stringify({ id: 'ORDER_001', chain: 'bsc-testnet', token_symbol: 'USDT', token_address: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd', decimals: 18, expected_amount: '20.00' }) });\nconst data = await res.json();\nconsole.log(data);`

  // Payment URL Generator state
  const [genChain, setGenChain] = useState('bsc-testnet')
  const [genToken, setGenToken] = useState<'USDT'|'USDC'>('USDT')
  const [genTokenAddress, setGenTokenAddress] = useState('0x337610d27c682E347C9cD60BD4b3b107C9d34dDd')
  const [genDecimals, setGenDecimals] = useState(18)
  const [genAmount, setGenAmount] = useState('20.00')
  const [genFixed, setGenFixed] = useState(true)
  const [genResult, setGenResult] = useState<{pay_url?:string;deep_link?:string;qrcode_text?:string;error?:string}|null>(null)
  const [genLoading, setGenLoading] = useState(false)

  function applyPreset(nextChain: string, nextToken: 'USDT'|'USDC'){
    // Provide safe presets for demo networks only; otherwise leave manual
    if(nextChain === 'bsc-testnet' && nextToken === 'USDT'){
      setGenTokenAddress('0x337610d27c682E347C9cD60BD4b3b107C9d34dDd')
      setGenDecimals(18)
    } else {
      // Unknown preset: keep current or ask user to fill
      setGenTokenAddress('')
      setGenDecimals(6)
    }
  }

  async function handleGenerate(){
    try{
      setGenLoading(true)
      setGenResult(null)
      if(!genTokenAddress){
        setGenResult({ error: 'Please provide token address for selected chain/token.' })
        return
      }
      const body = {
        id: `DEMO_${Date.now()}`,
        chain: genChain,
        token_symbol: genToken,
        token_address: genTokenAddress,
        decimals: genDecimals,
        expected_amount: genAmount,
      }
      const resp = await postJson<{pay_url?: string; deep_link?: string; qrcode_text?: string}>(`/api/orders`, body)
      setGenResult({ pay_url: resp?.pay_url, deep_link: resp?.deep_link, qrcode_text: resp?.qrcode_text })
    }catch(e: unknown){
      const errorMessage = (e as Error)?.message || 'Generate failed'
      setGenResult({ error: errorMessage })
    }finally{
      setGenLoading(false)
    }
  }

  return (
    <div className="flex justify-center">
      <div className="space-y-6 max-w-4xl w-full">

      <Tabs defaultValue="api" className="w-full space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="api">
            <IconKey className="mr-2 h-4 w-4" />
            API
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <IconBell className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
        </TabsList>


        {/* General Settings */}
        <TabsContent value="notifications" className="space-y-6 mt-4">
          <Card>
            <CardContent className="space-y-6 pt-6">
              {/* Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                    </div>
                    <Switch 
                      checked={notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Browser push</p>
                      <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                    </div>
                    <Switch 
                      checked={notifications.push}
                      onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Notification types */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">Notification types</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Transaction updates</p>
                      <p className="text-sm text-muted-foreground">Completed, failed, and status updates</p>
                    </div>
                    <Switch 
                      checked={notifications.trading}
                      onCheckedChange={(checked) => handleNotificationChange('trading', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Security alerts</p>
                      <p className="text-sm text-muted-foreground">Login activity and security notices</p>
                    </div>
                    <Switch 
                      checked={notifications.security}
                      onCheckedChange={(checked) => handleNotificationChange('security', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Product updates</p>
                      <p className="text-sm text-muted-foreground">New features and announcements</p>
                    </div>
                    <Switch 
                      checked={notifications.news}
                      onCheckedChange={(checked) => handleNotificationChange('news', checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">Two-factor authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Authenticator app</p>
                    <p className="text-sm text-muted-foreground">Use Google Authenticator or other apps</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api" className="space-y-6 mt-4">
          <Card>
            <CardContent className="space-y-6 pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="text-sm font-medium">Base URL</div>
                  <Input value={API_BASE} readOnly className="font-mono" />
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium">Merchant ID</div>
                  <Input value={MERCHANT_ID || 'Auto-bound to your account'} readOnly className="font-mono" />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <div className="text-sm font-medium">API Key (server-side only)</div>
                  <div className="flex gap-2">
                    <Input value={maskedKey} readOnly className="font-mono" />
                    <Button variant="outline" size="sm" onClick={()=>copyToClipboard(API_KEY)}><IconCopy className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="text-sm font-medium">cURL Example</div>
                  <pre className="rounded-lg border p-3 text-xs overflow-x-auto">{curlCreateOrder}</pre>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium">Node.js Example</div>
                  <pre className="rounded-lg border p-3 text-xs overflow-x-auto">{nodeCreateOrder}</pre>
                </div>
              </div>

              {/* Payment URL Generator */}
              <div className="space-y-3 pt-6 border-t">
                <h3 className="text-lg font-medium">Payment URL Generator</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Chain</div>
                    <select className="w-full border rounded-md h-9 px-2" value={genChain} onChange={(e)=>{ const v=e.target.value; setGenChain(v); applyPreset(v, genToken) }}>
                      <option value="bsc-testnet">bsc-testnet</option>
                      <option value="bsc">bsc</option>
                      <option value="arbitrum">arbitrum</option>
                      <option value="ethereum">ethereum</option>
                      <option value="solana">solana</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Token</div>
                    <select className="w-full border rounded-md h-9 px-2" value={genToken} onChange={(e)=>{ const v=e.target.value as 'USDT'|'USDC'; setGenToken(v); applyPreset(genChain, v) }}>
                      <option value="USDT">USDT</option>
                      <option value="USDC">USDC</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Token Address</div>
                    <Input value={genTokenAddress} placeholder="0x... or mint" onChange={(e)=>setGenTokenAddress(e.target.value)} className="font-mono" />
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Decimals</div>
                    <Input type="number" value={genDecimals} onChange={(e)=>setGenDecimals(Number(e.target.value||0))} />
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Amount</div>
                    <Input value={genAmount} onChange={(e)=>setGenAmount(e.target.value)} />
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Fixed amount</div>
                    <div className="flex items-center gap-2 h-9">
                      <Switch checked={genFixed} onCheckedChange={setGenFixed} />
                      <span className="text-xs text-muted-foreground">Amount is required for payment URLs</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleGenerate} disabled={genLoading}>{genLoading ? 'Generating...' : 'Generate'}</Button>
                  {genResult?.pay_url && (
                    <Button variant="outline" onClick={()=>copyToClipboard(genResult.pay_url!)}><IconCopy className="h-4 w-4 mr-2" />Copy pay_url</Button>
                  )}
                </div>
                {genResult?.error && (
                  <div className="text-xs text-red-500">{genResult.error}</div>
                )}
                {(genResult?.pay_url || genResult?.deep_link) && (
                  <div className="grid md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-3">
                      <div className="text-sm font-medium">pay_url</div>
                      <pre className="rounded-lg border p-3 overflow-x-auto">{genResult?.pay_url}</pre>
                    </div>
                    <div className="space-y-3">
                      <div className="text-sm font-medium">deep_link</div>
                      <pre className="rounded-lg border p-3 overflow-x-auto">{genResult?.deep_link}</pre>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-xs text-muted-foreground">
                <p><span className="font-medium">Recommended:</span> Use <code>pay_url</code> returned by <code>POST /api/orders</code> as your button href or QR text. It auto-resolves to the correct wallet payment link.</p>
              </div>

              {/* simplified, removed webhook/docs sections */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}
