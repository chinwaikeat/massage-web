import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassageSettingListComponent } from './massage-setting-list.component';

describe('MassageSettingListComponent', () => {
  let component: MassageSettingListComponent;
  let fixture: ComponentFixture<MassageSettingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassageSettingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MassageSettingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
