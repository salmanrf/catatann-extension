import { fetchExtensionRefreshToken, USERS_API_URL } from "../apis/user-api";
import { MESSAGES } from "../helpers/message-helpers";
import { promiseTuplify } from "../utils/promise-utils";
import {
  handleLogin,
  handleFetchSession,
  handleRefreshTokenAlarm,
} from "./handlers/session-handler";

chrome.runtime.onInstalled.addListener(async () => {
  const { ctnn_refresh_token } = await chrome.storage.local.get(["ctnn_refresh_token"]);

  console.log("ctnn_refresh_token", ctnn_refresh_token);

  if (!ctnn_refresh_token) {
    return;
  }

  const [res, error] = await promiseTuplify(
    fetchExtensionRefreshToken(USERS_API_URL, ctnn_refresh_token)
  );

  console.log("onInstalled res", res);
  console.log("onInstalled error", error);

  if (error) {
    return;
  }

  // ? Callback is not used
  handleLogin(res, () => null);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type, data } = message ?? {};

  if (type === MESSAGES.LOGGED_IN) {
    handleLogin(data, sendResponse);
  }

  if (type === MESSAGES.FETCH_SELF) {
    handleFetchSession(data, sendResponse);
  }

  return true;
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "init-refresh-token") {
    handleRefreshTokenAlarm();
  }
});
