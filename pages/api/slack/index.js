import {
  confirmNegativeFollowUpDesired,
  negativeFollowUp,
  wasMeetingNecessary,
  wasInputValued,
  lastComments,
  wasMeetingRightLength,
} from "../../../messages";
import { clientFromTeamId } from "../../../slackMessenger";

const axios = require("axios");

export default async (req, res) => {
  if (req.body) {
    const body = JSON.parse(req.body.payload);
    const { channel, user, team } = body;
    let client = await clientFromTeamId(team.id);
    if (body.actions) {
      const { action_id, value } = body.actions[0];

      if (action_id.indexOf("buttonRating") !== -1) {
        let [buttonValue, meetingId] = extractValueAndMeetingId(value);
        if (buttonValue < 6) {
          try {
            await sendBlockMessage(
              client,
              channel.id,
              [negativeFollowUp(meetingId)],
              user.id,
              true
            );
            res.status(200).json({ data: "Okay!" });
          } catch (err) {
            console.log(err);
          }
        } else {
          res.status(200).json({ data: "John Doe" });
        }
      } else {
        switch (action_id) {
          case "affirm-feedback-questions-negative":
            console.log(value);
            await sendNegativeFeedbackQuestions(
              client,
              body.response_url,
              channel.id,
              user.id,
              value
            );
            res.status(200).json({ data: "Okay!" });
            break;
          case "decline-feedback-questions-negative":
            const replace = {
              replace_original: true,
              text: "No worries! Hope your meetings improve :)",
            };
            await axios.post(body.response_url, replace);
            break;
          case "meeting-was-necessary":
            await axios.post(body.response_url, {
              replace_original: true,
              text: "Glad to hear!",
            });
            break;
          case "meeting-was-not-necessary":
            res.status(200).json({ data: "okay!" });
            await axios.post(body.response_url, {
              replace_original: true,
              text: "Yikes! Good to know. Thank you!",
            });
            break;
          case "presence-was-needed":
            res.status(200).json({ data: "okay!" });
            await axios.post(body.response_url, {
              replace_original: true,
              text: "Sweet!",
            });
            break;
          case "presence-was-not-needed":
            res.status(200).json({ data: "okay!" });
            await axios.post(body.response_url, {
              replace_original: true,
              text: "Ah! So sorry about that. Thanks for the feedback.",
            });
            break;
          case "meeting-too-short":
            res.status(200).json({ data: "okay!" });
            await axios.post(body.response_url, {
              replace_original: true,
              text:
                "A few extra minutes can definitely be helpful. Thanks for the feedback!",
            });
            break;
          case "meeting-right-length":
            res.status(200).json({ data: "okay!" });
            await axios.post(body.response_url, {
              replace_original: true,
              text: "A perfectly timed meeting?! Congats!",
            });
            break;
          case "meeting-too-long":
            res.status(200).json({ data: "okay!" });
            await axios.post(body.response_url, {
              replace_original: true,
              text:
                "Thanks for the heads up. We've made note of your feedback!",
            });
            break;
          case "dismiss-comment":
            res.status(200).json({ data: "okay!" });
            const replaceCommentField = {
              replace_original: true,
              text: "_Comment Response Dismissed_",
            };
            await axios.post(body.response_url, replaceCommentField);
            break;
        }
      }
    } else {
      res.status(200).json({ data: "Idk how you got here." });
    }
  }
};

const sendNegativeFeedbackQuestions = async (
  client,
  responseUrl,
  channel,
  userId,
  meetingId
) => {
  const replace = {
    replace_original: true,
    blocks: confirmNegativeFollowUpDesired,
  };
  try {
    await axios.post(responseUrl, replace);
    await sendBlockMessage(
      client,
      channel,
      [
        wasMeetingNecessary(meetingId),
        wasInputValued(meetingId),
        wasMeetingRightLength(meetingId),
        lastComments(meetingId),
      ],
      userId,
      true
    );
  } catch (err) {
    console.log(err);
  }
};

export const sendBlockMessage = async (
  client,
  channel,
  blocks,
  userId = undefined,
  ephemeral = false
) => {
  blocks.forEach(async (blockMessage) => {
    try {
      if (userId !== undefined && ephemeral) {
        let res = await client.chat.postEphemeral({
          channel: channel,
          blocks: blockMessage,
          user: userId,
        });
      } else {
        let res = await client.chat.postMessage({
          channel: channel,
          blocks: blockMessage,
        });
      }
    } catch (err) {
      console.log("issue sending message");
      console.log(err.data);
    }
  });
};

const extractValueAndMeetingId = (value) => {
  let dash = value.indexOf("-");
  let buttonValue = value.substring(0, dash);
  let meetingId = value.substring(dash + 1);

  return [buttonValue, meetingId];
};
