'use client';

import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import data from "../data.json";

export function OverviewPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* 概览卡片 - 收入、支出、用户、增长 */}
      <SectionCards />
      
      {/* 交互式图表 */}
      <ChartAreaInteractive />
      
      {/* 交易历史表格 */}
      <DataTable data={data} />
    </div>
  );
}
