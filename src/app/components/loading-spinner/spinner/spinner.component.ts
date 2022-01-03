import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerService } from '../../../services/spinnerService/spinner.service';
const SPINNER_MESSAGE = 'Loading...';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() show!: boolean;
  LOADING_TEXT!: string;

  constructor(private spinner: NgxSpinnerService, 
    private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.LOADING_TEXT = SPINNER_MESSAGE;
        this.spinnerService.getData().subscribe((data: any) => {
            if (data) {
                this.spinner.show();
            } else {
                this.spinner.hide();
            }
        });
    
  }

}
