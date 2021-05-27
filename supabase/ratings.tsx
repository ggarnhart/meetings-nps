import {
  supabase,
  supabaseTables,
  SupabaseMeeting,
  SupabaseRating,
} from "../supabase";

export const addInitialRating = async (ratingObject: SupabaseRating) => {
  console.log("HERE");
  try {
    const { data: previousRating, error: previousRatingError } = await supabase
      .from(supabaseTables.ratings)
      .select()
      .match({
        meeting_gid: ratingObject.meeting_gid,
        user_id: ratingObject.user_id,
      });
    console.log(previousRating);

    const { data, error } = await supabase
      .from(supabaseTables.ratings)
      .insert(ratingObject);

    if (data) {
      return data;
    } else {
      return error;
    }
  } catch (err) {
    console.log(err);
  }
};

export interface UpdateRatingInterface {
  gid: any;
  meeting_necessary?: boolean;
  input_valued?: boolean;
  meeting_right_length?: number;
  comment?: string;
}
export const updateRating = async (infoToUpdate: UpdateRatingInterface) => {
  // come back to this.
  try {
    const { data, error } = await supabase
      .from("ratings")
      .update(infoToUpdate)
      .eq("gid", infoToUpdate.gid);
    if (data) {
      console.log(data);
      return data;
    } else {
      console.log(error);
      return error;
    }
  } catch (err) {
    console.log("couldn't update rating");
    console.log(err);
  }
};
