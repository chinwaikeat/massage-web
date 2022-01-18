import { Component, OnInit, Input, Optional } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  FormArray,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//import { DataCommunicationService } from "../../../../services/data-com/data-communication.service";
import { Subscription } from 'rxjs';
import { ApiService } from '../../../services/apiService/api-service.service';
import { SpinnerService } from '../../../services/spinnerService/spinner.service';
import { ToastService } from '../../../services/toastService/toast.service';
import { StorageService } from '../../../services/storageService/storage.service';
import { passValidator } from '../../../utils/passwordValidators';
import { CounterDialogComponent } from '../counter-dialog/counter-dialog.component';
import { NbDialogService } from '@nebular/theme';
import ConstructureLineBar from '../../../utils/lineBar';
import * as Highcharts from 'highcharts';
import { Options, SeriesLineOptions } from 'highcharts';
import { ConfirmationModalComponent } from '../../../@theme/components/modal/confirmation-modal/confirmation-modal.component';
import { v4 as uuidv4 } from 'uuid';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-massage-setting',
  templateUrl: './add-massage-setting.component.html',
  styleUrls: ['./add-massage-setting.component.scss'],
})
export class AddMassageSettingComponent implements OnInit {
  pageEvent: any;
  addMassageSettingForm!: FormGroup;
  submitted: boolean = false;
  isCarPlateEmpty: boolean = false;

  types: any;
  maxMinutes: number = 30;
  totalTimeLeft: number = 30;
  tempHighchartData: any = [];
  highcharts: any;
  subscribe: any

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRouter:ActivatedRoute,
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

    // this.oneLineBar = ConstructureLineBar([{ type: 'bar', data: [] }]);

    var options: Options = {
      chart: {
        type: 'bar',
        height: 200,
      },
      title: {
        text: 'Time allocate for massage',
      },
      subtitle: {
        text: 'Source: WorldClimate.com',
      },
      xAxis: {
        visible: false,
      },
      yAxis: {
        reversedStacks: false,
        min: 0,
        max: 30,
        title: {
          text: 'Total time consumption',
        },
        labels: {
          style: {
            fontSize: '8px',
          },
          formatter: function () {
            return this.axis.defaultLabelFormatter.call(this) + 'min(s)';
          },
        },
      },
      legend: {
        reversed: true,
        enabled: false,
      },
      tooltip: {
        formatter: function () {
          return this.point.series.userOptions.description;
        },
      },
      plotOptions: {
        bar: {
          // showInLegend: true,
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.point.y;
            },
            style: {
              fontWeight: 'bold',
            },
          },
          borderRadius: 5,
        },
        series: {
          stacking: 'normal',
        },
      },
      series: [],
    };
    //
    this.highcharts = Highcharts.chart('container', options);
    console.log('test ', this.highcharts);

    //this.oneLineBar.ref$.subscribe((res:any)=>{ res.hideLoading(); })
    // this.oneLineBar.ref$.subscribe((res:any)=>{ res.showLoading(); })

    // console.log('>>authenticate-username:41:',
    //     this.router.getCurrentNavigation()?.extras);

    this.subscribe =  this.activateRouter.queryParams.subscribe(params => {
      //this.userWithRole.user = JSON.parse(params["user"]);
      console.log("test**** " , params)

      this.pageEvent = params['pageEvent']
      
    });

   
    
  //  this.isEdit = false;
  }

  private randomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
  }

  goback() {
    this.router.navigate(['/dashboard/massageSetting']);
  }

  addOrEditMassageSetting(
    isEdit: boolean,
    massageSetting: any,
    massageSettingIndex: number
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
            massageSettingIndex: massageSettingIndex,
          },
        })
        .onClose.subscribe((value) => {
          //show loading
          this.highcharts.showLoading();
          if (value) {
            if (value.isEdit) {
              //update form array data
              this.massageSettingControls.controls[
                value.massageSettingIndex
              ].value.Duration = value.data.duration;
              this.massageSettingControls.controls[
                value.massageSettingIndex
              ].value.Strength = value.data.strength;

              //update temp data
              this.tempHighchartData[value.massageSettingIndex].description =
                'Duration: ' +
                value.data.duration +
                ' <br/>Strength: ' +
                value.data.strength;
              this.tempHighchartData[value.massageSettingIndex].data[0].y =
                value.data.duration;

              //calculate total massage time
              var totalMassageTime =
                this.massageSettingControls.controls.reduce(function (
                  totalSum,
                  currentValue
                ) {
                  return totalSum + currentValue.value.Duration;
                },
                0);

              //update used left
              this.totalTimeLeft = 30 - totalMassageTime;

              //update chart data
              this.highcharts.update({
                series: this.tempHighchartData,
              });
            } else {
              //generate random color
              var CustomColor = '#' + this.randomColor();
              //generate id for series
              var seriesId = uuidv4();

              //push form array to form
              this.massageSettingControls.push(
                this.newMassageSetting(
                  seriesId,
                  value.data.duration,
                  value.data.strength,
                  CustomColor
                )
              );

              //construct series object
              var seriesObj = {
                id: seriesId,
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
              };

              //add data to chart and temp
              this.tempHighchartData.push(seriesObj);
              this.highcharts.addSeries(seriesObj);

              //update total time left
              this.totalTimeLeft = this.totalTimeLeft - value.data.duration;
            }
          }
          //hide loading
          this.highcharts.hideLoading();
        });
    }
  }

  get massageSettingControls(): FormArray {
    return this.addMassageSettingForm.get('MassageSettings') as FormArray;
  }

  private newMassageSetting(
    seriesId: string,
    duration: number,
    strength: number,
    customColor: string
  ) {
    return this.formBuilder.group({
      SeriesId: seriesId,
      Duration: duration,
      Strength: strength,
      Color: customColor,
      IsDeleted: false,
    });
  }

  deleteSelectedMassageSetting(index: any, seriesId: number) {
    this.dialogService
      .open(ConfirmationModalComponent, {
        context: {
          title: 'Delete Confirmation',
          message: 'Are you sure to delete ?',
        },
      })
      .onClose.subscribe((value) => {
        if (value == 1) {
          //update used left
          this.totalTimeLeft =
            this.totalTimeLeft +
            this.massageSettingControls.controls[index].value.Duration;

          this.massageSettingControls.controls[index].value.IsDeleted = true;

          this.tempHighchartData = this.massageSettingControls.controls
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
            //remove specific data from highchart
          this.highcharts.get(seriesId).remove();
        }
      });
  }

 

  onSubmit() {
    // this.spinnerService.activate();
    // // this.submitted = true;
    // if (
    //   this.addMassageSettingForm.valid &&
    //   this.addMassageSettingForm.errors == null
    // ) {
    //   let data = this.addMassageSettingForm.value;
    //   console.log(data);
    //   this.apiService.post('api/user/add', data).subscribe(
    //     (res) => {
    //       this.spinnerService.deactivate();
    //       if (res.isError) {
    //         this.toastService.showToast('danger', 'Error', res.message);
    //       } else if (res.isTokenExpired) {
    //         this.toastService.showToast('danger', 'Error', res.message);
    //         this.storageService.clear();
    //         this.router.navigate(['/']);
    //       } else {
    //         this.toastService.showToast(
    //           'success',
    //           'Successful',
    //           'New User added successfully.'
    //         );
    //         this.router.navigate(['/dashboard/user']);
    //       }
    //     },
    //     (err) => {
    //       this.spinnerService.deactivate();
    //       if (!err.ok && err.status == 0) {
    //         this.toastService.showToast('danger', 'Error', err.message);
    //       } else {
    //         this.toastService.showToast(
    //           'danger',
    //           'Error',
    //           err.error?.message ?? 'Error connecting to server!'
    //         );
    //       }
    //     }
    //   );
    // } else {
    //   console.log(this.addMassageSettingForm);
    //   this.spinnerService.deactivate();
    // }
  }

  get form() {
    return this.addMassageSettingForm.controls;
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
