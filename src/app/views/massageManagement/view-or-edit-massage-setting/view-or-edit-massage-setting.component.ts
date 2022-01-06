import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ValidatorFn, FormArray } from "@angular/forms";
import { NbToastrService, NbComponentStatus, NbDialogRef } from "@nebular/theme";
import { Router } from "@angular/router";
import { ApiService } from '../../../services/apiService/api-service.service';
import { StorageService } from '../../../services/storageService/storage.service';
import { SpinnerService } from '../../../services/spinnerService/spinner.service';
import { ToastService } from '../../../services/toastService/toast.service';
import { passValidator } from '../../../utils/passwordValidators';

@Component({
  selector: 'app-view-or-edit-massage-setting',
  templateUrl: './view-or-edit-massage-setting.component.html',
  styleUrls: ['./view-or-edit-massage-setting.component.scss']
})
export class ViewOrEditMassageSettingComponent implements OnInit {
  @Input() eventData: any;
  @Input() action: any;
  editUserForm!: FormGroup;
  submitted: boolean = false;
  minDate: Date = new Date();
  isShowPassword: boolean = false;
  isShowReEnterPassword: boolean = false;
  userRole: any;
  roles: any;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastService: ToastService,
    private spinnerService: SpinnerService,
    private storageService: StorageService,
    protected ref: NbDialogRef<ViewOrEditMassageSettingComponent>) {
      this.editUserForm = this.formBuilder.group(
        {
          UserId: ['', Validators.required],
          FirstName: ['', Validators.required],
          LastName: ['', Validators.required],
          Email : ['', Validators.required],
          UserName: ['', Validators.required],
          Password: ['',[ Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
          ReEnterPassword: ['', [ Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
          Role: ['', Validators.required],
          IsActive: ['', Validators.required],
          ModifiedAt: ['']
        },
        {
          validator: passValidator('Password', 'ReEnterPassword')
      }
      );
     }

  ngOnInit(): void {
  }

  initializeData(){
    if(this.eventData == null){
      this.toastService.showToast('danger', 'Error', 'No Data Found');
    }else{
      console.log("test " + this.eventData );
      this.editUserForm.patchValue({
        UserId: this.eventData.UserId,
        FirstName: this.eventData.FirstName,
        LastName: this.eventData.LastName,
        UserName: this.eventData.UserName,
        Password: this.eventData.Password,
        ReEnterPassword: this.eventData.Password,
        Role: this.eventData.Role,
        IsActive: this.eventData.IsActive.toString(),
        ModifiedAt: this.eventData.ModifiedAt,
      });
    }
  }

  close(value: any){
    this.ref.close(value);
  }

  onSubmit() {
    this.submitted = true;
    this.spinnerService.activate();
    if (this.editUserForm.valid && this.editUserForm.errors == null) {
      let data = this.editUserForm.value;
      console.log(data);
      this.apiService.put('api/user/update', data).subscribe(
        res => {
          this.spinnerService.deactivate();
          if (res.isError) {
            this.toastService.showToast('danger', 'Error', res.message);
            if (res.statusCode == 409) {
              this.router.navigate(['/dashboard/user']);
            }
          } else if (res.isTokenExpired) {
            this.toastService.showToast('danger', 'Error', res.message);
            this.storageService.clear();
            this.router.navigate(['/']);
          }
          else {
            this.ref.close(1);
            this.toastService.showToast('success', 'Successful', 'Updated successfully.');
            this.router.navigate(['/dashboard/user']);
          }
        },
        err => {
          this.spinnerService.deactivate();
          if (!err.ok && err.status == 0) {
            this.toastService.showToast('danger', 'Error', err.message);
          } else {
            this.toastService.showToast('danger', 'Error',err.error?.message??'Error connecting to server!');
          }   
        }
      )
    }
    else {
      this.spinnerService.deactivate();
      console.log(this.editUserForm);
    }
  }

  toggleShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  toggleShowReEnterPassword() {
    this.isShowReEnterPassword = !this.isShowReEnterPassword;
  }

  get form() { return this.editUserForm.controls; }

}
