import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from "@nebular/theme";
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-counter-dialog',
  templateUrl: './counter-dialog.component.html',
  styleUrls: ['./counter-dialog.component.scss']
})
export class CounterDialogComponent implements OnInit {
  title = 'Counter';
  counter = 0;
  value: number = 1;
  settingForm!: FormGroup;
  //sliderControl: FormControl = new FormControl(1);
  // sliderForm: FormGroup = new FormGroup({
  //   strengthLevelSliderControl: new FormControl(1),
  //   timeSliderContro: new FormControl(1)
  // });
  durationOptions: Options = {
    floor: 1,
    ceil: 30,
    step:1,
    translate: (value: number, label: LabelType ): string => {
      switch (label) {
        case LabelType.Low:
          return  value + ' Min(s)';    
        default:
          return  value.toString();
      }
    }
  };
  strengthLevelOptions: Options = {
    floor: 1,
    ceil: 100,
    step:1,
    translate: (value: number, label: LabelType ): string => {
      switch (label) {
        case LabelType.Low:
          return  value + ' Level';    
        default:
          return  value.toString();
      }
    }
  };
  
  constructor(
    protected ref: NbDialogRef<CounterDialogComponent>,
    private formBuilder: FormBuilder,
  ) {
    this.settingForm = this.formBuilder.group(
      {
        duration: [1, Validators.required],
        strength: [1, Validators.required],
      },
    );
   }

  ngOnInit(): void {
    console.log("test ", this.settingForm)
  }


  close(value: any){
    this.ref.close(this.settingForm.value);
  }

  onSubmit() {

    
  }

  count(value:string){
    switch(value){
      case '+':
        this.counter++;
        break;
      case '-':
        this.counter--;
        break;
      default:
        this.counter = 0;
        break;
    }
  }

}
