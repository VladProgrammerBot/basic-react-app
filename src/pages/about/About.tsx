import { ParticleBackground } from "@/components/BackgroundEffects";
import { GradientBackground } from "@/components/GradientBg";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export const About = () => {
  return (
    <div>
      <GradientBackground />
      <ParticleBackground />
      Manual
      <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
    </div>
  );
};
