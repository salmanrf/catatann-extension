import { html } from "@arrow-js/core";

export function UserContainer(user) {
  return html`
    <div id="ctnn-user-container">
      <div class="user-picture">
        <img src="${() => user.picture_url}" alt="user-profile-picture" />
      </div>
      <div class="user-name">${() => user.full_name}</div>
    </div>
  `;
}
