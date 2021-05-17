import { addMeeting } from "../../../supabase/meetings";
import { findTeamBySlackTeamId } from "../../../supabase/teams";
import { v4 as uuidv4 } from "uuid";
import { sendBlockMessage } from "./index";
import { clientFromTeamToken } from "../../../slackMessenger";
import { buildRateMessage } from "../../../messages/index";
// send rate message
export default async (req, res) => {
  const { body } = req;
  console.log(body);
  try {
    const teams = await findTeamBySlackTeamId(body.team_id); // should only be one, obviously, but it passes it back in an array
    const team = teams[0];
    console.log(teams);
    const meetings = await addMeeting({
      gid: uuidv4(),
      name: body.text,
      team_gid: team.gid,
    });
    // console.log("--");
    // console.log(meetings[0].gid);
    // console.log("--");
    res.status(200).json("Sending message now.");
    let client = clientFromTeamToken(team.token);
    await sendBlockMessage(client, body.channel_id, [
      buildRateMessage(meetings[0].gid),
    ]);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};
