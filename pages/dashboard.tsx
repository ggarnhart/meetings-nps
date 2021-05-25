import DashboardArea from "../components/Dashboard/DashboardArea";
import DashboardNav from "../components/Dashboard/DashboardNav";
import FloatingButton from "../components/Dashboard/FloatingButton";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-screen min-h-screen bg-gray-100 dark:bg-gray-900">
      <DashboardNav />
      <FloatingButton />
      <div className="mx-auto md:w-screen-90">
        <DashboardArea />
      </div>
    </div>
  );
}
