import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrViewUserComponent } from './edit-or-view-user.component';

describe('EditOrViewUserComponent', () => {
  let component: EditOrViewUserComponent;
  let fixture: ComponentFixture<EditOrViewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOrViewUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
