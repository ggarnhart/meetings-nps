import {
  confirmNegativeFollowUpDesired,
  negativeFollowUp,
  wasMeetingNecessary,
  wasInputValued,
  lastComments,
  wasMeetingRightLength,
  positiveFollowUp,
} from "../../../messages";
import { clientFromTeamId } from "../../../slackMessenger";
import { v4 as uuidv4 } from "uuid";
import {
  addInitialRating,
  updateRating,
  ratingSentFollowUp,
} from "../../../supabase/ratings";
import { ContinuousColorLegend } from "react-vis";

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
        let ratings = await addRating(user, meetingId, buttonValue);
        let rating = ratings[0];

        if (!rating.sent_followup && buttonValue < 6) {
          try {
            await sendBlockMessage(
              client,
              channel.id,
              [negativeFollowUp(rating.gid)],
              user.id,
              true
            );
            await ratingSentFollowUp(rating);
            res.status(200).json({ data: "Okay!" });
          } catch (err) {
            console.log(err);
          }
        } else if (!rating.sent_followup) {
          try {
            await sendBlockMessage(
              client,
              channel.id,
              [positiveFollowUp(rating.gid)],
              user.id,
              true
            );
            await ratingSentFollowUp(rating);
            res.status(200).json({ data: "Okay!" });
          } catch (err) {
            console.error(error);
          }
        } else {
          // this happens when you've already rated and already had a follow-up sent to you.
          res.status(200).json({ data: "Okay!" });
        }
      } else {
        res.status(200).json({ data: "Okay!" });
        switch (action_id) {
          case "affirm-feedback-questions-positive":
          case "affirm-feedback-questions-negative":
            await sendFeedbackQuestions(
              client,
              body.response_url,
              channel.id,
              user.id,
              value
            );
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
            await updateRating({
              gid: value,
              meeting_necessary: true,
            });
            break;
          case "meeting-was-not-necessary":
            await axios.post(body.response_url, {
              replace_original: true,
              text: "Yikes! Good to know. Thank you!",
            });
            await updateRating({
              gid: value,
              meeting_necessary: false,
            });
            break;
          case "presence-was-needed":
            await axios.post(body.response_url, {
              replace_original: true,
              text: "Sweet!",
            });
            await updateRating({
              gid: value,
              input_valued: true,
            });
            break;
          case "presence-was-not-needed":
            await axios.post(body.response_url, {
              replace_original: true,
              text: "Ah! So sorry about that. Thanks for the feedback.",
            });
            await updateRating({
              gid: value,
              input_valued: false,
            });
            break;
          case "meeting-too-short":
            await axios.post(body.response_url, {
              replace_original: true,
              text: "A few extra minutes can definitely be helpful. Thanks for the feedback!",
            });
            await updateRating({
              gid: value,
              meeting_right_length: -1,
            });
            break;
          case "meeting-right-length":
            await axios.post(body.response_url, {
              replace_original: true,
              text: "A perfectly timed meeting?! Congats!",
            });
            await updateRating({
              gid: value,
              meeting_right_length: 0,
            });
            break;
          case "meeting-too-long":
            await axios.post(body.response_url, {
              replace_original: true,
              text: "Thanks for the heads up. We've made note of your feedback!",
            });
            await updateRating({
              gid: value,
              meeting_right_length: 1,
            });
            break;
          case "dismiss-comment":
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

const sendFeedbackQuestions = async (
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
      ],
      // removed lastComments(meetingId), from the above array. could put it back later
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

const addRating = async (user, meetingGid, ratingValue) => {
  let ratingObject = {
    gid: uuidv4(),
    meeting_gid: meetingGid,
    rating: ratingValue,
    user_id: user.id,
  };
  let rating = await addInitialRating(ratingObject);
  return rating;
};
