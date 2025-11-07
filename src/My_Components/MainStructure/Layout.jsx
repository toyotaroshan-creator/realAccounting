import React from "react";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { AppSidebar } from "../Sidebar/AppSidebar";
import { Navebar } from "../NaveBar/Navebar";
import { DataTableDemo } from "../Genral_Components/Data_Table/DataTableDemo";
import { Button } from "../../components/ui/button";
import { Breadcrumbgeneral } from "../Genral_Components/Breadcrumb/Breadcrumbgeneral";
import { Show } from "./main/Show";
import { Routecomponents } from "./Routecomponents";

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
              <div className="m-5">
                <div className="mb-5 flex items-center">
                  <div className="-ml-7">
                    <SidebarTrigger />
                  </div>
                  <div className="ml-1">
                    <Breadcrumbgeneral />
                  </div>
                </div>
                {/* <Show /> */}
                <Routecomponents />
              </div>
            </div>

            {/* Page content */}
            <div className="p-4">{children}</div>
          </main>
        </SidebarProvider>
      </div>
    </>
  );
}
