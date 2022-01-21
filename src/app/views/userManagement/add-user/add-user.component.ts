import { Component, OnInit, Input } from "@angular/core";
import { Validators, FormBuilder, FormGroup, ValidatorFn } from "@angular/forms";
import { Router } from "@angular/router";
//import { DataCommunicationService } from "../../../../services/data-com/data-communication.service";
import { Subscription } from "rxjs";
import { ApiService } from "../../../services/apiService/api-service.service";
import { SpinnerService } from '../../../services/spinnerService/spinner.service';
import { ToastService } from '../../../services/toastService/toast.service';
import { StorageService } from '../../../services/storageService/storage.service';
import { passValidator } from '../../../utils/passwordValidators';
import { ConstantValues } from '../../../utils/constantValue';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;
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
    private storageService: StorageService,) {
      this.addUserForm = this.formBuilder.group(
        {
          userId: [0],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          userName: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
          reEnterPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
          role: ['', Validators.required],
          isActive: [true, Validators.required],
          modifiedAt: [null]
        },
        {
          validator: passValidator('password', 'reEnterPassword')
        }
      );
     }

  ngOnInit(): void {
    this.roles = ConstantValues.ROLES_LIST;

    // if(this.userRole == 'MASTER ADMIN'){
    //   this.roles.push({"value":"MASTER ADMIN","name": "MASTER ADMIN"})
    // }
    
  }

  goback() {
    this.router.navigate(['/dashboard/user']);
  }

  onSubmit() {
    this.spinnerService.activate();
    this.submitted = true;
    if (this.addUserForm.valid && this.addUserForm.errors == null) {
      let data = this.addUserForm.value;
      console.log(data);
      this.apiService.post('api/user/webAddUser', data).subscribe(
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
      console.log(this.addUserForm);
      this.spinnerService.deactivate();
    }
  }

  toggleShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  toggleShowReEnterPassword() {
    this.isShowReEnterPassword = !this.isShowReEnterPassword;
  }

  get form() { return this.addUserForm.controls; }

}
