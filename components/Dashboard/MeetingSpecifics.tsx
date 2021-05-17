import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ChevronRight } from "tabler-icons-react";
import { getSpecificMeetingDetails } from "../../supabase/meetings";
export default function MeetingSpecifics() {
  const router = useRouter();
  const { gid } = router.query;

  const [meetingDetails, setMeetingDetails] = useState();

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      console.log(await getSpecificMeetingDetails(gid));
    };
    fetchMeetingDetails();
  }, [gid]);
  return (
    <div className="flex flex-col w-full px-4 py-6 dark:bg-gray-900">
      <div className="flex flex-row items-center px-4 py-2 text-sm text-gray-600 dark:text-gray-200">
        <Link href="/dashboard">Dashboard</Link>
        <ChevronRight size={16} />
        <span>placeholder</span>
      </div>
    </div>
  );
}
