"use client";

import React from "react";
import nextDynamic from "next/dynamic";

// Test 页较重，使用动态导入并禁用 SSR，避免打进服务端包
const TestPage = nextDynamic(() => import("../components/test-page"), { ssr: false });

export const dynamic = "force-static";

export default function Page() {
  return <TestPage />;
}


