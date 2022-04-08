import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivityInterface } from '@core/interface/activity.interface';

@Component({
  selector: 'did-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.scss'],
})
export class NewActivityComponent {
  newActivityForm: FormGroup = new FormGroup({
    color: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });

  @Output()
    newActivityAdded: EventEmitter<Omit<ActivityInterface, 'id'>> = new EventEmitter<Omit<ActivityInterface, 'id'>>();

  addNewActivity() {
    if (this.newActivityForm.invalid) {
      return;
    }

    const { color, name } = this.newActivityForm.value;
    this.newActivityAdded.emit({
      color,
      name,
    });
    this.newActivityForm.reset();
  }
}
