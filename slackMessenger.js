import { WebClient, LogLevel } from "@slack/web-api";

//TODO: obviously remove the hardcoded xapp
export const client = new WebClient(
  "xoxb-940252849568-2032342463828-S5exsRLR2qyBwoVv6iyZMnKN",
  {
    logLevel: LogLevel.DEBUG,
  }
);
