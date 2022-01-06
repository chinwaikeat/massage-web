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
  selector: 'app-view-rating',
  templateUrl: './view-rating.component.html',
  styleUrls: ['./view-rating.component.scss']
})
export class ViewRatingComponent implements OnInit {
  @Input() eventData: any;
  @Input() action: any;
  ratingForm!: FormGroup;

  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastService: ToastService,
    private spinnerService: SpinnerService,
    private storageService: StorageService,
    protected ref: NbDialogRef<ViewRatingComponent>) {
      this.ratingForm = this.formBuilder.group(
        {
          UserName: ['', Validators.required],
          Rating: ['', Validators.required],
        },
        
      );
     }

  ngOnInit(): void {
  }

  initializeData(){
    if(this.eventData == null){
      this.toastService.showToast('danger', 'Error', 'No Data Found');
    }else{

      this.ratingForm.patchValue({
        UserName: this.eventData.UserName,
        Rating: this.eventData.Rating,
      });
    }
  }

  close(value: any){
    this.ref.close(value);
  }

  get form() { return this.ratingForm.controls; }
}
