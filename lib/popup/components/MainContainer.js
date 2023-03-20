import { html, reactive } from "@arrow-js/core";
import CtnnLogo from "../../assets/images/catatann-logo.png";
import { LoadingIcon } from "../../icons/loading";
import { createClientAppTab, startAuthFlow } from "../../utils/auth";
import { UserContainer } from "./UserContainer";

export function MainContainer() {
  const state = reactive({
    loading: false,
    user: null,
  });

  state.$on("user", () => console.log("user", state.user));

  async function initSession() {
    try {
      state.loading = true;

      const user = await startAuthFlow();

      console.log("user", user);

      if (user) {
        state.user = user;
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      state.loading = false;
    }
  }

  function redirectToClientApp() {
    createClientAppTab({ active: true });
  }

  setTimeout(async () => {
    initSession();
  }, 0);

  return html`
    <div id="ctnn-popup-container" class="container-fluid">
      <header id="ctnn-logo">
        <img src="${CtnnLogo}" src="logo" />
      </header>
      <main id="ctnn-main">
        ${() =>
          state.loading &&
          html`
            <div class="loading-placeholder">
              ${LoadingIcon({ width: 36, height: 36, color: "hsl(0, 0%, 70%)" })}
            </div>
          `}
        ${() =>
          !state.loading &&
          !Boolean(state.user) &&
          html`
            <div class="main-section-container">
              <button @click="${redirectToClientApp}" class="btn btn-dark">Login</button>
            </div>
          `}
        ${() => state.user && UserContainer(state.user)}
        ${() =>
          state.user &&
          html`<div class="main-section-container">
            <button @click="${redirectToClientApp}" class="btn btn-dark">Catatann Client</button>
          </div>`}
      </main>
    </div>
  `;
}
