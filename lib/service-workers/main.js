import { fetchExtensionRefreshToken, USERS_API_URL } from "../apis/user-api";
import { MESSAGES } from "../helpers/message-helpers";
import { promiseTuplify } from "../utils/promise-utils";
import * as noteHandlers from "./handlers/note-handler";
import * as sessionHandlers from "./handlers/session-handler";

const handlers = new Map();

function setupHandlers() {
  // ? Session handlers
  handlers.set(MESSAGES.LOGGED_IN, sessionHandlers.handleLogin);
  handlers.set(MESSAGES.FETCH_SELF, sessionHandlers.handleFetchSession);

  // ? Note handlers
  handlers.set(MESSAGES.FIND_ONE_NOTE, noteHandlers.handleFetchOneNote);
  handlers.set(MESSAGES.FIND_NOTES, noteHandlers.handleFetchNotes);
  handlers.set(MESSAGES.SEARCH_NOTES, noteHandlers.handleSearchNotes);
}

chrome.runtime.onInstalled.addListener(async () => {
  setupHandlers();

  const { ctnn_refresh_token } = await chrome.storage.local.get(["ctnn_refresh_token"]);

  if (!ctnn_refresh_token) {
    return;
  }

  const [res, error] = await promiseTuplify(
    fetchExtensionRefreshToken(USERS_API_URL, ctnn_refresh_token)
  );

  if (error) {
    return;
  }

  // ? Callback is not used
  handlers.get(MESSAGES.LOGGED_IN)(res, () => null);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type, data } = message ?? {};

  const handler = handlers.get(type);

  if (!(handler instanceof Function)) {
    throw new Error("Unrecognized message type");
  }

  handler(data, sendResponse);

  return true;
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "init-refresh-token") {
    sessionHandlers.handleRefreshTokenAlarm();
  }
});
