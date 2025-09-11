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

  return (
    <div className="flex justify-center">
      <div className="space-y-6 max-w-4xl w-full">

      <Tabs defaultValue="security" className="w-full space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="security">
            <IconShield className="mr-2 h-4 w-4" />
            安全设置
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <IconBell className="mr-2 h-4 w-4" />
            通知设置
          </TabsTrigger>
          <TabsTrigger value="api">
            <IconKey className="mr-2 h-4 w-4" />
            API 设置
          </TabsTrigger>
        </TabsList>

        {/* 安全设置 */}
        <TabsContent value="security" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>密码与安全</CardTitle>
              <CardDescription>管理您的账户安全设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 修改密码 */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">修改密码</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">当前密码</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">新密码</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">确认新密码</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button>更新密码</Button>
                </div>
              </div>

              {/* 双重验证 */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">双重验证 (2FA)</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">手机验证器应用</p>
                    <p className="text-sm text-muted-foreground">
                      使用 Google Authenticator 或其他验证器应用
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">短信验证</p>
                    <p className="text-sm text-muted-foreground">
                      通过短信接收验证码
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              {/* 登录活动 */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">最近登录活动</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Chrome on macOS</p>
                      <p className="text-sm text-muted-foreground">北京, 中国 - 2024-01-15 14:30</p>
                    </div>
                    <Badge variant="default">当前会话</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Safari on iPhone</p>
                      <p className="text-sm text-muted-foreground">上海, 中国 - 2024-01-14 09:15</p>
                    </div>
                    <Button variant="outline" size="sm">撤销</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 通知设置 */}
        <TabsContent value="notifications" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>通知偏好</CardTitle>
              <CardDescription>选择您希望接收的通知类型</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 通知方式 */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">通知方式</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">邮件通知</p>
                      <p className="text-sm text-muted-foreground">
                        接收重要的邮件更新
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">推送通知</p>
                      <p className="text-sm text-muted-foreground">
                        在浏览器中接收推送通知
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.push}
                      onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">短信通知</p>
                      <p className="text-sm text-muted-foreground">
                        接收重要的短信提醒
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.sms}
                      onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                    />
                  </div>
                </div>
              </div>

              {/* 通知类型 */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">通知类型</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">交易活动</p>
                      <p className="text-sm text-muted-foreground">
                        交易完成、失败和状态更新
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.trading}
                      onCheckedChange={(checked) => handleNotificationChange('trading', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">安全提醒</p>
                      <p className="text-sm text-muted-foreground">
                        登录活动和安全相关的通知
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.security}
                      onCheckedChange={(checked) => handleNotificationChange('security', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">产品更新</p>
                      <p className="text-sm text-muted-foreground">
                        新功能和产品公告
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.news}
                      onCheckedChange={(checked) => handleNotificationChange('news', checked)}
                    />
                  </div>
                </div>
              </div>

              {/* 联系信息 */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">联系信息</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱地址</Label>
                    <Input id="email" type="email" defaultValue="user@onepay.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">手机号码</Label>
                    <Input id="phone" type="tel" defaultValue="+86 138 0013 8000" />
                  </div>
                  <Button>保存更改</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API 设置 */}
        <TabsContent value="api" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>API 密钥管理</CardTitle>
              <CardDescription>创建和管理您的 API 密钥</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 创建新密钥 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">API 密钥</h3>
                  <Button onClick={generateNewApiKey}>
                    <IconPlus className="mr-2 h-4 w-4" />
                    创建新密钥
                  </Button>
                </div>

                {/* 密钥列表 */}
                <div className="space-y-4">
                  {apiKeys.map((key) => (
                    <div key={key.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{key.name}</p>
                          <p className="text-sm text-muted-foreground">
                            创建于 {key.created} • 最后使用 {key.lastUsed}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={key.status === 'active' ? 'default' : 'secondary'}
                          >
                            {key.status === 'active' ? '活跃' : '禁用'}
                          </Badge>
                          <Button variant="ghost" size="sm" onClick={() => deleteApiKey(key.id)}>
                            <IconTrash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Input 
                          type={showApiKey ? "text" : "password"}
                          value={key.key}
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? <IconEyeOff className="h-4 w-4" /> : <IconEye className="h-4 w-4" />}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(key.key)}
                        >
                          <IconCopy className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex gap-2">
                        {key.permissions.map((permission) => (
                          <Badge key={permission} variant="outline">
                            {permission === 'read' ? '读取' : '写入'}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Webhook 设置 */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">Webhook 设置</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input 
                      id="webhook-url" 
                      placeholder="https://your-app.com/webhook"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhook-secret">Webhook 密钥</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="webhook-secret" 
                        type="password"
                        placeholder="webhook_secret_key"
                      />
                      <Button variant="outline">
                        <IconRefresh className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>事件类型</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="payment-completed" />
                        <Label htmlFor="payment-completed">支付完成</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="payment-failed" />
                        <Label htmlFor="payment-failed">支付失败</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="refund-issued" />
                        <Label htmlFor="refund-issued">退款发放</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="dispute-created" />
                        <Label htmlFor="dispute-created">争议创建</Label>
                      </div>
                    </div>
                  </div>
                  <Button>保存 Webhook 设置</Button>
                </div>
              </div>

              {/* API 文档 */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">API 文档</h3>
                <p className="text-sm text-muted-foreground">
                  查看我们的 API 文档以了解如何集成 OnePay 支付服务。
                </p>
                <Button variant="outline">
                  查看 API 文档
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}
