import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrEditMassageSettingComponent } from './view-or-edit-massage-setting.component';

describe('ViewOrEditMassageSettingComponent', () => {
  let component: ViewOrEditMassageSettingComponent;
  let fixture: ComponentFixture<ViewOrEditMassageSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOrEditMassageSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrEditMassageSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
