import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterDialogComponent } from './counter-dialog.component';

describe('CounterDialogComponent', () => {
  let component: CounterDialogComponent;
  let fixture: ComponentFixture<CounterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
