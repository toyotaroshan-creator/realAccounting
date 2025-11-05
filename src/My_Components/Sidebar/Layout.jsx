import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Sidebar } from "../../components/ui/sidebar";
import { Navebar } from "../NaveBar/Navebar";

export function Layout({ children }) {
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "false";

  return (
    <>
      <Navebar />
      <div className="fixed ">
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </div>
    </>
  );
}
