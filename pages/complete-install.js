import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AlertCircle } from "tabler-icons-react";
import Spinner from "../components/Spinner";
import { v4 as uuidv4 } from "uuid";

import { addTeam } from "../supabase/teams";

export default function CompleteInstall() {
  const [installComplete, setInstallComplete] = useState(-1);

  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    const confirmInstall = async () => {
      if (code !== undefined && code !== null && code !== "") {
        try {
          let result = await axios.get(
            "https://slack.com/api/oauth.v2.access",
            {
              params: {
                code: code,
                client_id: process.env.client_id,
                client_secret: process.env.client_secret,
                redirect_uri: "https://trytalkback.com/complete-install",
              },
            }
          );

          if (result) {
            let { data } = result;

            await addTeam({
              name: data.team.name,
              slack_team_id: data.team.id,
              token: data.access_token,
              gid: uuidv4(),
              bot_user_id: data.bot_user_id,
            });

            setInstallComplete(1);
          }
        } catch (err) {
          setInstallComplete(0);
          console.log(err);
        }
      }
    };
    if (code !== undefined && code !== null && code !== "") {
      confirmInstall();
    }
  }, [code]);
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen p-4 bg-gray-100 dark:bg-gray-700 dark:text-white">
      <div className="w-12 h-12 bg-gray-300 rounded-xl" />
      {installComplete === -1 && (
        <>
          <Spinner className="w-6 h-6 my-4 text-indigo-600" />
          <h2 className="text-xl font-bold">
            Installation is almost complete.
          </h2>
        </>
      )}
      {installComplete === 0 && (
        <>
          <AlertCircle className="my-4" size={32} color="#DC2626" />
          <h2 className="text-xl font-bold">
            Yikes! There was an error. Please contact us for support.
          </h2>
        </>
      )}
      {installComplete === 1 && (
        <>
          <h2 className="my-4 text-xl font-bold">
            Thanks for completing installation!
          </h2>
          <p>Head back to Slack to start using Meetings-NPS.</p>
        </>
      )}
    </div>
  );
}
