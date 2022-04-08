import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { selectStateActivities } from '@activity-management/data-access/store/activity-management.selectors';
import {
 createActivity, deleteActivity, setCurrentlySelectedActivity, updateActivity 
} from '@activity-management/data-access/store/activity-managment.actions';
import { ActivityInterface } from '@core/interface/activity.interface';
import { MockComponent } from 'ng-mocks';
import { ActivityManagmentComponent } from './activity-managment.component';
import { SingleActivityComponent } from '../single-activity/single-activity.component';
import { NewActivityComponent } from '../new-activity/new-activity.component';

describe('ActivityManagmentComponent', () => {
  let component: ActivityManagmentComponent;
  let fixture: ComponentFixture<ActivityManagmentComponent>;
  let store: MockStore;
  const selectedActivitySubject = new Subject<ActivityInterface | undefined>();

  const mockActivity = { id: '6553535' } as ActivityInterface;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
      ],
      declarations: [
        ActivityManagmentComponent,
        MockComponent(SingleActivityComponent),
        MockComponent(NewActivityComponent),
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityManagmentComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;

    component.currentlySelectedActivity$ = selectedActivitySubject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should listen to store changes and update activity', async () => {
    component.activities = [];
    store.overrideSelector(
      selectStateActivities,
      [{ color: 'red' } as ActivityInterface, { color: 'red' } as ActivityInterface],
    );
    component.ngOnInit();
    store.resetSelectors();
    expect(component.activities.length).toBe(2);
  });

  it('should send new activity to storage', () => {
    const currentlySelectedSpy = spyOn(store, 'dispatch').and.callFake(() => {});
    component.onNewActivityAdded(mockActivity);
    expect(currentlySelectedSpy).toHaveBeenCalledOnceWith(createActivity({ activity: mockActivity }));
  });

  it('should send deleted activity to storage', () => {
    selectedActivitySubject.next(mockActivity);
    const deletedActivity = { ...mockActivity, id: '12345' };
    const deleteSpy = spyOn(store, 'dispatch').and.returnValue();

    component.onDeleteActivity(deletedActivity);
    expect(deleteSpy).toHaveBeenCalledOnceWith(deleteActivity({ activity: deletedActivity }));
  });

  it('should send updated activity to storage', () => {
    selectedActivitySubject.next(mockActivity);
    const editedActivity = { ...mockActivity, id: '12345' };
    const deleteSpy = spyOn(store, 'dispatch').and.returnValue();

    component.onUpdateActivity(editedActivity);
    expect(deleteSpy).toHaveBeenCalledOnceWith(updateActivity({ activity: editedActivity }));
  });

  it('should send selected activity to storage', () => {
    selectedActivitySubject.next(mockActivity);
    const newActivity = { ...mockActivity, id: '12345' };
    const selectionDispatchSoy = spyOn(store, 'dispatch').and.returnValue();

    component.setAsSelectedActivity(newActivity);
    expect(selectionDispatchSoy).toHaveBeenCalledOnceWith(setCurrentlySelectedActivity({ currentlySelectedActivity: newActivity }));
  });

  it('should send selected activity to storage', () => {
    selectedActivitySubject.next(mockActivity);
    const newActivity = undefined;
    const selectionDispatchSoy = spyOn(store, 'dispatch').and.returnValue();

    component.setAsSelectedActivity(newActivity);
    expect(selectionDispatchSoy).toHaveBeenCalledOnceWith(setCurrentlySelectedActivity({ currentlySelectedActivity: newActivity }));
  });
});
