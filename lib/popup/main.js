import "../styles/popup.scss";
import { MainContainer } from "./components/MainContainer";

window.addEventListener("load", () => {
  if (document.querySelector("#ctnn-popup-container")) {
    return;
  }

  MainContainer()(document.body);
});
