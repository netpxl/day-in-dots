import { NgModule } from '@angular/core';
import { SamaButton } from './button';

Promise.all([
  import('./button.scss'),
]).then((style) => {
  SamaButton.CUSTOM_STYLES = style[0]['default'];
  customElements.define('sama-button', SamaButton);
});

@NgModule({
  providers: [SamaButton],
})
export class SamaButtonModule { }
