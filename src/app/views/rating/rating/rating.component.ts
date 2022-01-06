import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/apiService/api-service.service';
import { StorageService } from '../../../services/storageService/storage.service';
import { SpinnerService } from '../../../services/spinnerService/spinner.service';
import { ToastService } from '../../../services/toastService/toast.service';
import { NbDialogService } from '@nebular/theme';
import { HttpParams } from '@angular/common/http';
import { ConfirmationModalComponent } from '../../../@theme/components/modal/confirmation-modal/confirmation-modal.component';
import { ViewRatingComponent } from '../view-rating/view-rating.component';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  displayedColumns = [
    'no',
    'userName',
    'rating',
    'createdAt',
  ];
  dataSource = new MatTableDataSource();
  viewRating = true;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  paginateStartNo = 0;
  page = 0;
  size = 10;
  pageLength = 0;
  pageSizeOptions = [5, 10, 15, 20];
  searchForm!: FormGroup;
  isLoading = false;

  exampleData = [
    {
      UserName: 'Ah Wang',
      Rating: '5',
      CreatedAt: '1/10/2020',
    },
  ];
  ratingData: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private storageService: StorageService,
    private spinnerService: SpinnerService,
    private datePipe: DatePipe,
    @Optional() private dialogService: NbDialogService,
    private toastService: ToastService
  ) {
    this.searchForm = this.formBuilder.group({
      UserName: [null, Validators.maxLength(30)],
      Rating: [null],
    });
  }

  ngOnInit(): void {
    this.dataSource.data = this.exampleData;
  }

  
  filterSubmit(clear: any) {
    console.log(this.searchForm.value);
    if (clear) {
      this.paginator.firstPage();
    }
    if (this.searchForm.valid && this.searchForm.errors == null) {
      
      let userName = this.searchForm.value.UserName;
      let rating = this.searchForm.value.Rating;
      let params = new HttpParams();

      if (status == null && userName == null && rating == null ) {
        console.log("empty")
        this.toastService.showToast('danger', 'Error', 'Please input input filter value');
      } else {
        this.spinnerService.activate();
        params = params.append('userName', userName ?? '');
        params = params.append('rating', rating ?? '');
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
              this.ratingData = res.data;
              this.pageLength = res.pageDetail.totalElements;
              this.dataSource = new MatTableDataSource(this.ratingData);
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
    let userName = this.searchForm.value.UserName;
    let rating = this.searchForm.value.Rating;
    if(status != null || userName != null || rating != null){
      this.paginator.firstPage();
      this.searchForm.reset();
      this.page = 0;
      this.size = 10;
      this.getUserData();
    }
  }

  updateStatus() {
    let data = this.searchForm.value;
  }



  viewRatingDetails(row:any, isEdit :boolean){
    this.dialogService.open(ViewRatingComponent, {
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


  getUserData() {
    this.spinnerService.activate();
    let params = new HttpParams();
    params = params.append('pageNumber', this.page.toString());
    params = params.append('pageSize', this.size.toString());
    this.apiService.get('api/user/getAll', params).subscribe(
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
          this.ratingData = res.data;
          this.pageLength = res.pageDetail.totalElements;
          this.dataSource = new MatTableDataSource(this.ratingData);
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
    let rating = this.searchForm.value.Rating;
    let params = new HttpParams();

    if (status == null && userName == null && rating == null) {
      this.getUserData();
    }else{
      this.filterSubmit(false);
    }
  }

  get form() { return this.searchForm.controls; }
}
