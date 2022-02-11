import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrAddMassageSettingComponent } from './edit-or-add-massage-setting.component';

describe('EditOrAddMassageSettingComponent', () => {
  let component: EditOrAddMassageSettingComponent;
  let fixture: ComponentFixture<EditOrAddMassageSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOrAddMassageSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrAddMassageSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
