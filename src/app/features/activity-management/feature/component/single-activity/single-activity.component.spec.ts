import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleActivityComponent } from './single-activity.component';

describe('SingleActivityComponent', () => {
  let component: SingleActivityComponent;
  let fixture: ComponentFixture<SingleActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SingleActivityComponent,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the config correctly when undefined', () => {
    const formResetSpy = spyOn(component.activityFormGroup, 'patchValue');
    component.config = undefined;
    expect(component.config).toEqual(undefined);
    expect(formResetSpy).toHaveBeenCalledOnceWith({ color: '', name: '' });
  });

  it('should set the config correctly when new config', () => {
    const formResetSpy = spyOn(component.activityFormGroup, 'patchValue');
    component.config = { color: 'red', id: 'hmm', name: 'test' };
    expect(component.config).toEqual({ color: 'red', id: 'hmm', name: 'test' });
    expect(formResetSpy).toHaveBeenCalledOnceWith({ color: 'red', name: 'test' });
  });

  it('should set editMode to false and reinit config in resetEditMode', () => {
    const configSetSpy = spyOnProperty(component, 'config', 'set').and.callFake(() => {});
    component.editMode = true;
    component.resetEditMode();
    expect(configSetSpy).toHaveBeenCalledTimes(1);
    expect(component.editMode).toBe(false);
  });

  it('should emit activity and set editmode to false on save', () => {
    const updateEmit = spyOn(component.updateActivity, 'emit').and.callFake(() => {});
    component.editMode = true;
    component.saveActivity();
    expect(updateEmit).toHaveBeenCalledTimes(1);
    expect(component.editMode).toBe(false);
  });
});
