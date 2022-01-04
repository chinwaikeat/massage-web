import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-session-timeout-modal',
  templateUrl: './session-timeout-modal.component.html',
  styleUrls: ['./session-timeout-modal.component.scss']
})
export class SessionTimeoutModalComponent implements OnInit {

  @Input() message:any;
  constructor(protected ref: NbDialogRef<SessionTimeoutModalComponent>) { }

  ngOnInit(): void {
  }
  dismiss() {
    this.ref.close();
  }
  save(value:any){
    this.ref.close(value);
  }
}
