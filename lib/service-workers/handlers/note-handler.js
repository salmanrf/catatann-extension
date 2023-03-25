import { fetchFindNotes, fetchFindOneNote, fetchSearchNotes } from "../../apis/notes-api";

export async function handleFetchOneNote(params, cb) {
  console.group("handleFetchOneNote");

  try {
    const { note_id } = params;
    let { ctnn_access_token } = await chrome.storage.session.get(["ctnn_access_token"]);

    console.log("note_id", note_id);
    console.log("ctnn_access_token", ctnn_access_token);

    const data = await fetchFindOneNote(note_id, ctnn_access_token);

    console.log("data", data);

    return cb(data);
  } catch (error) {
    console.log("Error in handle fetch session", error);
    cb(null);
  }

  console.groupEnd();
}

export async function handleSearchNotes(params, cb) {
  try {
    let { ctnn_access_token } = await chrome.storage.session.get(["ctnn_access_token"]);

    const data = await fetchSearchNotes(params, ctnn_access_token);

    console.log("data", data);
    console.log("cb", cb);

    return cb(data);
  } catch (error) {
    console.log("Error in handle fetch session", error);
    cb(null);
  }
}

export async function handleFetchNotes(params, cb) {
  try {
    let { ctnn_access_token } = await chrome.storage.session.get(["ctnn_access_token"]);

    const data = await fetchFindNotes(params, ctnn_access_token);

    console.log("data", data);
    console.log("cb", cb);

    return cb(data);
  } catch (error) {
    console.log("Error in handle fetch session", error);
    cb(null);
  }
}
