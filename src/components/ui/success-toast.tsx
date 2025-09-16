"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle } from "lucide-react";

interface SuccessToastProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function SuccessToast({ 
  isOpen, 
  onClose, 
  title = "Message sent successfully!",
  message = "Thank you for your interest. We'll get back to you within 24 hours."
}: SuccessToastProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // 4秒后自动关闭

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-full duration-300">
      <div className="bg-card border border-green-200 dark:border-green-800 rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-medium text-sm text-green-800 dark:text-green-200">{title}</h3>
              <p className="text-green-700 dark:text-green-300 text-xs mt-1">
                {message}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
