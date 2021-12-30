import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  @Input() message:any;
  @Input() title:any;
  constructor(protected ref: NbDialogRef<ConfirmationModalComponent>) { }

  ngOnInit(): void {
  }
  dismiss() {
    this.ref.close();
  }
  save(value){
    this.ref.close(value);
  }

}
