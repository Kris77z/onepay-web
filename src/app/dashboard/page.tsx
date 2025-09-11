'use client';

import React, { useState } from 'react';
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

// 导入各个页面组件
import { OverviewPage } from './components/overview-page';
import { TradePage } from './components/trade-page';
import { HistoryPage } from './components/history-page';
import { SettingsPage } from './components/settings-page';
import TestPage from './components/test-page';

type PageType = 'overview' | 'trade' | 'history' | 'settings' | 'test';

export default function Page() {
  const [currentPage, setCurrentPage] = useState<PageType>('overview');

  // 从 URL 参数获取页面类型
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page') as PageType;
    if (page && ['overview', 'trade', 'history', 'settings', 'test'].includes(page)) {
      setCurrentPage(page);
    }
  }, []);

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
    const url = new URL(window.location.href);
    url.searchParams.set('page', page);
    window.history.pushState({}, '', url.toString());
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'overview':
        return '概览';
      case 'trade':
        return '交易';
      case 'history':
        return '历史记录';
      case 'settings':
        return '设置';
      case 'test':
        return '测试';
      default:
        return '概览';
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'overview':
        return <OverviewPage />;
      case 'trade':
        return <TradePage />;
      case 'history':
        return <HistoryPage />;
      case 'settings':
        return <SettingsPage />;
      case 'test':
        return <TestPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" onPageChange={handlePageChange} currentPage={currentPage} />
      <SidebarInset>
        <SiteHeader title={getPageTitle()} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              {renderCurrentPage()}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
