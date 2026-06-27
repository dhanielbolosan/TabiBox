'use client'

import { AppNavbar } from "@/components/app-navbar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout() {

  return (
    <div className="relative h-screen w-screen overflow-hidden flex flex-col">

      <AppNavbar />
      <AppSidebar />

    </div>
  );
}
