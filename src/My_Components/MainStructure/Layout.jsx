import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { Breadcrumbgeneral } from "../Genral_Components/Breadcrumb/Breadcrumbgeneral";
import { links } from "./ImportComponents";

export function Layout({ children }) {
  return (
    <>
      {/* Navbar */}

      <links.Navebar />
      <div className="absolute  w-full">
        {/* Sidebar context */}
        <SidebarProvider>
          {/* Sidebar */}
          <links.AppSidebar />

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
                    <links.Breadcrumbgeneral />
                  </div>
                </div>
                {/* <Show /> */}
                <links.Routecomponents />
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
