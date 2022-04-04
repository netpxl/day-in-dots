import {
  html, PropertyValues, unsafeCSS,
} from 'lit-element';
import { css } from '@lion/core';
import { LionInput } from '@lion/input';

export class SamaInput extends LionInput {
  outline = false;

  static CUSTOM_STYLES = '';

  static override get properties() {
    return {
      type: { type: String },
      label: { type: String },
      value: { type: String, hasChanged: () => true },
      disabled: { type: Boolean },
      outline: { type: Boolean },
    };
  }

  override updated(changedProperties: PropertyValues) {
    super.update(changedProperties);
    if (changedProperties.has('value') && changedProperties.get('value') === undefined) {
      this.value = '';
    }
  }

  static override get styles() {
    return [
      ...super.styles,
      css`${unsafeCSS(this.CUSTOM_STYLES)}`,
    ];
  }

  override render() {
    return html`
            <input
                @input=${this.inputHandler}
                class="${this.outline ? 'outline' : ''}"
                type="${this.type}"
                placeholder=" "
                .value=${this.value}
                ?disabled="${this.disabled}"
            />
            <label>${this.label}</label>
        `;
  }

  inputHandler(event: any) {
    this.dispatchEvent(
      new CustomEvent('val-change', {
        detail: event.composedPath()[0].value,
      }),
    );
  }
}
