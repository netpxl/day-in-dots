import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SamaInputDirective } from './component/sama/input/input.directive';
import { DotComponent } from './component/dot/dot.component';
import { SamaButtonModule } from './component/sama/button/button.module';
import { SamaInputModule } from './component/sama/input/input.module';

@NgModule({
  declarations: [DotComponent, SamaInputDirective],
  imports: [
    SamaInputModule,
    SamaButtonModule,
  ],
  exports: [
    SamaInputDirective,
    DotComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
