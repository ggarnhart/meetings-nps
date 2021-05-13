import DashboardArea from "../components/Dashboard/DashboardArea";
import DashboardNav from "../components/Dashboard/DashboardNav";

export default function Dashboard() {
  return (
    <div className="flex flex-row min-h-screen bg-gray-100 min-w-screen">
      <DashboardNav />
      <DashboardArea />
    </div>
  );
}
