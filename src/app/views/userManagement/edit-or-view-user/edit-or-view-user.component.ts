import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ValidatorFn, FormArray } from "@angular/forms";
import { NbToastrService, NbComponentStatus, NbDialogRef } from "@nebular/theme";
import { Router } from "@angular/router";
import { ApiService } from '../../../services/apiService/api-service.service';
import { StorageService } from '../../../services/storageService/storage.service';
import { SpinnerService } from '../../../services/spinnerService/spinner.service';
import { ToastService } from '../../../services/toastService/toast.service';

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
  isCarPlateEmpty: boolean = false;
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
          StudentId: ['', Validators.required],
          StudentName: ['', Validators.required],
          ClassName: ['', Validators.required],
          ParentName: ['', Validators.required],
          CarPlates: this.formBuilder.array([], Validators.required),
          IsActive: ['', Validators.required],
          ModifiedAt: ['']
        },
      );
    }

  ngOnInit(): void {
  }

  get carPlateControls(): FormArray {
    return this.editUserForm.get("CarPlates") as FormArray
  }
  

  initializeData(){
    if(this.eventData == null){
      this.toastService.showToast('danger', 'Error', 'No Data Found');
    }else{
      console.log("test " + this.eventData );
      this.editUserForm.patchValue({
        StudentId: this.eventData.StudentId,
        StudentName: this.eventData.StudentName,
        ClassName: this.eventData.ClassName,
        ParentName: this.eventData.ParentName,
        IsActive: this.eventData.IsActive.toString(),
        ModifiedAt: this.eventData.ModifiedAt,
      });

      let carPlates = this.eventData.CarPlates;
      carPlates.forEach((element: { CarPlateId: any; CarPlateNo: any; IsDeleted: any; }) => {
        this.carPlateControls.push(this.populateCarPlate(element.CarPlateId, element.CarPlateNo, element.IsDeleted))
      });
    }
  }

  populateCarPlate(carPlateId:any, carPlateNo:any, isDeleted:any) {
    return this.formBuilder.group({
      CarPlateId: carPlateId,
      CarPlateNo: carPlateNo,
      IsDeleted: isDeleted,
    })
  }

  close(value:any){
    this.ref.close(value);
  }

  deleteCarPlate(id:any){
   // this.carPlateControls.removeAt(id);
   this.carPlateControls.controls[id].value.IsDeleted = true;
  }

  addCarPlateItem(){
    this.carPlateControls.push(this.newCarPlate());
  }

  newCarPlate() {
    return this.formBuilder.group({
      CarPlateId: null,
      CarPlateNo: '',
      IsDeleted: false,
    })
  }

  removeEmpty(){
    this.carPlateControls.controls.forEach((element,index)=>{
      if(element.value.CarPlateNo == '' || element.value.CarPlateNo == null){
        this.carPlateControls.removeAt(index);
      }
   });
  }

  checkCarPlateData(){
    var test = this.carPlateControls.controls.find((item)=> item.value.IsDeleted == false);
    if(test != null){
      this.isCarPlateEmpty = false;
    }else{
      this.isCarPlateEmpty = true;
    }
  }

  onSubmit() {
    this.removeEmpty();
    this.checkCarPlateData();
    this.submitted = true;
    this.spinnerService.activate();
    if (this.editUserForm.valid && this.editUserForm.errors == null && this.isCarPlateEmpty == false) {
      let data = this.editUserForm.value;
      console.log(data);
      this.apiService.put('api/student/update', data).subscribe(
        res => {
          this.spinnerService.deactivate();
          if (res.isError) {
            this.toastService.showToast('danger', 'Error', res.message);
            if (res.statusCode == 409) {
              this.router.navigate(['/dashboard/student']);
            }
          } else if (res.isTokenExpired) {
            this.toastService.showToast('danger', 'Error', res.message);
            this.storageService.clear();
            this.router.navigate(['/']);
          }
          else {
            this.ref.close(1);
            this.toastService.showToast('success', 'Successful', 'Updated successfully.');
            this.router.navigate(['/dashboard/student']);
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

  get form() { return this.editUserForm.controls; }

}
