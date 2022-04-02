import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotComponent } from './dot.component';

describe('DotComponent', () => {
  let component: DotComponent;
  let fixture: ComponentFixture<DotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DotComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set valid color', () => {
    component.color = '#12345';
    expect(component.selectedColor).toBe('#12345');
  });

  it('should use fallback if passed in color is invalid', () => {
    component.color = 'test';
    expect(component.selectedColor).toBe((component as any)._defaultColor);
  });
});
