export default function InstallButton() {
  return (
    <a href="https://slack.com/oauth/v2/authorize?client_id=940252849568.2026279949603&scope=commands,incoming-webhook,chat:write,chat:write.public&user_scope=chat:write&redirect_uri=https%3A%2F%2Ftrytalkback.com%2Fcomplete-install">
      <img
        alt="Add to Slack"
        height="40"
        width="139"
        src="https://platform.slack-edge.com/img/add_to_slack.png"
        srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
      />
    </a>
  );
}
