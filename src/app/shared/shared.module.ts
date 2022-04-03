import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DotComponent } from './component/dot/dot.component';
import { SamaButtonModule } from './component/dot/sama/button/button.module';
import { SamaInputModule } from './component/dot/sama/input/input.module';

@NgModule({
  declarations: [DotComponent],
  imports: [
    SamaInputModule,
    SamaButtonModule,
  ],
  exports: [
    DotComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
