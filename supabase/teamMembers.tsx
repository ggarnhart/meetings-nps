import {
  supabase,
  supabaseTables,
  SupabaseTeam,
  SupabaseTeamMember,
} from "../supabase";

export const addOrReturnTeamMember = async (teamMember: SupabaseTeamMember) => {
  try {
    const {
      data: previouslyInsertedTeamMembers,
      error: previouslyInsertedError,
    } = await supabase
      .from(supabaseTables.teamMembers)
      .select()
      .eq("slack_user_id", teamMember.slack_user_id);

    if (previouslyInsertedTeamMembers.length === 0) {
      const { data: addedTeamMembers, error } = await supabase
        .from(supabaseTables.teamMembers)
        .insert(teamMember);
      if (addedTeamMembers.length > 0) {
        return addedTeamMembers[0];
      } else {
        console.error(error);
      }
    } else {
      if (previouslyInsertedError) {
        console.error(previouslyInsertedError);
      } else {
        return previouslyInsertedTeamMembers[0];
      }
    }
  } catch (err) {
    console.log(err);
  }
};
