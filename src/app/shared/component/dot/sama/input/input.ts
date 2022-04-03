import {
  LitElement, html, css, unsafeCSS,
} from 'lit-element';

export class SamaInput extends LitElement {
  value = '';

  outline = false;

  disabled = false;

  label = '';

  type = 'text';

  static STYLES = '';

  static override get properties() {
    return {
      type: { type: String },
      label: { type: String },
      value: { type: String },
      disabled: { type: Boolean },
      outline: { type: Boolean },
    };
  }

  static override get styles() {
    return css`${unsafeCSS(this.STYLES)}`;
  }

  override render() {
    return html`
            <input
                class="${this.outline ? 'outline' : ''}"
                type="${this.type}"
                placeholder=" "
                .value=${this.value}
                ?disabled="${this.disabled}"
            />
            <label>${this.label}</label>
        `;
  }
}
