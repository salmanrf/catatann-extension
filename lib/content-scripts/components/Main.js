import { html, reactive } from "@arrow-js/core";
import { NoteForm } from "./NoteForm";
import { MODAL_MENUS } from "../helpers/modal.helper";
import { CloseIcon } from "../../icons/close";
import { NotesList } from "./NoteList";

function createNote(values) {}

export function MainContainer() {
  const modalState = reactive({
    show: false,
    menu: MODAL_MENUS.NOTES_LIST,
  });

  return html`
    <div
      id="ctnn-overlay"
      class="${() => (modalState.show ? "ctnn-overlay-show" : "ctnn-overlay-hide")}"
    ></div>
    <div
      id="ctnn-container"
      class="${() => (modalState.show ? "ctnn-modal-show" : "ctnn-modal-hide")}"
    >
      <div class="ctnn-header ctnn-mb-1_5">
        <h1 class=" ctnn-text-md">${() => modalState.menu}</h1>
        <div class="ctnn-header-icon" @click="${() => (modalState.show = false)}">
          ${CloseIcon(35, 35, "#cecece")}
        </div>
      </div>
      <!-- Dynamic Menu -->
      <!-- CREATE NOTE -->
      ${() => modalState.menu === MODAL_MENUS.CREATE_NOTE && NoteForm(createNote)}
      <!-- NOTES LIST -->
      ${() => modalState.menu === MODAL_MENUS.NOTES_LIST && NotesList()}
      <!-- Dynamic Menu -->
    </div>
  `;
}
