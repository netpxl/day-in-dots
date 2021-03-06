import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivityInterface } from '@core/interface/activity.interface';

@Component({
  selector: 'did-single-activity',
  templateUrl: './single-activity.component.html',
  styleUrls: ['./single-activity.component.scss'],
})
export class SingleActivityComponent {
  _config?: ActivityInterface;

  editMode = false;

  activityFormGroup = new FormGroup({
    color: new FormControl(''),
    name: new FormControl(''),
  });

  @Output()
    deleteActivity: EventEmitter<ActivityInterface> = new EventEmitter<ActivityInterface>();

  @Output()
    updateActivity: EventEmitter<ActivityInterface> = new EventEmitter<ActivityInterface>();

  @Input()
  get config(): ActivityInterface | undefined {
    return this._config;
  }

  set config(data: ActivityInterface | undefined) {
    this.activityFormGroup.patchValue({
      color: data?.color || '',
      name: data?.name || '',
    });
    this._config = data;
  }

  resetEditMode() {
    this.editMode = false;
    this.config = this._config;
  }

  saveActivity() {
    this.editMode = false;
    this.updateActivity.emit({ ...this.config, ...this.activityFormGroup.value });
  }
}
