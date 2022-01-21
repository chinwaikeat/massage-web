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
import { EditOrViewUserComponent } from '../edit-or-view-user/edit-or-view-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns = ['no', 'userName', 'role', 'status', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource();
  viewUser = true;

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
    {  userName: 'Pending', role: 'Annual', status: '1/10/2020', createdAt: '1/10/2020'},
    
  ];

  userData: any;
  constructor( 
    private storage: StorageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private storageService: StorageService, 
    private spinnerService: SpinnerService,
    private datePipe: DatePipe,
    @Optional() private dialogService: NbDialogService,
    private toastService: ToastService,) {
      this.searchForm = this.formBuilder.group({
        userName: [null, Validators.maxLength(30)],
        role: [null],
        isActive: [null],
        dateRange: [],
      });
     }

  ngOnInit(): void {
    this.getUserListData();
    //this.dataSource.data = this.exampleData;
  }

  filterSubmit(clear: any) {
    console.log(this.searchForm.value);
    if (clear) {
      this.paginator.firstPage();
    }
    if (this.searchForm.valid && this.searchForm.errors == null) {
      
      let userName = this.searchForm.value.userName;
      let role = this.searchForm.value.role;
      let status = this.searchForm.value.isActive;
      let dateRange = this.searchForm.value.dateRange
      let params = new HttpParams();

      if (status == null && userName == null && role == null && dateRange == null) {
        console.log("empty")
        this.toastService.showToast('danger', 'Error', 'Please input input filter value');
      } else {
        this.spinnerService.activate();
        params = params.append('userName', userName ?? '');
        params = params.append('role', role ?? '');
        params = params.append('status', status ?? '');
        params = params.append('dateFrom', dateRange == null ? '' : this.datePipe.transform(dateRange.begin, 'yyyy-MM-dd')!);
        params = params.append('dateTo', dateRange == null ? '' : this.datePipe.transform(dateRange.end, 'yyyy-MM-dd')!);
        params = params.append('pageNumber', this.page.toString());
        params = params.append('pageSize', this.size.toString());
        this.apiService.get('api/user/getFilteredUser', params).subscribe(
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
    let role = this.searchForm.value.role;
    let status = this.searchForm.value.isActive;
    let dateRange = this.searchForm.value.dateRange
    if(status != null || userName != null || role != null || dateRange != null){
      this.paginator.firstPage();
      this.searchForm.reset();
      this.page = 0;
      this.size = 10;
      this.getUserListData();
    }
  }

  updateStatus() {
    let data = this.searchForm.value;
  }

  addUser() {
    this.router.navigate(['/dashboard/add']);
  }


  viewOrEditUserDetails(row:any, isEdit :boolean){
    this.dialogService.open(EditOrViewUserComponent, {
      context: {
        eventData: row,
        action: isEdit ? "edit": "view" 
      },
    }).onClose.subscribe(value => {
      if(value == 1){
       // this.getUserData();
      }
    })
  }

  deleteUser(row:any) {
    this.dialogService.open(ConfirmationModalComponent, {
      context: {
        title: "Delete Confirmation",
        message: "Are you sure delete user of " + row.userName + "?",
      },
    }).onClose.subscribe(value => {
      if (value == 1) {
        this.spinnerService.activate();
        let params = new HttpParams();
        params = params.append('userIdToBeDelete', row.userId ?? '');
        this.apiService.actualDelete("api/user/delete", params)
          .subscribe(
            (res) => {
              this.spinnerService.deactivate();
              console.log(res)
              if (res.isError) {
                this.toastService.showToast("danger", 'Error', "Failed to delete user.");
              } else if (res.isTokenExpired) {
                this.toastService.showToast('danger', 'Error', res.message);
                this.storageService.clear();
                this.router.navigate(['/']);
              } else {
                this.toastService.showToast("success", 'Successful', "Deleted successfully.");
                this.getUserListData();
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


  getUserListData() {
    this.spinnerService.activate();
    let params = new HttpParams();
    params = params.append('pageNumber', this.page.toString());
    params = params.append('pageSize', this.size.toString());

    this.apiService.get('api/user/getUserList', params).subscribe(
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
    let userName = this.searchForm.value.UserName;
    let role = this.searchForm.value.Role;
    let status = this.searchForm.value.IsActive;
    let dateRange = this.searchForm.value.DateRange
    let params = new HttpParams();

    if (status == null && userName == null && role == null && dateRange == null) {
      this.getUserListData();
    }else{
      this.filterSubmit(false);
    }
  }

  get form() { return this.searchForm.controls; }

}
