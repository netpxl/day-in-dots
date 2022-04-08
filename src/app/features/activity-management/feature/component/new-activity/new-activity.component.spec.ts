import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { NewActivityComponent } from './new-activity.component';

describe('NewActivityComponent', () => {
  let component: NewActivityComponent;
  let fixture: ComponentFixture<NewActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NewActivityComponent,
      ],
      imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit new activity if form invalid', () => {
    const emitSpy = spyOn(component.newActivityAdded, 'emit');
    component.addNewActivity();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should emit new activity if form valid', () => {
    const emitSpy = spyOn(component.newActivityAdded, 'emit');
    const restFormSpy = spyOn(component.newActivityForm, 'reset');
    component.newActivityForm.setValue({ color: '123', name: '123' });
    component.addNewActivity();
    expect(emitSpy).toHaveBeenCalled();
    expect(restFormSpy).toHaveBeenCalled();
  });
});
