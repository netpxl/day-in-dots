import { NgModule } from '@angular/core';
import { SamaButton } from './button';

Promise.all([
  import('./button.scss'),
]).then((style) => {
  SamaButton.STYLES = style[0]['default'];
  customElements.define('sama-button', SamaButton);
});

@NgModule({
  providers: [SamaButton],
})
export class SamaButtonModule { }
