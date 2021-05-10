import { supabase, supabaseTables, SupabaseMeeting } from "../supabase";

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
