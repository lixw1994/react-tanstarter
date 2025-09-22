"use client";

import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggle from "~/components/ThemeToggle";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";


interface FloatingControlsProps {
  user: {
    id?: string;
    name?: string;
    email?: string;
    image?: string;
    [key: string]: unknown;
  } | null;
}

export function FloatingControls({ user }: FloatingControlsProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // 客户端挂载检测
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <TooltipProvider>
      <div className="fixed top-6 right-4 z-40 flex items-center gap-3 lg:right-6 lg:z-50">
        {/* 显示/隐藏切换按钮 */}
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleVisibility}
              className="h-10 w-10 rounded-xl border-0 bg-white/90 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-xl dark:bg-gray-900/90 dark:ring-gray-700/50 dark:hover:bg-gray-900"
            >
              {isVisible ? (
                <EyeOff className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="rounded-lg bg-gray-900 text-white border-gray-700">
            {isVisible ? "隐藏控制栏" : "显示控制栏"}
          </TooltipContent>
        </Tooltip>

        {/* 控制栏内容 */}
        {isVisible && (
          <div className="flex items-center gap-3 rounded-xl bg-white/90 p-2 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl dark:bg-gray-900/90 dark:ring-gray-700/50">
            {/* 主题切换按钮 */}
            <ThemeToggle
              showLabel={false}
              className="h-9 w-9 rounded-lg border-0 bg-gray-50/80 shadow-sm ring-1 ring-gray-200/30 transition-all duration-200 hover:scale-105 hover:bg-gray-100 hover:shadow-md dark:bg-gray-800/80 dark:ring-gray-700/30 dark:hover:bg-gray-700"
            />
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
