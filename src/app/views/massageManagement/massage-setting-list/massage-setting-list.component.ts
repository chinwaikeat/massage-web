import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { DatePipe } from '@angular/common';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { ApiService } from '../../../services/apiService/api-service.service';
import { StorageService } from '../../../services/storageService/storage.service';
import { SpinnerService } from '../../../services/spinnerService/spinner.service';
import { ToastService } from '../../../services/toastService/toast.service';
import { NbDialogService  } from '@nebular/theme';
import { HttpParams } from '@angular/common/http';
import { ConfirmationModalComponent } from '../../../@theme/components/modal/confirmation-modal/confirmation-modal.component';
import { DataCommunicationService } from 'src/app/services/dataCommunication/data-communication.service';

@Component({
  selector: 'app-massage-setting-list',
  templateUrl: './massage-setting-list.component.html',
  styleUrls: ['./massage-setting-list.component.scss']
})
export class MassageSettingListComponent implements OnInit {
  displayedColumns = ['no', 'userName', 'rating','type', 'status', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource();
  viewMassageSetting = true;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  paginateStartNo = 0;
  page = 0;
  size = 10;
  pageLength = 0;
  pageSizeOptions = [5, 10, 15, 20];
  searchForm!: FormGroup;
  isLoading = false;
  role: any;

  exampleData =  [
    {  UserName: 'Chin', Rating: '5', Type: 'USER_CUSTOMIZE', Status: 'ACTIVE', CreatedAt: '1/10/2020'},
  ];

  userData: any;
  constructor( private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private storageService: StorageService, 
    private spinnerService: SpinnerService,
    private datePipe: DatePipe,
    private dataCommunicationService: DataCommunicationService,
    @Optional() private dialogService: NbDialogService,
    private toastService: ToastService,) {
      this.searchForm = this.formBuilder.group({
        userName: [null, Validators.maxLength(30)],
        rating: [null],
        type: [null],
        status: [null],
      });
     }

  ngOnInit(): void {
   // this.dataSource.data = this.exampleData;
   this.getMassageData();
  }

  filterSubmit(clear: any) {
    console.log(this.searchForm.value);
    if (clear) {
      this.paginator.firstPage();
    }
    if (this.searchForm.valid && this.searchForm.errors == null) {
      
      let userName = this.searchForm.value.userName;
      let rating = this.searchForm.value.rating;
      let type = this.searchForm.value.type;
      let status = this.searchForm.value.status
      let params = new HttpParams();

      if (type  == null && userName == null && rating == null && status == null) {
        console.log("empty")
        this.toastService.showToast('danger', 'Error', 'Please input input filter value');
      } else {
        this.spinnerService.activate();
        params = params.append('userName', userName ?? '');
        params = params.append('rating', rating ?? 0);
        params = params.append('type', type  ?? '');
        params = params.append('status', status ?? '');
        params = params.append('pageNumber', this.page.toString());
        params = params.append('pageSize', this.size.toString());
        this.apiService.get('api/massageSetting/getFilteredMassageSetting', params).subscribe(
          res => {
            this.spinnerService.deactivate();
            if (res.isError) {
              this.toastService.showToast('danger', 'Error', res.message);
            } else if (res.isTokenExpired) {
              this.toastService.showToast('danger', 'Error', res.message);
              this.storageService.clear();
              this.router.navigate(['/']);
            }
            else {
              this.userData = res.data;
              this.pageLength = res.pageDetail.totalElements;
              this.dataSource = new MatTableDataSource(this.userData);
            }
          },
          err => {
            this.spinnerService.deactivate();
            console.log(err)
            if (!err.ok && err.status == 0) {
              this.toastService.showToast('danger', 'Error', err.message);
            } else {
              this.toastService.showToast('danger', 'Error',err.error?.message??'Error connecting to server!');
            }   
          }
        )
      }

    }
  }

  clearForm() {
    let userName = this.searchForm.value.userName;
    let rating = this.searchForm.value.rating;
    let type = this.searchForm.value.type
    let status = this.searchForm.value.isActive;
    if(status != null || userName != null || rating != null || type != null){
      this.paginator.firstPage();
      this.searchForm.reset();
      this.page = 0;
      this.size = 10;
      this.getMassageData();
    }
  }

  updateStatus() {
    let data = this.searchForm.value;
  }

  addMassageSetting() {
   // this.router.navigate(['/dashboard/addMassageSetting']);
   this.dataCommunicationService.setPassedItemData('');
   this.router.navigate(['/dashboard/addMassageSetting']);
  }


  viewOrEditUserDetails(row:any){
    // this.dialogService.open(ViewOrEditMassageSettingComponent, {
    //   context: {
    //     eventData: row,
    //     action: isEdit ? "edit": "view" 
    //   },
    // }).onClose.subscribe(value => {
    //   if(value == 1){
    //    // this.getUserData();
    //   }
    // })
  //   this.router.navigateByUrl('/dashboard/addMassageSetting',  {
  //     state: { foo: 'bar', name: 'Chin ****************'}
  // });

    this.dataCommunicationService.setPassedItemData(row);
    this.router.navigate(['/dashboard/addMassageSetting']);
  }

  deleteMassageSetting(row:any) {
    this.dialogService.open(ConfirmationModalComponent, {
      context: {
        title: "Delete Confirmation",
        message: "Are you sure want to delete ?",
      },
    }).onClose.subscribe(value => {
      if (value == 1) {
        this.spinnerService.activate();
        let params = new HttpParams();
        params = params.append('massageSettingId', row.massageSettingId ?? '');
        this.apiService.actualDelete("api/massageSetting/delete", params)
          .subscribe(
            (res) => {
              this.spinnerService.deactivate();
              console.log(res)
              if (res.isError) {
                this.toastService.showToast("danger", 'Error', "Failed to delete.");
              } else if (res.isTokenExpired) {
                this.toastService.showToast('danger', 'Error', res.message);
                this.storageService.clear();
                this.router.navigate(['/']);
              } else {
                this.toastService.showToast("success", 'Successful', "Deleted successfully.");
                this.getMassageData();
              }
            },
            (err) => {
              this.spinnerService.deactivate();
              console.log(err)
              if (!err.ok && err.status == 0) {
                this.toastService.showToast('danger', 'Error', err.message);
              } else {
                this.toastService.showToast('danger', 'Error',err.error?.message??'Error connecting to server!');
              }   
            }
          );
      }
    })
  }


  getMassageData() {
    this.spinnerService.activate();
    let params = new HttpParams();
    params = params.append('pageNumber', this.page.toString());
    params = params.append('pageSize', this.size.toString());
    this.apiService.get('api/massageSetting/getMassageSettingList', params).subscribe(
      res => {
        this.spinnerService.deactivate();
        console.log(res);
        if (res.isError) {
          this.toastService.showToast('danger','Error', res.message);
        } else if (res.isTokenExpired) {
          this.toastService.showToast('danger', 'Error', res.message);
          this.storageService.clear();
          this.router.navigate(['/']);
        }
        else {
          this.userData = res.data;
          this.pageLength = res.pageDetail.totalElements;
          this.dataSource = new MatTableDataSource(this.userData);
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


  onPaginateChange(event:any) {
    this.size = event.pageSize;
    this.page = event.pageIndex;
    let userName = this.searchForm.value.userName;
    let rating = this.searchForm.value.rating;
    let type = this.searchForm.value.type;
    let status = this.searchForm.value.isActive;
    
    let params = new HttpParams();

    if (status == null && userName == null && rating == null && type == null) {
      this.getMassageData();
    }else{
      this.filterSubmit(false);
    }
  }

  get form() { return this.searchForm.controls; }

}
