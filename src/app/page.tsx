'use client'

import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarInset,
} from "@/components/imports/sidebar";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem
} from "@/components/imports/navigation-menu";
import Globe from "@/components/cesium/globe.wrapper";
import { useEffect, useState, useCallback } from "react";

export default function Layout() {
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
  };

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;

    const newWidth = Math.min(Math.max(e.clientX, 200), 500);
    setSidebarWidth(newWidth);
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div className="relative h-screen w-screen overflow-hidden flex flex-col">

      <header className="absolute top-0 left-0 right-0 flex items-center h-16 z-50 border-b bg-gray-500 px-6">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <h1>TabiBox</h1>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      <div className="flex-1 flex pt-16 overflow-hidden">
        <SidebarProvider
          className="flex-1 flex overflow-hidden"
          style={{ "--sidebar-width": `${sidebarWidth}px` } as React.CSSProperties}
        >
          <Sidebar collapsible="icon" className="relative top-16! h-[calc(100vh-4rem)]! border-r">
            <SidebarContent className="bg-gray-500">

            </SidebarContent>
          </Sidebar>

          <SidebarInset className="flex-1 h-full relative">
            <div className="absolute top-4 left-4 z-50 rounded-md border bg-gray-500">
              <SidebarTrigger />
            </div>

            <div className="absolute inset-0 z-0">
              <Globe />
            </div>
          </SidebarInset>

        </SidebarProvider>
      </div>

    </div>
  );
}
