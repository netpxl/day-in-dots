import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DotComponent } from './component/dot/dot.component';

@NgModule({
  declarations: [DotComponent],
  exports: [
    DotComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
