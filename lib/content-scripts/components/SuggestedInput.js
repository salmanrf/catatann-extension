import { html, reactive, watch } from "@arrow-js/core";

export function SuggestedInput(props) {
  const { name, className, placeholder, loadOptions, onSelect } = props;

  const inputState = reactive({
    keyword: "",
    options: [],
    current_timeout: -1,
    loading: false,
    selected: null,
    show_suggestions: false,
  });

  inputState.$on("keyword", () => {
    generateOptions(inputState.keyword);
  });

  function generateOptions(value, debounce_timeout = 500) {
    clearTimeout(inputState.current_timeout);

    if (value == "") {
      return onOptionLoad([]);
    }

    inputState.current_timeout = setTimeout(() => {
      if (value != "") {
        loadOptions(value, onOptionLoad);
      }
    }, debounce_timeout);
  }

  function onOptionLoad(options) {
    inputState.options = options;
    inputState.loading = false;
    inputState.show_suggestions = true;
  }

  // ? Auto focus after the input element is rendered
  setTimeout(() => {
    const input = document.querySelector(".ctnn-suggested-input input");

    if (input) {
      input.focus();

      input.addEventListener("active", () => {
        inputState.show_suggestions = true;

        console.log("Input active");
      });
    }

    document.body.addEventListener("click", () => {
      inputState.show_suggestions = false;
    });
  }, 0);

  function onOptionSelected(selected) {
    if (onSelect instanceof Function) {
      onSelect({ ...selected });
    }

    inputState.selected = { ...selected };
    inputState.show_suggestions = false;
  }

  return html`
    <div class="ctnn-suggested-input">
      <input
        name="${name}"
        class=" ${className}"
        placeholder="${placeholder}"
        value="${() => inputState.keyword}"
        @input="${(e) => (inputState.keyword = e.target.value)}"
      />
      ${() =>
        inputState.options.length > 0
          ? html`
              <div class="${() => (inputState.show_suggestions ? "suggestions-list" : "hide")}">
                ${inputState.options.map(({ label, value, ...option }) =>
                  html`<div
                    class="suggestion-item"
                    @click="${() => onOptionSelected({ label, value, ...option })}"
                  >
                    ${label}
                  </div>`.key(value)
                )}
              </div>
            `
          : null}
    </div>
  `;
}
