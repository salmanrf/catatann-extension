import { CONFIG } from "../configs/config";

export const NOTES_API_URL = `${CONFIG.API_URL}/notes`;

export async function fetchCreateNote(note, access_token) {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(note),
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

export async function fetchFindOneNote(note_id, access_token) {
  try {
    const res = await fetch(`${NOTES_API_URL}/${note_id}`, {
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
    console.log("Error authenticating extension", error);

    throw error;
  }
}

export async function fetchSearchNotes(params, access_token) {
  try {
    const searchParams = new URLSearchParams(params);

    const res = await fetch(`${NOTES_API_URL}/search/?${searchParams.toString()}`, {
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
    console.log("Error authenticating extension", error);

    throw error;
  }
}

export async function fetchFindNotes(params, access_token) {
  try {
    const searchParams = new URLSearchParams(params);

    const res = await fetch(`${NOTES_API_URL}/?${searchParams.toString()}`, {
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
    console.log("Error authenticating extension", error);

    throw error;
  }
}
