import {
  LitElement, html, css, unsafeCSS,
} from 'lit-element';

export class SamaButton extends LitElement {
  static STYLES = '';

  disabled = false;

  label = '';

  static override get properties() {
    return {
      label: { type: String },
      disabled: { type: Boolean },
    };
  }

  static override get styles() {
    return css`${unsafeCSS(this.STYLES)}`;
  }

  override render() {
    return html`
            <button @click="${this.clickHandler}">${this.label}</button>
        `;
  }

  clickHandler() {
    this.dispatchEvent(
      new CustomEvent('button-clicked'),
    );
  }
}
