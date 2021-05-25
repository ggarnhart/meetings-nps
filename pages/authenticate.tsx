import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addOrReturnTeamMember } from "../supabase/teamMembers";
import { v4 as uuidv4 } from "uuid";
import { findTeamBySlackTeamId } from "../supabase/teams";
import { useAuth, useMetadata } from "../AppContext";
import Spinner from "../components/Spinner";
export default function Authenticate() {
  const router = useRouter();
  const { code } = router.query;

  const { teamMember, setTeamMember } = useAuth();
  const { appMetadata, setAppMetadata } = useMetadata();

  const [authFinished, setAuthFinished] = useState(false);

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
                redirect_uri: "https://trytalkback.com/authenticate",
              },
            }
          );

          if (result) {
            let { data } = result;
            let { authed_user, team } = data;

            console.log(authed_user);

            let teams = await findTeamBySlackTeamId(team.id);
            let foundTeam = teams[0];

            setAppMetadata({ teamName: foundTeam.name });

            let teamMember = await addOrReturnTeamMember({
              gid: uuidv4(),
              team_gid: foundTeam.gid,
              slack_user_id: authed_user.id,
              access_token: authed_user.access_token,
            });
            setTeamMember(teamMember);
            setAuthFinished(true);
            router.push("/dashboard");
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
      <h2 className="text-xl font-bold ">talkback is logging you in</h2>
      <h1 className="font-bold ">We're excited you're here!</h1>

      {!authFinished && (
        <div className="w-8 h-8 my-2">
          <Spinner />
        </div>
      )}
      {authFinished && <p>Redirecting you to your dashboard shortly!</p>}
    </div>
  );
}
