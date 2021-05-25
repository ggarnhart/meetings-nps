import { BrandSlack } from "tabler-icons-react";

export default function Install() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen p-4 bg-gray-100 dark:bg-gray-700 dark:text-white">
      <div className="w-12 h-12 bg-gray-300 rounded-xl" />
      <h2 className="my-4 text-xl font-bold">
        We're glad you're interested in Meetings NPS
      </h2>
      <p>
        To continue the installation process, please click the button below.
      </p>
      <a
        className="my-4"
        href="https://slack.com/oauth/v2/authorize?client_id=940252849568.2026279949603&scope=commands,incoming-webhook,chat:write,chat:write.public&user_scope=chat:write&redirect_uri=https%3A%2F%2Ftrytalkback.com%2Fcomplete-install"
      >
        <img
          alt="Add to Slack"
          height="40"
          width="139"
          src="https://platform.slack-edge.com/img/add_to_slack.png"
          srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
        />
      </a>
    </div>
  );
}
