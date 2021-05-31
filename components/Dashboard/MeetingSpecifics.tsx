import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  CalendarStats,
  UserCheck,
  Stars,
  YinYang,
  Report,
  UserX,
  CalendarMinus,
  CalendarPlus,
} from "tabler-icons-react";
import { supabase, SupabaseMeeting } from "../../supabase";
import { useAuth } from "../../AppContext";
import {
  getMeetingByMeetingGid,
  MeetingAndRatings,
} from "../../supabase/meetings";
import pluralize from "pluralize";

export type RatingSentiment = {
  totalRatings?: number;
  feltNecessary?: number;
  feltUnnecessary?: number;
  feltNeeded?: number;
  feltUnneeded?: number;
  tooShort?: number;
  justRightLength?: number;
  tooLong?: number;
};

export default function MeetingSpecifics() {
  const { teamMember } = useAuth(); // todo: add the team before commit
  const router = useRouter();
  const { gid } = router.query;

  const [meeting, setMeeting] = useState({} as MeetingAndRatings);
  const [ratingSentiment, setRatingSentiment] = useState({} as RatingSentiment);
  const [slackUsers, setSlackUsers] = useState([]);

  console.log(meeting);

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

  useEffect(() => {
    if (meeting.ratings.length > 0) {
      let sentiment = {} as RatingSentiment;
      meeting.ratings.forEach((rating) => {
        if (rating.input_valued) {
          // TODO: Do something
        }
      });
    }
  }, [meeting]);

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
                    className="flex flex-col px-4 py-4 mr-4 text-lg font-bold bg-indigo-100 rounded dark:bg-indigo-400 md:flex-row"
                    key={index}
                  >
                    {rating.rating}
                  </div>
                );
              })}
          </div>
          <div className="h-12" />
          <div className="flex flex-row items-center my-4">
            <Report className="mr-4 opacity-60" size={32} />
            <div className="flex flex-col">
              <p className="text-xs tracking-widest">SENTIMENT</p>
              <p className="text-xl font-bold">3 Categories</p>
            </div>
          </div>
          <div className="flex flex-col ml-12">
            {ratingSentiment.feltNecessary && (
              <div className="flex flex-row items-center mb-2">
                <UserCheck size={24} className="mr-4" />{" "}
                {ratingSentiment.feltNecessary}{" "}
                {pluralize("people", ratingSentiment.feltNecessary, false)}{" "}
                described the meeting as necessary.
              </div>
            )}
            {ratingSentiment.feltUnnecessary && (
              <div className="flex flex-row items-center mb-2">
                <UserX size={24} className="mr-4" />{" "}
                {ratingSentiment.feltUnnecessary}{" "}
                {pluralize("people", ratingSentiment.feltUnnecessary, false)}{" "}
                described the meeting as unecessary.
              </div>
            )}
            {ratingSentiment.feltNeeded && (
              <div className="flex flex-row items-center my-2">
                <YinYang size={24} className="mr-4" />{" "}
                {ratingSentiment.feltNeeded}{" "}
                {pluralize("people", ratingSentiment.feltNeeded, false)} felt
                needed
              </div>
            )}
            {ratingSentiment.justRightLength && (
              <div className="flex flex-row items-center my-2">
                <CalendarStats size={24} className="mr-4" />{" "}
                {ratingSentiment.justRightLength}{" "}
                {pluralize("people", ratingSentiment.justRightLength, false)}{" "}
                said the duration was just right.
              </div>
            )}
            {ratingSentiment.tooShort && (
              <div className="flex flex-row items-center my-2">
                <CalendarMinus size={24} className="mr-4" />{" "}
                {ratingSentiment.justRightLength}{" "}
                {pluralize("people", ratingSentiment.tooShort, false)} said the
                duration was too short.
              </div>
            )}
            {ratingSentiment.tooLong && (
              <div className="flex flex-row items-center my-2">
                <CalendarPlus size={24} className="mr-4" />{" "}
                {ratingSentiment.justRightLength}{" "}
                {pluralize("people", ratingSentiment.tooShort, false)} said the
                duration was too long.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
