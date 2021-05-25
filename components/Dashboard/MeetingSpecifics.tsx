import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ChevronRight, CalendarStats, Users, Stars } from "tabler-icons-react";
import { supabase, SupabaseMeeting } from "../../supabase";

import {
  getMeetingByMeetingGid,
  MeetingAndRatings,
} from "../../supabase/meetings";
import pluralize from "pluralize";
export default function MeetingSpecifics() {
  const router = useRouter();
  const { gid } = router.query;

  const [meeting, setMeeting] = useState({} as MeetingAndRatings);
  const [slackUsers, setSlackUsers] = useState([]);

  useEffect(() => {
    const fetchMeetingData = async () => {
      setMeeting(await getMeetingByMeetingGid(gid));
    };

    fetchMeetingData();

    const meetingSubscription = supabase
      .from(`meetings:gid=eq.${gid}`)
      .on("*", () => updateMeeting())
      .subscribe();

    const ratingSubscription = supabase
      .from(`ratings:meeting_gid=eq.${gid}`)
      .on("*", () => updateMeeting())
      .subscribe();
  }, [gid]);

  const updateMeeting = async () => {
    console.log("meeting is being updated");
    if (undefined !== gid && null !== gid && "" !== gid) {
      setMeeting(await getMeetingByMeetingGid(gid));
    }
  };

  return (
    <div className="flex flex-col w-full px-4 py-6 dark:bg-gray-900">
      <div className="flex flex-row items-center py-2 text-sm text-gray-600 dark:text-gray-200">
        <Link href="/dashboard">Dashboard</Link>
        <ChevronRight size={16} />
        <span className="font-bold">
          {meeting && meeting.name ? meeting.name : "No Name Provided"}
        </span>
      </div>
      {meeting && (
        <>
          <div className="flex flex-row items-center my-4">
            <CalendarStats className="mr-4 opacity-60" size={32} />
            <div className="flex flex-col">
              <p className="text-xs tracking-widest">MEETING</p>
              <p className="text-xl font-bold">
                {meeting && meeting.name ? meeting.name : "No Name Provided"}
              </p>
            </div>
          </div>
          <div className="h-12"></div>
          <div className="flex flex-row items-center my-4">
            <Stars className="mr-4 opacity-60" size={32} />
            <div className="flex flex-col">
              <p className="text-xs tracking-widest">RATINGS</p>
              <p className="text-xl font-bold">
                {meeting && meeting.ratings
                  ? `${pluralize("Rating", meeting.ratings.length, true)}`
                  : "No Ratings"}
              </p>
            </div>
          </div>
          <div className="flex flex-row">
            {meeting.ratings &&
              meeting.ratings.map((rating, index) => {
                return (
                  <div
                    className="flex flex-col px-4 py-4 mr-4 text-lg font-bold bg-indigo-100 rounded md:flex-row"
                    key={index}
                  >
                    {rating.rating}
                  </div>
                );
              })}
          </div>
          <div className="h-12"></div>
          {/* <div className="flex flex-row items-center my-4">
            <Users className="mr-4 opacity-60" size={32} />
            <div className="flex flex-col">
              <p className="text-xs tracking-widest">TEAM MEMBERS</p>
              <p className="text-xl font-bold">
                {meeting && meeting.ratings
                  ? `${pluralize("Rating", meeting.ratings.length, true)}`
                  : "No Ratings"}
              </p>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
}
