import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { TabContent } from "./TabContent";
import { TabProvider, useTabs } from "@/contexts/TabContext";
import { Toaster } from "sonner";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayoutContent({ children }: MainLayoutProps) {

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <div className="sticky top-0 h-screen">
          <AppSidebar />
        </div>
        
        <div className="flex flex-col flex-1 min-w-0">
          <div className="sticky top-0 z-10">
            <AppHeader />
          </div>
          
          <main className="flex-1 overflow-y-auto min-h-0">
            <TabContent />
          </main>
        </div>
      </div>
      
      {/* Toast Notifications */}
      <Toaster />
    </SidebarProvider>
  );
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <TabProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </TabProvider>
  );
}