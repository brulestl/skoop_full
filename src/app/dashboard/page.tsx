import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/layout";

export const metadata = {
  title: "Dashboard | SKOOP",
  description: "Manage your saved content across the internet in one place"
};

function DashboardLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardLayout />
    </Suspense>
  );
}