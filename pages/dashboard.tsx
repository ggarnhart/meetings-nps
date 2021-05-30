import DashboardArea from "../components/Dashboard/DashboardArea";
import DashboardNav from "../components/Dashboard/DashboardNav";
import FloatingButton from "../components/Dashboard/FloatingButton";

import { useAuth } from "../AppContext";
import LoginModal from "../components/LoginModal";

export default function Dashboard() {
  const { teamMember } = useAuth();
  if (undefined === teamMember.gid) {
    return (
      <div className="flex flex-col w-screen h-screen overflow-y-hidden bg-gray-100 dark:bg-gray-900">
        <LoginModal />
        <DashboardNav />
        <FloatingButton />
        <div className="mx-auto w-screen-90">
          <div className="flex flex-col w-full px-4 py-6">
            <div className="flex flex-col w-full h-8 px-4 py-2 mb-4 text-white bg-indigo-600 rounded-md opacity-70 md:items-center md:justify-between md:flex-row text-md" />
            <div className="w-full my-4 bg-gray-200 rounded h-screen-60" />
            <div className="w-full my-4 bg-white rounded opacity-75 h-screen-60" />
          </div>
        </div>
      </div>
    );
  } else {
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
}
