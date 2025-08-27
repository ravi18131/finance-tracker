import { ChartAreaInteractive } from "@/components/admin-dashboard/chart-area-interactive";
import { DataTable } from "@/components/admin-dashboard/data-table";
import { SectionCards } from "@/components/admin-dashboard/section-cards";
import data from "@/components/admin-dashboard/data.json";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <ChartAreaInteractive />
        <DataTable data={data} />
      </div>
    </>
  );
}
