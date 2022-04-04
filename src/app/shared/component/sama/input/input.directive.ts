import {
  Directive, ElementRef, HostListener, Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'sama-input',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: SamaInputDirective, multi: true }],
})
export class SamaInputDirective implements ControlValueAccessor {
  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.onChange = (value: string) => {
      this.writeValue(value);
    };
  }

  onChange: (value: string) => void;

  writeValue(value: string) {
    this.renderer.setProperty(this.element.nativeElement, 'value', value);
  }

  @HostListener('val-change', ['$event.detail'])
  _handleValueChange(value: string) {
    this.onChange(value);
  }

  registerOnChange(fn: (value: string) => void) {
    this.onChange = (value) => {
      fn(value);
    };
  }

  registerOnTouched() {}
}
