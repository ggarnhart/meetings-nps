import {
  supabase,
  supabaseTables,
  SupabaseMeeting,
  SupabaseRating,
} from "../supabase";

export const ratingSentFollowUp = async (ratingObject: SupabaseRating) => {
  try {
    const { data, error } = await supabase
      .from(supabaseTables.ratings)
      .update({ sent_followup: true })
      .match({ gid: ratingObject.gid });
    if (data) {
      return data;
    } else {
      console.error(error);
    }
  } catch (err) {
    console.error(err);
  }
};

export const addInitialRating = async (ratingObject: SupabaseRating) => {
  try {
    const { data: previousRatings, error: previousRatingError } = await supabase
      .from(supabaseTables.ratings)
      .select()
      .match({
        meeting_gid: ratingObject.meeting_gid,
        user_id: ratingObject.user_id,
      });
    if (previousRatings.length != 0) {
      const previousRating = previousRatings[0];
      const { data: updateRating, error: updatePreviousRatingError } =
        await supabase
          .from(supabaseTables.ratings)
          .update({ rating: ratingObject.rating })
          .match({ gid: previousRating.gid });

      if (updateRating) {
        return updateRating;
      } else {
        return updatePreviousRatingError;
      }
    } else {
      const { data, error } = await supabase
        .from(supabaseTables.ratings)
        .insert(ratingObject);

      if (data) {
        return data;
      } else {
        return error;
      }
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
