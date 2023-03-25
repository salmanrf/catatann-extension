import { MESSAGES } from "../../helpers/message-helpers";

const notes = [
  {
    id: "1",
    title: "Docker Cheatsheet",
    content: "Docker is a...",
  },
  {
    id: "2",
    title: "Chrome Extension Development 101",
    content: "https://developer.chrome.com/docs/extensions/mv3/getstarted/extensions-101/",
  },
  {
    id: "3",
    title: "PostgreSQL Cheatsheet",
    content: "Lorem Ipsum...",
  },
  {
    id: "4",
    title: "Beach House",
    content: "...",
  },
];

export async function createNote(note) {
  try {
    const res = await chrome.runtime.sendMessage({
      type: MESSAGES.CREATE_NOTE,
      data: {
        ...(note ?? {}),
      },
    });

    return res;
  } catch (error) {
    throw error;
  }
}

export async function updateNote(note) {
  try {
    const res = await chrome.runtime.sendMessage({
      type: MESSAGES.UPDATE_NOTE,
      data: {
        ...(note ?? {}),
      },
    });

    return res;
  } catch (error) {
    throw error;
  }
}

export async function deleteNote(note_id) {
  try {
    const res = await chrome.runtime.sendMessage({
      type: MESSAGES.DELETE_NOTE,
      data: {
        note_id,
      },
    });

    return res;
  } catch (error) {
    throw error;
  }
}

export async function searchNotes(params) {
  try {
    const res = await chrome.runtime.sendMessage({
      type: MESSAGES.SEARCH_NOTES,
      data: {
        ...(params ?? {}),
      },
    });

    console.log("res", res);

    return res;
  } catch (error) {
    console.log("error", error);

    throw error;
  }
}

export async function findNotes(params) {
  try {
    const res = await chrome.runtime.sendMessage({
      type: MESSAGES.FIND_NOTES,
      data: {
        ...(params ?? {}),
      },
    });

    console.log("res", res);

    return res;
  } catch (error) {
    console.log("error", error);

    throw error;
  }
}

export async function findOneNote(note_id) {
  try {
    const res = await chrome.runtime.sendMessage({
      type: MESSAGES.FIND_ONE_NOTE,
      data: {
        note_id,
      },
    });

    console.log("res", res);

    return res;
  } catch (error) {
    console.log("error", error);
    throw error;
  }

  console.groupEnd();
}
