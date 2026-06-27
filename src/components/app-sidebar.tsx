import { useEffect, useState, useCallback } from "react";
import {
    Sidebar,
    SidebarProvider,
    SidebarTrigger,
    SidebarContent,
    SidebarInset,
} from "@/components/imports/sidebar";
import Globe from "@/components/cesium/globe.wrapper";

const sidebarWidth = 256;

export const AppSidebar = () => {
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
                        <SidebarTrigger className="hover:cursor-pointer" />
                    </div>

                    <div className="absolute inset-0 z-0">
                        <Globe />
                    </div>
                </SidebarInset>

            </SidebarProvider>
        </div>

    )
}