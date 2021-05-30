import { addMeeting } from "../../../supabase/meetings";
import { findTeamBySlackTeamId } from "../../../supabase/teams";
import { v4 as uuidv4 } from "uuid";
import { sendBlockMessage } from "./index";
import { clientFromTeamToken } from "../../../slackMessenger";
import { buildRateMessage } from "../../../messages/index";
// send rate message
export default async (req, res) => {
  const { body } = req;
  try {
    res.status(200).json({
      replace_original: "true",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Follow the link to login to your dashboard. Go get 'em, 🐯",
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "Dashboard",
            },
            url: "https://trytalkback.com/dashboard",
          },
        },
      ],
      response_type: "ephemeral",
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};
