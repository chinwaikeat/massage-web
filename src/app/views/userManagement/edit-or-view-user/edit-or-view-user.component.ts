import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ValidatorFn, FormArray } from "@angular/forms";
import { NbToastrService, NbComponentStatus, NbDialogRef } from "@nebular/theme";
import { Router } from "@angular/router";
import { ApiService } from '../../../services/apiService/api-service.service';
import { StorageService } from '../../../services/storageService/storage.service';
import { SpinnerService } from '../../../services/spinnerService/spinner.service';
import { ToastService } from '../../../services/toastService/toast.service';
import { passValidator } from '../../../utils/passwordValidators';
import { ConstantValues } from 'src/app/utils/constantValue';

@Component({
  selector: 'app-edit-or-view-user',
  templateUrl: './edit-or-view-user.component.html',
  styleUrls: ['./edit-or-view-user.component.scss']
})
export class EditOrViewUserComponent implements OnInit {
  @Input() eventData: any;
  @Input() action: any;
  editUserForm!: FormGroup;
  submitted: boolean = false;
  minDate: Date = new Date();
  isShowPassword: boolean = false;
  isShowReEnterPassword: boolean = false;
  userRole: any;
  roles: any;
  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastService: ToastService,
    private spinnerService: SpinnerService,
    private storageService: StorageService,
    protected ref: NbDialogRef<EditOrViewUserComponent>) { 
      this.editUserForm = this.formBuilder.group(
        {
          userId: ['', Validators.required],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email : ['', Validators.required],
          userName: ['', Validators.required],
          password: [''],
          reEnterPassword: [''],
          role: ['', Validators.required],
          isActive: [true, Validators.required],
          modifiedAt: ['']
        },
        {
          validator: passValidator('password', 'reEnterPassword')
      }
      );
    }

  ngOnInit(): void {  
   
  this.roles = ConstantValues.ROLES_LIST;
  this.initializeData();
  }

  initializeData(){
    if(this.eventData == null){
      this.toastService.showToast('danger', 'Error', 'No Data Found');
    }else{
      console.log("test ", this.eventData );
      this.editUserForm.patchValue({
        userId: this.eventData.userId,
        firstName: this.eventData.firstName,
        lastName: this.eventData.lastName,
        userName: this.eventData.userName,
        email: this.eventData.email,
        role: this.eventData.role,
        isActive:this.eventData.isActive,
        modifiedAt: this.eventData.modifiedAt,
      });
    }
  }

  close(value: any){
    this.ref.close(value);
  }

  addAndRemoveValidator(value:any){
    if(value){
      this.editUserForm.controls['password'].setValidators([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
      this.editUserForm.controls['password'].updateValueAndValidity();
      this.editUserForm.controls['reEnterPassword'].setValidators([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
      this.editUserForm.controls['reEnterPassword'].updateValueAndValidity();
    }else{
      this.editUserForm.controls['password'].clearValidators()
      this.editUserForm.controls['password'].updateValueAndValidity();
      this.editUserForm.controls['reEnterPassword'].clearValidators()
      this.editUserForm.controls['reEnterPassword'].updateValueAndValidity();
    }
  }



  onSubmit() {
    this.submitted = true;
    this.spinnerService.activate();
    if (this.editUserForm.valid && this.editUserForm.errors == null) {
      let data = this.editUserForm.value;
      console.log(data);
      this.apiService.put('api/user/webUpdate', data).subscribe(
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
