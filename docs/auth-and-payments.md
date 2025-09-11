# 前端落地方案：Payments 演示与 Dashboard 登录保护

本文件记录 onepay-web 的前端实现与鉴权约定，便于部署与联调。

## 概览
- Payments 页面仅用于演示二维码与收款信息。
- Dashboard 为真实使用入口，访问需要登录（Cookie：access_token）。
- /me 最小返回字段：id, email, wallet_address。

## Payments 演示页
- 路由：/payments
- 展示：
  - 金额：20.00（两位小数）
  - 链与代币：BNB Chain (BEP-20)，代币标签与徽标：USDT、USDC
  - 二维码：public/images/qrcode.png
  - 地址：0xF47557989018c45E6914d2080493F6C9Bbd42cEF
- 代码位置：src/components/sections/payment-methods.tsx
  - 更新了 renderMockContent("qr")，加入 USDT/USDC 徽标、金额与地址展示
  - invoice/recurring 金额同步统一为 20.00

## Dashboard 登录保护
- 路由：/dashboard 及其子路径
- 逻辑：
  - 未检测到 access_token → 302 到 /auth?redirect=/dashboard...
  - 检测到 access_token → 放行
- 实现文件：middleware.ts（matcher: ['/dashboard/:path*']）

## 鉴权与会话
- Cookie 名称：access_token（HTTP-only、Secure、SameSite=Lax、Path=/）
- 登录/注册由后端实现并设置 Cookie；前端已在 auth 页面对接后端 API（`POST /auth/login`、`POST /auth/register`，`credentials: 'include'`）
- 拉取用户信息：GET /me → { id, email, wallet_address }

## 导航与路由
- Navbar 的 Payments 菜单指向 /payments（用于演示）
- /dashboard 路由由 Middleware 保护，未登录会被引导到 /auth

## 本地运行
- npm install
- npm run dev  # http://localhost:3000
  - 需在环境变量设置后端地址：`NEXT_PUBLIC_API_BASE`（例如 `http://localhost:3000` 指向后端）

## 验收清单
- 未登录访问 /dashboard 跳转 /auth
- 登录后访问 /dashboard 可进入，并可调用 /me 获取三字段
- /payments 展示 qrcode.png、金额 20.00、BNB Chain (BEP-20)、USDT/USDC 徽标与收款地址

## 变更记录（本次）
- 新增：middleware.ts（Dashboard 登录保护）
- 更新：src/components/sections/payment-methods.tsx（二维码演示区、金额两位小数、USDT/USDC 徽标）
