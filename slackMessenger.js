import { WebClient, LogLevel } from "@slack/web-api";
import { findTeamBySlackTeamId } from "./supabase/teams";

export const clientFromTeamId = async (teamId) => {
  let teams = await findTeamBySlackTeamId(teamId);
  let team = teams[0];
  return new WebClient(team.token, {
    logLevel: LogLevel.DEBUG,
  });
};

export const clientFromTeamToken = (teamToken) => {
  return new WebClient(teamToken, {
    logLevel: LogLevel.DEBUG,
  });
};
