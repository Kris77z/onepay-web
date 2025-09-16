"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ComingSoonToastProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComingSoonToast({ isOpen, onClose }: ComingSoonToastProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 3秒后自动关闭

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-full duration-300">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary text-sm">🚀</span>
            </div>
            <div>
              <h3 className="font-medium text-sm">Coming Soon!</h3>
              <p className="text-muted-foreground text-xs mt-1">
              The product is about to be launched, please look forward to it！
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
