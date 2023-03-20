import { fetchExtensionLogin, USERS_API_URL } from "../apis/user-api";
import { CONFIG } from "../configs/config";
import { MESSAGES } from "../helpers/message-helpers";

export async function startAuthFlow() {
  try {
    // ? Attempt to fetchSelf with previously stored tokens
    const fetchUserRes = await chrome.runtime.sendMessage({ type: MESSAGES.FETCH_SELF });

    console.log("fetchUserRes", fetchUserRes);

    if (fetchUserRes) {
      const { user } = fetchUserRes;

      if (user && user.user_id) {
        return user;
      }
    }

    // ? Get the first open Client App tab
    const tab = await findClientAppTab();
    // ? Attempt to fetch new refresh token using refresh toke stored in Client App
    const res = await authenticateFromClientApp(tab);

    console.log("Authenticate from client app result", res);

    // ? Unable to authenticate through Client App, finish
    if (!res) {
      return null;
    }

    // ? Authentication through Client App success, emit login event, resulting in user
    const result = await chrome.runtime.sendMessage({ type: MESSAGES.LOGGED_IN, data: res });

    console.log("Login handler result", result);

    console.log("result", result);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function findClientAppTab() {
  const clientAppTabs = await chrome.tabs.query({
    url: [`${CONFIG.CLIENT_APP_URL}/*`],
  });

  if (clientAppTabs.length > 0) {
    return clientAppTabs[0];
  }

  return createClientAppTab();
}

export async function createClientAppTab(options) {
  const tab = await chrome.tabs.create({
    active: false,
    url: CONFIG.CLIENT_APP_URL,
    ...options,
  });

  return tab;
}

async function authenticateFromClientApp(clientAppTab) {
  console.log("Try authentication");

  try {
    const res = await chrome.scripting.executeScript({
      target: { tabId: clientAppTab.id },
      func: fetchExtensionLogin,
      args: [USERS_API_URL],
    });

    return res[0].result;
  } catch (error) {
    console.log("error at authenticate", error);

    throw error;
  }
}
