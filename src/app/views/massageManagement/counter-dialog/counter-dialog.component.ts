import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NumberInput } from '@angular/cdk/coercion';

@Component({
  selector: 'app-counter-dialog',
  templateUrl: './counter-dialog.component.html',
  styleUrls: ['./counter-dialog.component.scss'],
})
export class CounterDialogComponent implements OnInit {
  @Input() totalTimeLeft?: number;
  @Input() isEdit?: boolean;
  @Input() massageSetting: any;
  @Input() massageSettingIndex?: number;
  counter = 0;
  value: number = 1;
  settingForm!: FormGroup;

  durationOptions: Options = {
    floor: 1,
    ceil: 0,
    step: 1,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + ' Min(s)';
        default:
          return value.toString();
      }
    },
  };
  strengthLevelOptions: Options = {
    floor: 1,
    ceil: 100,
    step: 1,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + ' Level';
        default:
          return value.toString();
      }
    },
  };

  constructor(
    protected ref: NbDialogRef<CounterDialogComponent>,
    private formBuilder: FormBuilder
  ) {
    this.settingForm = this.formBuilder.group({
      duration: [1, Validators.required],
      strength: [1, Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('test ', this.settingForm);
    console.log('test ', this.totalTimeLeft);

    this.initializeData();
  }

  initializeData() {
    this.durationOptions.ceil = this.isEdit
      ? this.totalTimeLeft + this.massageSetting.Duration
      : this.totalTimeLeft;

    if (this.massageSetting != null) {
      this.settingForm.patchValue({
        duration: this.massageSetting.Duration,
        strength: this.massageSetting.Strength,
      });
    }
  }

  close(isClose: boolean) {
    if (isClose) {
      this.ref.close();
    } else {
      this.ref.close({
        data: this.settingForm.value,
        isEdit: this.isEdit,
        massageSettingIndex: this.massageSettingIndex,
      });
    }
  }
}
