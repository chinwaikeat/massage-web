import { Component, OnInit, Input } from "@angular/core";
import { Validators, FormBuilder, FormGroup, ValidatorFn,FormArray } from "@angular/forms";
import { Router } from "@angular/router";
//import { DataCommunicationService } from "../../../../services/data-com/data-communication.service";
import { Subscription } from "rxjs";
import { ApiService } from "../../../services/apiService/api-service.service";
import { SpinnerService } from '../../../services/spinnerService/spinner.service';
import { ToastService } from '../../../services/toastService/toast.service';
import { StorageService } from '../../../services/storageService/storage.service';
import { passValidator } from '../../../utils/passwordValidators';

@Component({
  selector: 'app-add-massage-setting',
  templateUrl: './add-massage-setting.component.html',
  styleUrls: ['./add-massage-setting.component.scss']
})
export class AddMassageSettingComponent implements OnInit {
  addMassageSettingForm!: FormGroup;
  submitted: boolean = false;
  isCarPlateEmpty: boolean = false;
  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastService: ToastService,
    private spinnerService: SpinnerService,
    private storageService: StorageService,) {
      this.addMassageSettingForm = this.formBuilder.group(
        {
          Type: ['', Validators.required],
          CarPlates: this.formBuilder.array([], Validators.required),
          IsActive: ['true', Validators.required],
        },
       
      );
     }

  ngOnInit(): void {
  }

  goback() {
    this.router.navigate(['/dashboard/massageSetting']);
  }

  get carPlateControls(): FormArray {
    return this.addMassageSettingForm.get("CarPlates") as FormArray
  }

  newCarPlate() {
    return this.formBuilder.group({
      CarPlateId: null,
      CarPlateNo: '',
      IsDeleted: false,
    })
  }

  deleteCarPlate(id:any){
    //this.carPlateControls.removeAt(id);
    this.carPlateControls.controls[id].value.IsDeleted = true;
  }

  addCarPlateItem(){
    this.carPlateControls.push(this.newCarPlate());
  }

  private checkCarPlateData(){
    var test = this.carPlateControls.controls.find((item)=> item.value.IsDeleted == false);
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
