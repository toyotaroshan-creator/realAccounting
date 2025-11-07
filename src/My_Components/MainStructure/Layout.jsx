import React from "react";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { AppSidebar } from "../Sidebar/AppSidebar";
import { Navebar } from "../NaveBar/Navebar";
import { DataTableDemo } from "../Genral_Components/Data_Table/DataTableDemo";

export function Layout({ children }) {
  return (
    <>
      {/* Navbar */}

      <Navebar />
      <div className="absolute  w-full">
        {/* Sidebar context */}
        <SidebarProvider>
          {/* Sidebar */}
          <AppSidebar />

          {/* Main content area */}
          <main className="flex-1  py-16  ">
            {/* Top bar or header */}
            <div className="bg-whit flex-col ml-2   ">
              <SidebarTrigger />
              <DataTableDemo />
            </div>

            {/* Page content */}
            <div className="p-4">{children}</div>
          </main>
        </SidebarProvider>
      </div>
    </>
  );
}
