import { html } from "@arrow-js/core";

import "./loading.scss";

export function LoadingIcon({ width, height, color }) {
  return html`
    <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg
      width="${width ?? 50}px"
      height="${height ?? 50}px"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="${color ?? "black"}"
      class="ctnn-loading"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"
      />
    </svg>
  `;
}
