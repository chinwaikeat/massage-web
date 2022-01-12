import { Component, OnInit, Input, Optional } from "@angular/core";
import { Validators, FormBuilder, FormGroup, ValidatorFn,FormArray } from "@angular/forms";
import { Router } from "@angular/router";
//import { DataCommunicationService } from "../../../../services/data-com/data-communication.service";
import { Subscription } from "rxjs";
import { ApiService } from "../../../services/apiService/api-service.service";
import { SpinnerService } from '../../../services/spinnerService/spinner.service';
import { ToastService } from '../../../services/toastService/toast.service';
import { StorageService } from '../../../services/storageService/storage.service';
import { passValidator } from '../../../utils/passwordValidators';
import {Chart } from 'angular-highcharts';
import { CounterDialogComponent} from '../counter-dialog/counter-dialog.component'
import { NbDialogService  } from '@nebular/theme';

@Component({
  selector: 'app-add-massage-setting',
  templateUrl: './add-massage-setting.component.html',
  styleUrls: ['./add-massage-setting.component.scss']
})
export class AddMassageSettingComponent implements OnInit {
  addMassageSettingForm!: FormGroup;
  submitted: boolean = false;
  isCarPlateEmpty: boolean = false;
  oneLineBar :any;
  types: any;
  maxMinutes: number = 30;
  exampleData:any = [];
  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastService: ToastService,
    private spinnerService: SpinnerService,
    private storageService: StorageService,
    @Optional() private dialogService: NbDialogService,) {
      this.addMassageSettingForm = this.formBuilder.group(
        {
          Type: ['', Validators.required],
          MassageSettings: this.formBuilder.array([], Validators.required),
          IsActive: ['true', Validators.required],
        },
       
      );
     }

  ngOnInit(): void {
    this.types = [
      {"value":"DOCTOR_RECOMMEND","name": "DOCTOR RECOMMEND"}, 
      {"value":"DEFAULT_SETTING","name": "DEFAULT SETTING"},
      {"value":"USER_CUSTOMIZE","name": "USER CUSTOMIZE"},
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


    this.oneLineBar = new Chart({
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
        min: 0,
        max: 30,
        title: {
          text: 'Total time consumption',
        },
        labels: {
          style: {
            fontSize: '8px'
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
          return  this.point.series.userOptions.description;
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
          borderRadius: 5
        },
        series: {
          stacking: 'normal',
        },
      },
      series:this.exampleData
      });

      //this.oneLineBar.ref$.subscribe((res:any)=>{ res.hideLoading(); })
     // this.oneLineBar.ref$.subscribe((res:any)=>{ res.showLoading(); })
  }

  randomColor() {
    return Math.floor(Math.random()*16777215).toString(16);
  }

  goback() {
    this.router.navigate(['/dashboard/massageSetting']);
  }

  addOrEditMassageSetting(){
    this.dialogService.open(CounterDialogComponent).onClose.subscribe(value => {
      console.log("return value " , value)
      var CustomColor = '#' + this.randomColor();
      this.massageSettingControls.push(this.newMassageSetting(value.duration, value.strength, CustomColor));
      this.exampleData.push(  {
        description: 'Duration: ' + value.duration +' <br/>Strength: ' + value.strength,
        color: CustomColor,
        data: [{ 
          y: value.duration,
      }],
      },)
        console.log("test " , this.oneLineBar)
      //this.oneLineBar.chart
    //  this.oneLineBar.options.series.setData(this.exampleData);
    this.oneLineBar = new Chart({
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
        min: 0,
        max: 30,
        title: {
          text: 'Total time consumption',
        },
        labels: {
          style: {
            fontSize: '8px'
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
          return  this.point.series.userOptions.description;
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
          borderRadius: 5
        },
        series: {
          stacking: 'normal',
        },
      },
      series:this.exampleData.reverse()
      });
    })
  }

  get massageSettingControls(): FormArray {
    return this.addMassageSettingForm.get("MassageSettings") as FormArray
  }

  private newMassageSetting(duration:number, strength: number, customColor: string) {
    return this.formBuilder.group({
      Duration: duration,
      Strength: strength,
      Color: customColor,
      IsDeleted: false,
    })
  }

  deleteCarPlate(id:any){
    //this.carPlateControls.removeAt(id);
    this.massageSettingControls.controls[id].value.IsDeleted = true;
  }

  addCarPlateItem(){
    this.massageSettingControls.push(this.newMassageSetting(0,0,''));
  }

  private checkCarPlateData(){
    var test = this.massageSettingControls.controls.find((item)=> item.value.IsDeleted == false);
    if(test != null){
      this.isCarPlateEmpty = false;
    }else{
      this.isCarPlateEmpty = true;
    }
  }


  onSubmit() {
    this.spinnerService.activate();
    this.submitted = true;
    if (this.addMassageSettingForm.valid && this.addMassageSettingForm.errors == null) {
      let data = this.addMassageSettingForm.value;
      console.log(data);
      this.apiService.post('api/user/add', data).subscribe(
        res => {
          this.spinnerService.deactivate();
          if (res.isError) {
            this.toastService.showToast('danger', 'Error', res.message);
          } else if (res.isTokenExpired) {
            this.toastService.showToast('danger', 'Error', res.message);
            this.storageService.clear();
            this.router.navigate(['/']);
          } else {
            this.toastService.showToast('success', 'Successful', 'New User added successfully.');
            this.router.navigate(['/dashboard/user']);
          }

        },
        err => {
          this.spinnerService.deactivate();
          if (!err.ok && err.status == 0) {
            this.toastService.showToast('danger', 'Error', err.message);
          } else {
            this.toastService.showToast('danger', 'Error', err.error?.message ?? 'Error connecting to server!');
          }
        }
      )
    }
    else {
      console.log(this.addMassageSettingForm);
      this.spinnerService.deactivate();
    }
  }


  get form() { return this.addMassageSettingForm.controls; }

}
