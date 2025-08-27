import HeroSection from "@/components/dashboard/admin-readonly/analytics/herosection";
import AllUsersAnalytics from "@/components/dashboard/user/dashboard/dashboard-charts";
import { SectionCards } from "@/components/dashboard/user/dashboard/section-cards";

export default function UserDashboard() {
  return (
    <>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <HeroSection />
        <SectionCards />
        <AllUsersAnalytics />
      </div>
    </>
  );
}
