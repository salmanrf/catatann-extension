import { html, reactive } from "@arrow-js/core";
import { NoteForm } from "./components/NoteForm";
import { MODAL_MENUS } from "./helpers/modal.helper";
import { CloseIcon } from "../icons/close";

import "../styles/content.css";

const modalState = reactive({
  show: false,
  menu: "",
});

modalState.menu = MODAL_MENUS.CREATE_NOTE;

function createNote(values) {
  console.log("SUBMITTED COYY");

  console.log("values", values);
}

const modalContainer = html` <div
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
  </div>`;

modalContainer(document.body);

const button = document.querySelector("#toggle-modal");

if (button) {
  button.addEventListener("click", () => {
    modalState.show = !modalState.show;
  });
}

setTimeout(() => {
  modalState.show = true;
}, 2000);
