export default function SignInButton() {
  return (
    <a href="https://slack.com/oauth/v2/authorize?user_scope=identity.basic,identity.team&client_id=940252849568.2026279949603&redirect_uri=https%3A%2F%2Ftalkback.ngrok.io%2Fauthenticate">
      <img
        alt="Sign in with Slack"
        height="40"
        width="172"
        src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
        srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
      />
    </a>
  );
}
