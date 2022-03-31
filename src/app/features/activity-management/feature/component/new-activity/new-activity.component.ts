import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivityInterface } from 'src/app/core/interface/activity.interface';
import { v4 as uuidv4 } from 'uuid';

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
    newActivityAdded: EventEmitter<ActivityInterface> = new EventEmitter<ActivityInterface>();

  addNewActivity() {
    if (this.newActivityForm.invalid) {
      return;
    }

    const id = uuidv4();
    const { color, name } = this.newActivityForm.value;
    this.newActivityAdded.emit({
      id,
      color,
      name,
    });
    this.newActivityForm.reset();
  }
}
