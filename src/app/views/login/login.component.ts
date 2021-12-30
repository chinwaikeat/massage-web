import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storageService/storage.service';
import { SpinnerService } from '../../services/spinnerService/spinner.service';
import { ToastService } from '../../services/toastService/toast.service';
import { ApiService } from '../../services/apiService/api-service.service';
import { Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  success = false;
  danger = false;
  message!: string;
  isShowPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private storage: StorageService,
    private apiService: ApiService,
    private router: Router,
    private spinnerService: SpinnerService,
    private toastService: ToastService) {
    this.loginForm = this.formBuilder.group({
      Username: ["admin",
        Validators.required
      ],
      Password: ["Password!20", [
        Validators.required,
      ]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("All Data = ", this.loginForm.value);
    console.log("User Name = ", this.loginForm.value.Username);
    console.log("Password = ", this.loginForm.value.Password);

    if (this.loginForm.valid) {
      this.spinnerService.activate();
      this.apiService.login("api/auth", this.loginForm.value).subscribe(
        res => {
          this.spinnerService.deactivate();
          if (res.isError) {
            this.toastService.showToast('danger', 'Error', res.message);
          } else {
            this.toastService.showToast("success", 'Successful', "Autenticated");
            this.storage.setAccessToken(res.data.token);
            this.storage.setRole(res.data.role);
            this.storage.setUserName(res.data.userName);
            this.router.navigate(['dashboard']);
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
      );
    }
  }

  toggleShowPasswordText() {
    this.isShowPassword = !this.isShowPassword;
  }

  ngOnDestroy() {

  }

  get form() { return this.loginForm.controls; }

}


