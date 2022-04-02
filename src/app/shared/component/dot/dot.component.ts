import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'did-dot',
  templateUrl: './dot.component.html',
  styleUrls: ['./dot.component.scss'],
})
export class DotComponent {
  @HostBinding('style.--__bg-color') selectedColor?: string = undefined;

  @Input() set color(value: string) {
    if (!value.startsWith('#')) {
      this.selectedColor = undefined;
      return;
    }
    this.selectedColor = value;
  }
}
