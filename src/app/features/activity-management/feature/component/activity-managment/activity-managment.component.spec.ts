import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { of, ReplaySubject } from 'rxjs';
import { ActivityInterface } from 'src/app/core/interface/activity.interface';
import { StoreService } from 'src/app/shared/services/store.service.abstract';

import { ActivityManagmentComponent } from './activity-managment.component';

describe('ActivityManagmentComponent', () => {
  let component: ActivityManagmentComponent;
  let fixture: ComponentFixture<ActivityManagmentComponent>;
  let storeService: StoreService;
  const mockActivity = { id: '6553535' } as ActivityInterface;
  const getActivityReturnMock: ReplaySubject<ActivityInterface[]> = new ReplaySubject();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MockProvider(StoreService),
      ],
      declarations: [ActivityManagmentComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityManagmentComponent);
    storeService = TestBed.inject(StoreService);
    component = fixture.componentInstance;
    spyOn(storeService, 'getActivities').and.returnValue(getActivityReturnMock.asObservable());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should listen to store changes and update activity', async () => {
    component.activities = [];
    getActivityReturnMock.next([{ color: 'red' } as ActivityInterface, { color: 'red' } as ActivityInterface]);
    expect(component.activities.length).toBe(2);
  });

  it('should send new activity to storage and set it as currently selected', () => {
    const saveSpy = spyOn(storeService, 'saveActivity').and.returnValue(of([mockActivity]));
    const currentlySelectedSpy = spyOn(storeService, 'setCurrentlySelectedActivity');
    component.onNewActivityAdded(mockActivity);
    expect(saveSpy).toHaveBeenCalledOnceWith(mockActivity);
    expect(currentlySelectedSpy).toHaveBeenCalledOnceWith(mockActivity);
  });

  it('should send deleted activity to storage and update list', () => {
    const deletedActivity = { ...mockActivity, id: '12345' };
    component.activities = [mockActivity, deletedActivity];
    storeService.currentlySelectedActivitiy = mockActivity;
    const deleteSpy = spyOn(storeService, 'deleteActivity').and.returnValue(of([mockActivity]));
    const currentlySelectedSpy = spyOn(storeService, 'setCurrentlySelectedActivity');

    component.onDeleteActivity(deletedActivity);
    expect(deleteSpy).toHaveBeenCalledOnceWith(deletedActivity);
    expect(currentlySelectedSpy).not.toHaveBeenCalled();
    expect(component.activities.length).toEqual(1);
  });

  it('should send deleted activity to storage and update list, unselect deleted if selected', () => {
    const deletedActivity = { ...mockActivity, id: '12345' };
    component.activities = [mockActivity, deletedActivity];
    storeService.currentlySelectedActivitiy = deletedActivity;
    const deleteSpy = spyOn(storeService, 'deleteActivity').and.returnValue(of([mockActivity]));
    const currentlySelectedSpy = spyOn(storeService, 'setCurrentlySelectedActivity');

    component.onDeleteActivity(deletedActivity);
    expect(deleteSpy).toHaveBeenCalledOnceWith(deletedActivity);
    expect(currentlySelectedSpy).toHaveBeenCalledOnceWith(undefined);
    expect(component.activities.length).toEqual(1);
  });

  it('should send updated activity to storage and update list, set as currently active', () => {
    const editedActivity = { ...mockActivity, id: '12345' };
    component.activities = [mockActivity, editedActivity];
    storeService.currentlySelectedActivitiy = mockActivity;
    const deleteSpy = spyOn(storeService, 'updateActivity').and.returnValue(of([mockActivity, editedActivity]));
    const currentlySelectedSpy = spyOn(storeService, 'setCurrentlySelectedActivity');

    component.onUpdateActivity(editedActivity);
    expect(deleteSpy).toHaveBeenCalledOnceWith(editedActivity);
    expect(currentlySelectedSpy).toHaveBeenCalledOnceWith(editedActivity);
    expect(component.activities.length).toEqual(2);
  });
});
