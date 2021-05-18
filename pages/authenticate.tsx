import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { addOrReturnTeamMember } from "../supabase/teamMembers";
import { v4 as uuidv4 } from "uuid";
import { findTeamBySlackTeamId } from "../supabase/teams";
export default function Authenticate() {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    const confirmLogin = async () => {
      if (code !== undefined && code !== null && code !== "") {
        try {
          let result = await axios.get(
            "https://slack.com/api/oauth.v2.access",
            {
              params: {
                code: code,
                client_id: process.env.client_id,
                client_secret: process.env.client_secret,
                redirect_uri: "https://talkback.ngrok.io/authenticate",
              },
            }
          );

          if (result) {
            let { data } = result;
            let { authed_user, team } = data;

            let teams = await findTeamBySlackTeamId(team.id);
            let foundTeam = teams[0];

            let teamMember = await addOrReturnTeamMember({
              gid: uuidv4(),
              team_gid: foundTeam.gid,
              slack_user_id: authed_user.id,
              access_token: authed_user.access_token,
            });
            console.log(teamMember);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    confirmLogin();
  }, [code]);
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden text-white bg-indigo-800">
      <h2 className="text-lg font-bold">Logging you in</h2>
    </div>
  );
}