import { SectionCards } from "@/components/admin-dashboard/dashboard/section-cards";
import Users from "./users";
import AllUsersAnalytics from "@/components/admin-dashboard/dashboard/dashboard-carts";
import HeroSection from "@/components/admin-dashboard/dashboard/herosection";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <HeroSection />
        <SectionCards />
        <AllUsersAnalytics />
        <Users />
      </div>
    </>
  );
}
