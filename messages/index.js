export const onboarding = () => {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Hi there! 👋\n I'm *talkback*. I'm here to help make your meetings more effective and efficient. 😄\n\n\n 💡To begin, `/rate-meeting`! I'll prompt you and the team to give their anonymous rating.\n\n 👩‍💻For the data focused, you can visit your dashboard with `/talkback-stats`.\n\n\n Thanks for having me!",
      },
    },
  ];
};
export const positiveFollowUp = (ratingId) => {
  return [
    {
      type: "section",
      text: {
        type: "plain_text",
        text: "Thanks for the feedback! It seems like this meeting went pretty well. If you're open to sharing, we'd love to learn why! Most people finish the follow-up questions in under 30 seconds.",
        emoji: true,
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Sure",
            emoji: true,
          },
          style: "primary",
          value: ratingId,
          action_id: "affirm-feedback-questions-positive",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Not this time",
            emoji: true,
          },
          value: ratingId,
          action_id: "decline-feedback-questions-positive",
        },
      ],
    },
  ];
};

export const negativeFollowUp = (ratingId) => {
  return [
    {
      type: "section",
      text: {
        type: "plain_text",
        text: "Thanks for the feedback! It seems like you didn't love this meeting — trust us, we've been there. If you're open to sharing, we'd love to learn why! Most people finish the follow-up questions in under 30 seconds.",
        emoji: true,
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Sure",
            emoji: true,
          },
          style: "primary",
          value: ratingId,
          action_id: "affirm-feedback-questions-negative",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Not this time",
            emoji: true,
          },
          value: ratingId,
          action_id: "decline-feedback-questions-negative",
        },
      ],
    },
  ];
};
export const confirmNegativeFollowUpDesired = [
  {
    type: "section",
    text: {
      type: "plain_text",
      text: "Sweet. See below!",
      emoji: true,
    },
  },
];

export const wasMeetingNecessary = (ratingId) => {
  return [
    {
      type: "section",
      text: {
        type: "plain_text",
        text: "Was the meeting necessary?",
        emoji: true,
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "👍",
            emoji: true,
          },
          value: ratingId,
          action_id: "meeting-was-necessary",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "👎",
            emoji: true,
          },
          value: ratingId,
          action_id: "meeting-was-not-necessary",
        },
      ],
    },
  ];
};

export const wasInputValued = (ratingId) => {
  return [
    {
      type: "section",
      text: {
        type: "plain_text",
        text: "Did you feel that your input was valued and utilized?",
        emoji: true,
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "👍",
            emoji: true,
          },
          value: ratingId,
          action_id: "presence-was-needed",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "👎",
            emoji: true,
          },
          value: ratingId,
          action_id: "presence-was-not-needed",
        },
      ],
    },
  ];
};

export const wasMeetingRightLength = (ratingId) => {
  return [
    {
      type: "section",
      text: {
        type: "plain_text",
        text: "Was the meeting the right length?",
        emoji: true,
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Too Short",
            emoji: true,
          },
          value: ratingId,
          action_id: "meeting-too-short",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Just Right",
            emoji: true,
          },
          value: ratingId,
          action_id: "meeting-right-length",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Too Long",
            emoji: true,
          },
          value: ratingId,
          action_id: "meeting-too-long",
        },
      ],
    },
  ];
};

export const lastComments = (ratingId) => {
  return [
    {
      dispatch_action: true,
      type: "input",
      element: {
        type: "plain_text_input",
        action_id: `last-thoughts-${ratingId}`,
      },
      label: {
        type: "plain_text",
        text: "Any last thoughts? Comments are anonymized, if it makes a difference.",
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "No comments? No worries. You can leave this message here or dismiss it using the button.",
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          text: "Dismiss",
          emoji: true,
        },
        style: "danger",
        value: "dismiss-comment",
        action_id: "dismiss-comment",
      },
    },
  ];
};

export const buildRateMessage = (meetingId) => {
  return [
    {
      type: "section",
      text: {
        type: "plain_text",
        text: "Hello! Please rate your meeting on a 1-10 scale with 1 being the lowest and 10 being the highest.",
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
          value: `1-${meetingId}`,
          action_id: "buttonRating-1",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "2",
            emoji: true,
          },
          value: `2-${meetingId}`,
          action_id: "buttonRating-2",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "3",
            emoji: true,
          },
          value: `3-${meetingId}`,
          action_id: "buttonRating-3",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "4",
            emoji: true,
          },
          value: `4-${meetingId}`,
          action_id: "buttonRating-4",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "5",
            emoji: true,
          },
          value: `5-${meetingId}`,
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
          value: `6-${meetingId}`,
          action_id: "buttonRating-6",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "7",
            emoji: true,
          },
          value: `7-${meetingId}`,
          action_id: "buttonRating-7",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "8",
            emoji: true,
          },
          value: `8-${meetingId}`,
          action_id: "buttonRating-8",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "9",
            emoji: true,
          },
          value: `9-${meetingId}`,
          action_id: "buttonRating-9",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "10",
            emoji: true,
          },
          value: `10-${meetingId}`,
          action_id: "buttonRating-10",
        },
      ],
    },
  ];
};
