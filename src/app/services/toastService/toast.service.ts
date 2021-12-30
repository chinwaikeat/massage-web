import { Injectable } from '@angular/core';
import {  NbComponentStatus, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastr: NbToastrService

  ) { }


  showToast(status: NbComponentStatus, title: string, message: string) {
    let iconName = status == 'danger' ? 'close-outline' : 'checkmark-outline';
    var duration: number = 4000;
    this.toastr.show(message, title, { status, duration , icon: iconName});
  }
}
