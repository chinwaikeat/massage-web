import { Component, OnInit, Input, Optional } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
//import { DataCommunicationService } from "../../../../services/data-com/data-communication.service";
import { Subscription } from 'rxjs';
import { ApiService } from '../../../services/apiService/api-service.service';
import { SpinnerService } from '../../../services/spinnerService/spinner.service';
import { ToastService } from '../../../services/toastService/toast.service';
import { StorageService } from '../../../services/storageService/storage.service';
import { passValidator } from '../../../utils/passwordValidators';
import { Chart } from 'angular-highcharts';
import { CounterDialogComponent } from '../counter-dialog/counter-dialog.component';
import { NbDialogService } from '@nebular/theme';
import ConstructureLineBar from '../../../utils/lineBar';

@Component({
  selector: 'app-add-massage-setting',
  templateUrl: './add-massage-setting.component.html',
  styleUrls: ['./add-massage-setting.component.scss'],
})
export class AddMassageSettingComponent implements OnInit {
  addMassageSettingForm!: FormGroup;
  submitted: boolean = false;
  isCarPlateEmpty: boolean = false;
  oneLineBar: any;
  types: any;
  maxMinutes: number = 30;
  totalTimeLeft: number = 30;
  exampleData: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastService: ToastService,
    private spinnerService: SpinnerService,
    private storageService: StorageService,
    @Optional() private dialogService: NbDialogService
  ) {
    this.addMassageSettingForm = this.formBuilder.group({
      Type: ['', Validators.required],
      MassageSettings: this.formBuilder.array([], Validators.required),
      IsActive: ['true', Validators.required],
    });
  }

  ngOnInit(): void {
    this.types = [
      { value: 'DOCTOR_RECOMMEND', name: 'DOCTOR RECOMMEND' },
      { value: 'DEFAULT_SETTING', name: 'DEFAULT SETTING' },
      { value: 'USER_CUSTOMIZE', name: 'USER CUSTOMIZE' },
    ];

    //  this.exampleData =[
    //   {
    //     description: 'Duration: 5 <br/>Strength: 40',
    //     color: '#' + this.randomColor(),
    //     data: [{
    //       y: 5,
    //   }],
    //   },
    //   {
    //     description: 'Duration: 2 <br/>Strength: 40',
    //     color: '#' + this.randomColor(),
    //     data: [{
    //       y: 2,
    //   }],
    //   },
    //   {
    //     description: 'Duration: 3 <br/>Strength: 40',
    //     color: '#' + this.randomColor(),
    //     data: [{
    //       y: 3,

    //   }],
    //   },
    //   {
    //     description: 'Duration: 4 <br/>Strength: 40',
    //     color: '#' + this.randomColor(),
    //     data: [{
    //       y: 4,
    //   }],
    //   },
    //   {
    //     description: 'Duration: 1 <br/>Strength: 40',
    //     color: '#' + this.randomColor(),
    //     data: [{
    //       y: 1,
    //   }],
    //   },
    //   {
    //     description: 'Duration: 6 <br/>Strength: 40',
    //     color: '#' + this.randomColor(),
    //     data: [{
    //       y: 6,

    //   }],
    //   },
    //   {
    //     description: 'Duration: 6 <br/>Strength: 40',
    //     color: '#' + this.randomColor(),
    //     data: [{
    //       y: 4,
    //   }],
    //   },
    //   {
    //     description: 'Duration: 5 <br/>Strength: 40',
    //     color: '#' + this.randomColor(),
    //     data: [{
    //       y: 5,
    //   }],
    //   },
    // ];

    this.oneLineBar = ConstructureLineBar([{ type: 'bar', data: [] }]);

    //this.oneLineBar.ref$.subscribe((res:any)=>{ res.hideLoading(); })
    // this.oneLineBar.ref$.subscribe((res:any)=>{ res.showLoading(); })
  }

  randomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
  }

  goback() {
    this.router.navigate(['/dashboard/massageSetting']);
  }

  addOrEditMassageSetting(
    isEdit: boolean,
    massageSetting: any,
    massageSettingId: number
  ) {
    if (this.totalTimeLeft <= 0 && !isEdit) {
      this.toastService.showToast('danger', 'Error', 'Reach maximum time');
    } else {
      this.dialogService
        .open(CounterDialogComponent, {
          context: {
            totalTimeLeft: this.totalTimeLeft,
            isEdit: isEdit,
            massageSetting: massageSetting,
            massageSettingId: massageSettingId,
          },
        })
        .onClose.subscribe((value) => {
          console.log('return value ', value);
          if (value) {
            if (value.data.isEdit) {
              this.massageSettingControls.controls[
                value.data.massageSettingId
              ].value.Duration = value.data.duration;
              this.massageSettingControls.controls[
                value.data.massageSettingId
              ].value.Strength = value.data.strength;

              var sum = this.massageSettingControls.controls.reduce(function (
                sum,
                currentValue
              ) {
                return sum + currentValue.value.Duration;
              });

              //update used time
              this.totalTimeLeft = 30 - Number(sum);
            } else {
              var CustomColor = '#' + this.randomColor();

              this.massageSettingControls.push(
                this.newMassageSetting(
                  value.data.duration,
                  value.data.strength,
                  CustomColor
                )
              );
              this.exampleData.push({
                description:
                  'Duration: ' +
                  value.data.duration +
                  ' <br/>Strength: ' +
                  value.data.strength,
                color: CustomColor,
                data: [
                  {
                    y: value.data.duration,
                  },
                ],
              });
              console.log('test ', this.oneLineBar);

              //  this.oneLineBar.options.series.setData(this.exampleData);
              //  this.oneLineBar.init(this.exampleData);
              //this.oneLineBar.destroy()

              this.oneLineBar.addSeries({
                description:
                  'Duration: ' +
                  value.data.duration +
                  ' <br/>Strength: ' +
                  value.data.strength,
                color: CustomColor,
                data: [
                  {
                    y: value.data.duration,
                  },
                ],
              });
            }

            //update used time
            this.totalTimeLeft = this.totalTimeLeft - value.data.duration;
          }
        });
    }
  }

  get massageSettingControls(): FormArray {
    return this.addMassageSettingForm.get('MassageSettings') as FormArray;
  }

  private newMassageSetting(
    duration: number,
    strength: number,
    customColor: string
  ) {
    return this.formBuilder.group({
      Duration: duration,
      Strength: strength,
      Color: customColor,
      IsDeleted: false,
    });
  }

  deleteSelectedMassageSetting(id: any) {
    //this.carPlateControls.removeAt(id);
    //update used time
    this.totalTimeLeft =
      this.totalTimeLeft +
      this.massageSettingControls.controls[id].value.Duration;

    this.massageSettingControls.controls[id].value.IsDeleted = true;

    this.exampleData = this.massageSettingControls.controls
      .filter((form) => {
        return form.value.IsDeleted == false;
      })
      .map((item) => {
        return {
          description:
            'Duration: ' +
            item.value.Duration +
            ' <br/>Strength: ' +
            item.value.Strength,
          color: item.value.Color,
          data: [
            {
              y: item.value.Duration,
            },
          ],
        };
      });

    this.oneLineBar = ConstructureLineBar(this.exampleData);
  }

  addCarPlateItem() {
    this.massageSettingControls.push(this.newMassageSetting(0, 0, ''));
  }

  private checkCarPlateData() {
    var test = this.massageSettingControls.controls.find(
      (item) => item.value.IsDeleted == false
    );
    if (test != null) {
      this.isCarPlateEmpty = false;
    } else {
      this.isCarPlateEmpty = true;
    }
  }

  onSubmit() {
    this.spinnerService.activate();
    // this.submitted = true;
    if (
      this.addMassageSettingForm.valid &&
      this.addMassageSettingForm.errors == null
    ) {
      let data = this.addMassageSettingForm.value;
      console.log(data);
      this.apiService.post('api/user/add', data).subscribe(
        (res) => {
          this.spinnerService.deactivate();
          if (res.isError) {
            this.toastService.showToast('danger', 'Error', res.message);
          } else if (res.isTokenExpired) {
            this.toastService.showToast('danger', 'Error', res.message);
            this.storageService.clear();
            this.router.navigate(['/']);
          } else {
            this.toastService.showToast(
              'success',
              'Successful',
              'New User added successfully.'
            );
            this.router.navigate(['/dashboard/user']);
          }
        },
        (err) => {
          this.spinnerService.deactivate();
          if (!err.ok && err.status == 0) {
            this.toastService.showToast('danger', 'Error', err.message);
          } else {
            this.toastService.showToast(
              'danger',
              'Error',
              err.error?.message ?? 'Error connecting to server!'
            );
          }
        }
      );
    } else {
      console.log(this.addMassageSettingForm);
      this.spinnerService.deactivate();
    }
  }

  get form() {
    return this.addMassageSettingForm.controls;
  }
}
