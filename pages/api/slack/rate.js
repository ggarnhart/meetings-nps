// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const rateMessage = {
  blocks: [
    {
      type: "section",
      text: {
        type: "plain_text",
        text:
          "Hello! Please rate your meeting on a 1-10 scale with 1 being the lowest and 10 being the highest.",
        emoji: true,
      },
    },
    {
      type: "divider",
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "1",
            emoji: true,
          },
          value: "1",
          action_id: "buttonRating-1",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "2",
            emoji: true,
          },
          value: "2",
          action_id: "buttonRating-2",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "3",
            emoji: true,
          },
          value: "3",
          action_id: "buttonRating-3",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "4",
            emoji: true,
          },
          value: "4",
          action_id: "buttonRating-4",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "5",
            emoji: true,
          },
          value: "5",
          action_id: "buttonRating-5",
        },
      ],
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "6",
            emoji: true,
          },
          value: "6",
          action_id: "buttonRating-6",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "7",
            emoji: true,
          },
          value: "7",
          action_id: "buttonRating-7",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "8",
            emoji: true,
          },
          value: "8",
          action_id: "buttonRating-8",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "9",
            emoji: true,
          },
          value: "9",
          action_id: "buttonRating-9",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "10",
            emoji: true,
          },
          value: "10",
          action_id: "buttonRating-10",
        },
      ],
    },
  ],
};

// send rate message
export default (req, res) => {
  res.status(200).json(rateMessage);
};
