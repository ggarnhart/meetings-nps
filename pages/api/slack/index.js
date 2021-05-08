import {
  confirmNegativeFollowUpDesired,
  negativeFollowUp,
  wasMeetingNecessary,
  wasInputValued,
  lastComments,
  wasMeetingRightLength,
} from "../../../messages";

import { client } from "../../../slackMessenger";

const axios = require("axios");

export default async (req, res) => {
  if (req.body) {
    const body = JSON.parse(req.body.payload);
    console.log(body);
    const { channel } = body;
    if (body.actions) {
      const { action_id, value } = body.actions[0];

      if (action_id.indexOf("buttonRating") !== -1) {
        if (value < 6) {
          const replace = {
            replace_original: true,
            blocks: negativeFollowUp,
          };
          try {
            await axios.post(body.response_url, replace);
          } catch (err) {
            console.log(err);
          }
          res.status(200).json({ data: "Okay!" });
        } else {
          res.status(200).json({ data: "John Doe" });
        }
      } else {
        switch (action_id) {
          case "affirm-feedback-questions-negative":
            await sendNegativeFeedbackQuetsions(body.response_url, channel);
            res.status(200).json({ data: "Okay!" });
            break;
        }
      }
    } else {
      res.status(200).json({ data: "John Doe" });
    }
  }
};

const sendNegativeFeedbackQuetsions = async (responseUrl, channel) => {
  const replace = {
    replace_original: true,
    blocks: confirmNegativeFollowUpDesired,
  };
  try {
    await axios.post(responseUrl, replace);
    await sendBlockMessage(channel, [
      wasMeetingNecessary,
      wasInputValued,
      wasMeetingRightLength,
      lastComments,
    ]);
  } catch (err) {
    console.log(err);
  }
};

const sendBlockMessage = async (channel, blocks) => {
  console.log("in send block");
  blocks.forEach(async (blockMessage) => {
    try {
      let res = await client.chat.postMessage({
        channel: channel.id,
        blocks: blockMessage,
      });
      console.log(res);
    } catch (err) {
      console.log(err.data);
    }
  });
};
