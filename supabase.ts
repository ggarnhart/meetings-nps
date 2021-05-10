import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://qdqsgvwxuraggvogibkt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNzU0NDE5NCwiZXhwIjoxOTMzMTIwMTk0fQ.yodn4sdRV00kOPPJ5IRbzIFZqV3d3Hbuh8ikTpmSSBg"
);

export const supabaseTables = {
  users: "users",
  meetings: "meetings",
  teams: "teams",
  ratings: "ratings",
};

export interface SupabaseUser {
  id?: number;
  gid: any;
  name: string;
  admin: boolean;
  team_gid: any;
  email: string;
}

export interface SupabaseTeam {
  id?: number;
  name: string;
  token: string;
  gid: any;
  slack_team_id: string;
  bot_user_id: string;
}

export interface SupabaseMeeting {
  id?: number; // this is auto generated
  gid: any;
  name?: string;
  team_gid: any;
  date_created?: Date; // this is auto generated
}
