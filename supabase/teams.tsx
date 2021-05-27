import { updateLocale } from "moment";
import { supabase, supabaseTables, SupabaseTeam } from "../supabase";
export const addTeam = async (teamObject: SupabaseTeam) => {
  try {
    if ((await findTeamBySlackTeamId(teamObject.slack_team_id)).length == 0) {
      const { data, error } = await supabase
        .from(supabaseTables.teams)
        .insert(teamObject);

      if (data) {
        return data;
      } else {
        return error;
      }
    } else {
      const { data: updateRow, error: updateRowError } = await supabase
        .from(supabaseTables.teams)
        .update({ token: teamObject.token })
        .match({ slack_team_id: teamObject.slack_team_id });
      console.log(updateRow);
    }
  } catch (err) {
    console.log(err);
  }
};

export const findTeamBySlackTeamId = async (slackTeamId: string) => {
  try {
    const { data, error } = await supabase
      .from(supabaseTables.teams)
      .select()
      .eq("slack_team_id", slackTeamId);

    if (data) {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};
