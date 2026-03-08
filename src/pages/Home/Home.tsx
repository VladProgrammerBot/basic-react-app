import { Navigation } from "./Navigation";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { ComparisonTable } from "./ComparisonTable";
import { CTASection } from "./CTASection";
import { ParticleBackground } from "../../components/BackgroundEffects";
import { ScrollToTopButton } from "./ScrollToTopButton";
import { GradientBackground } from "@/components/GradientBg";
import { UsingList } from "./UsingList";
import { useHome } from "@/hooks/homepage/useHome";

export const Home = () => {
  const { isLoggedIn, handleGetStarted, handleSignIn } = useHome();

  return (
    <div className="min-h-screen bg-gradient-to-b dark:from-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-neutral-100">
      <ParticleBackground />
      <ScrollToTopButton />
      <GradientBackground />

      <div className="relative p-4 pb-0 md:pb-0 md:p-6 max-w-7xl mx-auto">
        <Navigation isLoggedIn={isLoggedIn} onSignIn={handleSignIn} />

        <HeroSection onGetStarted={handleGetStarted} />

        {/* <StatsSection /> */}

        <UsingList />

        <FeaturesSection />

        <ComparisonTable />

        {/* <TestimonialsSection /> */}

        <CTASection onGetStarted={handleGetStarted} />

        {/* <div className="floater mb-24 mx-auto w-fit">
          <div className="spinner p-4">
            <span className="text-content ml-2">It's FREE!</span>
          </div>
        </div> */}

        <div className="relative">
          <p className="text-center text-neutral-500 p-18 border-t-1 border-neutral-300 dark:border-neutral-700">
            © 2025, Made in Ukraine by Vlad 🇺🇦
          </p>
        </div>
      </div>
    </div>
  );
};
