import { useEffect, useState } from "react";
import DashboardNav from "../../components/Dashboard/DashboardNav";
import FloatingButton from "../../components/Dashboard/FloatingButton";
import MeetingSpecifics from "../../components/Dashboard/MeetingSpecifics";
export default function Meeting() {
  return (
    <div className="flex flex-col w-screen min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      <DashboardNav />
      <FloatingButton />
      <div className="mx-auto md:w-screen-90 ">
        <MeetingSpecifics />
      </div>
    </div>
  );
}
