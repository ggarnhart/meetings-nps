import DashboardNav from "../../components/Dashboard/DashboardNav";
import MeetingSpecifics from "../../components/Dashboard/MeetingSpecifics";
export default function Meeting() {
  return (
    <div className="flex flex-row min-h-screen bg-gray-100 min-w-screen">
      <DashboardNav />
      <MeetingSpecifics />
    </div>
  );
}
