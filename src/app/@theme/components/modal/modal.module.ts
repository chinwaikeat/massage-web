import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { NbLayoutModule, NbInputModule, NbCheckboxModule, NbButtonModule, NbCardModule } from '@nebular/theme';
import { SessionTimeoutModalComponent } from './session-timeout-modal/session-timeout-modal.component';



@NgModule({
  declarations: [ConfirmationModalComponent, SessionTimeoutModalComponent],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbInputModule,
    NbCheckboxModule,
    NbButtonModule,
    NbCardModule,

  ],
  exports:[ConfirmationModalComponent, SessionTimeoutModalComponent],
  entryComponents:[ConfirmationModalComponent, SessionTimeoutModalComponent]
})
export class ModalModule { }
