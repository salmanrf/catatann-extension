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

export async function fetchFindNotes(params) {
  try {
    const res = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(notes);
      }, 500);
    });

    return res;
  } catch (error) {
    throw error;
  }
}

export async function fetchFindOneNote(note_id) {
  try {
    const res = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(notes.find(({ id }) => id === note_id));
      }, 2000);
    });

    return res;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
