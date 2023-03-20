import { fetchExtensionRefreshToken, fetchSelf, USERS_API_URL } from "../../apis/user-api";
import { MESSAGES } from "../../helpers/message-helpers";
import { promiseTuplify } from "../../utils/promise-utils";

export async function handleFetchSession(_, cb) {
  try {
    let { ctnn_access_token } = await chrome.storage.session.get(["ctnn_access_token"]);
    let { ctnn_refresh_token } = await chrome.storage.local.get(["ctnn_refresh_token"]);

    if (!ctnn_access_token) {
      if (!ctnn_refresh_token) {
        return cb(null);
      }

      const [res, error] = await promiseTuplify(
        fetchExtensionRefreshToken(USERS_API_URL, ctnn_refresh_token)
      );

      // ? Refresh token failed, session has expired
      if (error) {
        return cb(null);
      }

      ctnn_refresh_token = res.refresh_token;

      await chrome.storage.local.set({ refresh_token: ctnn_refresh_token });

      ctnn_access_token = res.access_token;
    }

    const user = await fetchSelf(USERS_API_URL, ctnn_access_token);

    return cb({ user });
  } catch (error) {
    console.log("Error in handle fetch session", error);
    cb(null);
  }
}

export async function handleLogin(data, cb) {
  try {
    const { access_token, refresh_token } = data;

    await chrome.storage.local.set({ ctnn_refresh_token: refresh_token });
    await chrome.storage.session.set({ ctnn_access_token: access_token });

    const user = await fetchSelf(USERS_API_URL, access_token);

    const alarm = chrome.alarms.create("init-refresh-token", {
      when: Date.now() + 1000 * 60 * 9,
    });

    return cb({ user });
  } catch (error) {
    console.log("Error in handle login", error);
    cb(null);
  }
}

export async function handleRefreshTokenAlarm() {
  const { ctnn_refresh_token } = await chrome.storage.session.get(["ctnn_refresh_token"]);

  const [res, error] = await promiseTuplify(
    fetchExtensionRefreshToken(USERS_API_URL, ctnn_refresh_token)
  );

  if (error) {
    return;
  }

  chrome.runtime.sendMessage({ type: MESSAGES.LOGGED_IN, data: res });
}
