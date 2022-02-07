import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataCommunicationService {

  sideMenuCollapsed = false;

  public passedItemData = new BehaviorSubject<any>('');
  getPassedItemData = this.passedItemData.asObservable();

  public messageId = new BehaviorSubject<any>('');
  getMessageId = this.messageId.asObservable();

  public sideMenu = new BehaviorSubject<any>(this.sideMenuCollapsed);
  isSideMenuCollapsed = this.sideMenu.asObservable();

  constructor() { }

  setPassedItemData(data:any){
    this.passedItemData.next(data);
  }

  setMessageId(data: any){
    this.messageId.next(data);
  }

  setSideMenuData(){
    this.sideMenuCollapsed = !this.sideMenuCollapsed;
    this.sideMenu.next( this.sideMenuCollapsed);
  }
}
