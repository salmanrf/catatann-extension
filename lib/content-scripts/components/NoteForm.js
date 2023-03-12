import { html, reactive, watch } from "@arrow-js/core";

export function NoteForm(onSubmit) {
  const noteFormState = reactive({
    title: "",
    content: "",
    reference_url: "",
  });

  watch(() => {
    console.log("noteFormState", noteFormState);
  });

  function submitNote(e) {
    e.preventDefault();

    console.log("ASHIAP CUY");

    onSubmit(noteFormState);
  }

  noteFormState.reference_url = window.location.href;

  return html`
    <div id="ctnn-form-container">
      <form action="" @submit="${submitNote}">
        <div class="ctnn-form-control ctnn-mb-1_5">
          <label for="title" class="ctnn-text-md">Title</label>
          <input
            name="title"
            type="text"
            class="ctnn-text-lg"
            value="${() => noteFormState.title}"
            @input="${(e) => {
              noteFormState.title = e.target.value;
            }}"
          />
        </div>
        <div class="ctnn-form-control ctnn-mb-1_5">
          <label for="content" class="ctnn-text-md">Content</label>
          <textarea
            class="ctnn-text-md"
            value="${() => noteFormState.content}"
            @input="${(e) => (noteFormState.content = e.target.value)}"
          ></textarea>
        </div>
        <div class="ctnn-form-control ctnn-mb-1_5">
          <label for="reference_url" class="ctnn-text-md">Reference Url</label>
          <input
            name="reference_url"
            type="text"
            class="ctnn-text-lg"
            value="${() => noteFormState.reference_url}"
            @change="${(e) => (noteFormState.reference_url = e.target.value)}"
          />
        </div>
        <div class="ctnn-form-control ctnn-mb-1_5 align-end">
          <button type="submit" class="ctnn-button ctnn-text-md">Save</button>
        </div>
      </form>
    </div>
  `;
}
