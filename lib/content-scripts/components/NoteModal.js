import { html } from "@arrow-js/core";

export function NoteModal() {
  const modalState = reactive({
    show: false,
    menu: "",
  });

  return html`
    <div
      id="ctnn-overlay"
      class="${() => (modalState.show ? "ctnn-overlay-show" : "ctnn-overlay-hide")}"
    ></div>
    <div
      id="ctnn-modal-container"
      class="${() => (modalState.show ? "ctnn-modal-show" : "ctnn-modal-hide")}"
    >
      <div class="ctnn-header ctnn-mb-1_5">
        <h1 class=" ctnn-text ctnn-text-md">${() => modalState.menu}</h1>
        <div class="ctnn-header-icon" @click="${() => (modalState.show = false)}">
          ${CloseIcon(35, 35, "#cecece")}
        </div>
      </div>
      ${NoteForm(createNote)}
    </div>
  `;
}
