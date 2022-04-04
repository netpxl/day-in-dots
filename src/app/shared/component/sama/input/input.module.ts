import { NgModule } from '@angular/core';
import { SamaInput } from './input';

Promise.all([
  import('./input.scss'),
]).then((style) => {
  SamaInput.CUSTOM_STYLES = style[0]['default'];
  customElements.define('sama-input', SamaInput);
});

@NgModule({
  providers: [SamaInput],
})
export class SamaInputModule { }
