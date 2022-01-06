import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMassageSettingComponent } from './add-massage-setting.component';

describe('AddMassageSettingComponent', () => {
  let component: AddMassageSettingComponent;
  let fixture: ComponentFixture<AddMassageSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMassageSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMassageSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
