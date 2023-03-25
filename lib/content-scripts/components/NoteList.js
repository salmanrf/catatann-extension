import { html, reactive } from "@arrow-js/core";
import { LoadingIcon } from "../../icons/loading";
import { fetchFindNotes, fetchFindOneNote } from "../apis/note-api";
import { SuggestedInput } from "./SuggestedInput";

export function NotesList() {
  const state = reactive({
    loading: false,
    current_note: null,
  });

  state.$on("loading", () => console.log("loading", state.loading));
  state.$on("current_note", () => console.log("current_note", state.current_note));

  function submitNoteParameters(e) {
    e.preventDefault();

    console.log("state", state);
  }

  async function genNoteOptionLoader(keyword, cb) {
    try {
      const notes = await fetchFindNotes({});

      cb(notes.map(({ id, title }) => ({ label: title, value: id })));
    } catch (error) {
      console.log("Couldn't fetch notes", error);
    }
  }

  async function findOneNote() {
    state.loading = true;

    // const [res, error] = await promiseTuplify(fetchFindOneNote("3"));
    const res = await fetchFindOneNote("3");

    console.log("res", res);

    state.loading = false;
  }

  return html`
    <div id="ctnn-form-container">
      <form action="" @submit="${submitNoteParameters}">
        <div class="ctnn-form-control ctnn-mb-1_5">
          <!-- Calling findOneNote from this component only updates the state -->
          ${SuggestedInput({
            name: "search",
            placeholder: "Keyword...",
            className: "ctnn-text-lg",
            loadOptions: genNoteOptionLoader,
            onSelect: findOneNote,
          })}
        </div>
      </form>
    </div>
    <!-- Calling from this button works -->
    <button @click="${findOneNote}">Fetch</button>
    ${() =>
      state.loading &&
      html`
        <div class="ctnn-loading-placeholder ctnn-mb-1_5">
          ${LoadingIcon({ width: 35, height: 35, color: "hsl(0, 0%, 50%)" })}
        </div>
      `}
    ${() =>
      state.current_note &&
      html`
        <div id="ctnn-note-container">
          <div class="note-title">${() => state.current_note.title}</div>
          <div class="note-content">${() => state.current_note.content}</div>
          <div class="note-reference">${() => state.current_note.reference}</div>
        </div>
      `}
  `;
}
