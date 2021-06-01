import groupBy from "lodash/groupBy";
import moment from "moment";
import {
  supabase,
  supabaseTables,
  SupabaseMeeting,
  SupabaseUser,
} from "../supabase";

export const addMeeting = async (meetingObject: SupabaseMeeting) => {
  try {
    const { data, error } = await supabase
      .from(supabaseTables.meetings)
      .insert(meetingObject);

    if (data) {
      return data;
    } else {
      return error;
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * Get all the meetings. yikes.
 */
export const godModeMeetings = async () => {
  try {
    const { data, error } = await supabase
      .from(supabaseTables.meetings)
      .select();
    if (data) {
      return data;
    } else {
      return error;
    }
  } catch (err) {
    console.log("Error in God Mode Meeting Retrieval");
    console.error(err);
  }
};

type QueriedRating = {
  rating: number;
  slack_user_id?: string;
  meeting_necessary?: number;
  input_valued?: number;
  meeting_right_length?: number;
};

export type MeetingAndRatings = {
  name: string;
  gid: any;
  date_created: string;
  ratings: Array<QueriedRating>;
  averageRating?: number;
};

export const getMeetingByMeetingGid = async (gid: any, teamGid: any) => {
  try {
    const { data: meetings, error } = await supabase
      .from(supabaseTables.meetings)
      .select(
        "name, gid, date_created, ratings(rating, meeting_necessary, input_valued, meeting_right_length)"
      )
      .match({ gid: gid, team_gid: teamGid });

    if (meetings) {
      let meeting: MeetingAndRatings = meetings[0];

      return meeting;
    } else {
      console.error(error);
    }
  } catch (err) {
    console.log("Error in getting meetings by team");
    console.error(err);
  }
};

export const getMeetingsByTeam = async (teamGid: any) => {
  try {
    const { data: meetingsUntyped, error } = await supabase
      .from(supabaseTables.meetings)
      .select("name, gid, date_created, ratings(rating)")
      .eq("team_gid", teamGid);
    if (meetingsUntyped) {
      let meetings: Array<MeetingAndRatings> = meetingsUntyped;
      meetings.sort(
        (a, b) =>
          new Date(b.date_created).getTime() -
          new Date(a.date_created).getTime()
      );
      meetings.forEach((meeting) => {
        meeting.averageRating = getMeetingRatingAverage(meeting);
      });
      return meetings;
    } else {
      console.error(error);
    }
  } catch (err) {
    console.log("Error in getting meetings by team");
    console.error(err);
  }
};

export const getRatingsByMeetings = async (meetingGid: any) => {
  try {
    // const { data, error } = await supabase
    //   .from(supabaseTables.meetings)
    //   .select("name, gid, date_created, ratings(meetingGid)")
    //   .eq("team_gid", meetingGid);

    let { data: ratings, error } = await supabase
      .from("ratings")
      .select(
        `rating,
          meetings (
            name,date_created
          )
      `
      )
      .eq("meeting_gid", meetingGid);
    if (ratings) {
      return ratings;
    } else {
      return error;
    }
  } catch (err) {
    console.log("Error in getting ratings by ");
    console.error(err);
  }
};

export const getMeetingsByWeek = async (teamGid: any) => {
  const { data: meetings, error } = await supabase
    .from(supabaseTables.meetings)
    .select(`date_created, ratings(rating)`)
    .eq("team_gid", teamGid);
  if (meetings) {
    // sort the dates.
    meetings.sort(
      (a, b) =>
        new Date(a.date_created).getTime() - new Date(b.date_created).getTime()
    );

    let meetingsByWeek = groupBy(meetings, (meeting) =>
      moment(meeting.date_created).week()
    );

    return meetingsByWeek;
  } else {
    return error;
  }
};

// may want to clean this up, but here's what i'm planning on sending in:
//{ date_created: "2021-05-14", ratings: (3) […] }
// date_created: "2021-05-14"
// ​​​
// ratings: Array(3) [ {…}, {…}, {…} ]
// ​​​​
// 0: Object { rating: 5 }
// ​​​​
// 1: Object { rating: 2 }
// ​​​​
// 2: Object { rating: 1 }
export const getMeetingRatingAverage = (meeting: any) => {
  if (meeting.ratings) {
    let average =
      meeting.ratings.reduce(
        (accumulator, cur) => accumulator + cur.rating,
        0
      ) / meeting.ratings.length;
    if (!isNaN(average)) {
      return average;
    }
  } else {
    console.error("No ratings found for this meeting");
    return;
  }
};

// averages the meeting's averages. So if one meeting has 100 ratings, it's weighted the same as a meeting with 10 ratings.
// just a thought.
export const getMeetingAverageByWeekAsData = async (teamGid: any) => {
  let meetingsByWeek = await getMeetingsByWeek(teamGid);
  let weekKeys = Object.keys(meetingsByWeek);

  let weekAveragePairs = weekKeys.map((key, index) => {
    let currentWeekOfMeetings = meetingsByWeek[key];
    let weekStartDate = undefined;
    let weekEndDate = undefined;
    if (currentWeekOfMeetings.length > 0) {
      weekStartDate = new Date(currentWeekOfMeetings[0].date_created);
      weekEndDate = new Date(
        currentWeekOfMeetings[currentWeekOfMeetings.length - 1].date_created
      );
    }

    let weekStartString = moment(weekStartDate).format("MMM Do");

    // now, make an array of the average
    let meetingAveragesWithUndefined = currentWeekOfMeetings.map((m) => {
      return getMeetingRatingAverage(m);
    });

    // remove undefined
    let meetingAverages = meetingAveragesWithUndefined.filter(
      (item) => undefined !== item
    );

    let weeklyAverage =
      meetingAverages.reduce((accumulator, cur) => accumulator + cur, 0) /
      meetingAverages.length;
    return { x: `Week of ${weekStartString}`, y: weeklyAverage };
  });

  return weekAveragePairs;
};

// averages the ratings's averages. So if 10 ratings are 10 and 1 rating is 1 for a given week, the result will be 9.18
export const getRatingAverageByWeek = async (teamGid: any) => {
  let meetingsByWeek = await getMeetingsByWeek(teamGid);

  let weekKeys = Object.keys(meetingsByWeek);

  let weekAveragePairs = weekKeys.map((key, index) => {
    let currentWeekOfMeetings = meetingsByWeek[key];
    let weekStartDate = undefined;
    let weekEndDate = undefined;
    if (currentWeekOfMeetings.length > 0) {
      weekStartDate = new Date(currentWeekOfMeetings[0].date_created);
      weekEndDate = new Date(
        currentWeekOfMeetings[currentWeekOfMeetings.length - 1].date_created
      );
    }

    let weekStartString = moment(weekStartDate).format("MMM Do");

    // now, make an array of the average
    let ratings = [];
    currentWeekOfMeetings.forEach((m) => {
      m.ratings.forEach((r) => {
        ratings.push(r.rating);
      });
    });

    let weeklyAverage =
      ratings.reduce((accumulator, cur) => accumulator + cur, 0) /
      ratings.length;
    return { x: `Week of ${weekStartString}`, y: weeklyAverage };
  });

  return weekAveragePairs;
};

export const getMeetingsCount = async (teamGid: any) => {
  const { data, error } = await supabase
    .from(supabaseTables.meetings)
    .select("name, gid, date_created")
    .eq("team_gid", teamGid);

  return data.length;
};

export const getRatingsCountAndAverage = async (teamGid: any) => {
  const { data: meetings, error } = await supabase
    .from(supabaseTables.meetings)
    .select(`ratings(rating)`)
    .eq("team_gid", teamGid);

  let allRatings = Array<number>();
  meetings.forEach((meeting) => {
    let ratings = meeting.ratings;
    ratings.forEach((rating) => {
      allRatings.push(rating.rating);
    });
  });

  let average =
    allRatings.reduce((accumulator, current) => accumulator + current, 0) /
    allRatings.length;
  return {
    average: average,
    count: allRatings.length,
  };
};

export const getSpecificMeetingDetails = async (
  meetingGid: any,
  teamGid: any
) => {
  const { data: meeting, error } = await supabase
    .from(supabaseTables.meetings)
    .select(`*, ratings(*)`)
    .match({ gid: meetingGid, team_gid: teamGid });
  if (meeting) {
    return meeting;
  } else {
    console.error(error);
  }
};
