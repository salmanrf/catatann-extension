import { CONFIG } from "../configs/config";

// ! This variable can't be referenced from content script
// ! Therefore content script functions need to be self contained
export const USERS_API_URL = `${CONFIG.API_URL}/users`;

export async function fetchExtensionLogin(base_url) {
  try {
    const url = `${base_url}/extension-signin`;

    const res = await fetch(url, {
      credentials: "include",
    });

    const { errors, data } = await res.json();

    if (res.status !== 200) {
      const error = new Error(errors[0]);

      error.errors = errors;

      throw error;
    }

    return data;
  } catch (error) {
    console.log("Error authenticating extension", error);

    throw error;
  }
}

export async function fetchExtensionRefreshToken(base_url, refresh_token) {
  try {
    const url = `${base_url}/extension-refresh`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token,
      }),
    });

    const { errors, data } = await res.json();

    if (res.status !== 200) {
      const error = new Error(errors[0]);

      error.errors = errors;

      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchSelf(base_url, access_token) {
  const url = `${base_url}/self`;

  try {
    const res = await fetch(url, {
      credentials: "omit",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const { errors, data } = await res.json();

    if (res.status !== 200) {
      const error = new Error(errors[0]);

      error.errors = errors;

      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}
