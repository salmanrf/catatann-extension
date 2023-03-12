const notes = [
  {
    id: "1",
    title: "Docker Cheatsheet",
    content: "Docker is a lorem ipsum whatever...",
  },
  {
    id: "2",
    title: "Chrome Extension Development 101",
    content: "Just go check the documentation website...",
  },
  {
    id: "3",
    title: "PostgreSQL Cheatsheet",
    content: "Lorem Ipsum...",
  },
  {
    id: "4",
    title: "Beach House Greatest Hits",
    content: "1. Silver Soul 2. Beyond Love 3. Space Song 4. Elegy To The Void 5. PPP",
  },
];

export async function fetchFindNotes(params) {
  try {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(notes);
      }, 500);
    });
  } catch (error) {
    throw error;
  }
}

export async function fetchFindOneNote(note_id) {
  try {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(notes[Math.round((Math.random() * 10) % (notes.length - 1))]);
      }, 500);
    });
  } catch (error) {
    throw error;
  }
}
