export const negativeFollowUp = [
  {
    type: "section",
    text: {
      type: "plain_text",
      text:
        "Thanks for the feedback! It seems like you didn't love this meeting — trust us, we've been there. If you're open to sharing, we'd love to learn why!",
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
        value: "affirm-feedback-questions-negative",
        action_id: "affirm-feedback-questions-negative",
      },
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "Not this time",
          emoji: true,
        },
        value: "decline-negative-feedback-questions",
        action_id: "decline-feedback-questions-negative",
      },
    ],
  },
];

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

export const wasMeetingNecessary = [
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
        value: "meeting-was-necessary",
        action_id: "meeting-was-necessary",
      },
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "👎",
          emoji: true,
        },
        value: "meeting-was-not-necessary",
        action_id: "meeting-was-not-necessary",
      },
    ],
  },
];

export const wasInputValued = [
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
        value: "presence-was-needed",
        action_id: "presence-was-needed",
      },
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "👎",
          emoji: true,
        },
        value: "presence-was-not-needed",
        action_id: "presence-was-not-needed",
      },
    ],
  },
];

export const wasMeetingRightLength = [
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
        value: "meeting-too-short",
        action_id: "meeting-too-short",
      },
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "Just Right",
          emoji: true,
        },
        value: "meeting-right-length",
        action_id: "meeting-right-length",
      },
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "Too Long",
          emoji: true,
        },
        value: "meeting-too-long",
        action_id: "meeting-too-long",
      },
    ],
  },
];

export const lastComments = [
  {
    dispatch_action: true,
    type: "input",
    element: {
      type: "plain_text_input",
      action_id: "plain_text_input-action",
    },
    label: {
      type: "plain_text",
      text:
        "Any last thoughts? Comments are anonymized, if it makes a difference.",
      emoji: true,
    },
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text:
        "No comments? No worries. You can leave this message here or dismiss it using the button.",
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
