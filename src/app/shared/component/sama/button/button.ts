import {
  html, css, unsafeCSS,
} from 'lit-element';
import { LionButton } from '@lion/button';

export class SamaButton extends LionButton {
  static CUSTOM_STYLES = '';

  label = '';

  static override get properties() {
    return {
      ...super.properties,
      label: { type: String },
    };
  }

  static override get styles() {
    return [
      css`${unsafeCSS(this.CUSTOM_STYLES)}`,
    ];
  }

  override render() {
    return html`
            <button @click="${this.clickHandler}">${this.label}</button>
        `;
  }

  clickHandler() {
    this.dispatchEvent(
      new Event('click'),
    );
  }
}
