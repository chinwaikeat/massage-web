import { Injectable, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  testBrowser: boolean;
  //private carPlate = new CarPlateQueue();
  private tokenKey: string = 'accessToken';
  private roleKey: string = 'accessRole';
  private userNameKey: string = 'userName';
  private userIdKey: string = 'userId';
  

  constructor(
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) platformId: string,
  ) {
    this.testBrowser = isPlatformBrowser(platformId);
  }

//   public getAllSignalRData(): CarPlateQueue {
//     return this.carPlate;
//   }

//   public getSignalRData(): CarPlate {
//     return this.carPlate.dequeue();
//   }

//   public getSignalRDataLength(): number {
//     return this.carPlate.length;
//   }

//   public peek(): CarPlate {
//     var returnData;
//     for (let i = 0; i < this.carPlate.length; i++) {
//       var carPlate = this.carPlate.peek(i);
//       if (carPlate.IsRead == false) {
//         returnData = carPlate;
//         break;
//       }
//     }
//     return returnData;
//   }

//   public addSignalRData(data) {
//     if (this.carPlate.length == 5) {
//       this.carPlate.dequeue();
//     }
//     this.carPlate.enqueue(data);
//   }

//   public updateSignalRData(data) {
//     this.carPlate.find(item => item.CarPlateId == data.CarPlateId).IsRead = true;
//     this.carPlate.find(item => item.CarPlateId == data.CarPlateId).IsBlink = false;
//   }

//   public startBlink(data) {
//     this.carPlate.find(item => item.CarPlateId == data.CarPlateId).IsBlink = true;
//   }


  public getRole(): string {
    return this.cookieService.get(this.roleKey);
  }

  public setRole(role: any) {
    this.cookieService ? this.cookieService.set(this.roleKey, role) : "";
    // sessionStorage ? sessionStorage.setItem('accessToken', token) : "";
  }


  public getAccessToken(): any {
    // if (this.testBrowser) {
    //   return this.cookieService.get(this.tokenKey);
    // } else
    //   return;
    return this.cookieService.get(this.tokenKey);
  }

  public setRoleData(role: any) {
    localStorage ? localStorage.setItem("userRole", JSON.stringify(role)) : "";
    return this;
  }

  public getRoleData() {
    return localStorage ? JSON.parse(localStorage.getItem("userRole")!) : '';
  }
  public setAccessToken(token : string) {
    this.cookieService ? this.cookieService.set(this.tokenKey, token) : "";
    // sessionStorage ? sessionStorage.setItem('accessToken', token) : "";
  }

  public setUserName(userName: string){
    this.cookieService ? this.cookieService.set(this.userNameKey, userName) : "";
  }

  public getUserName(): any {
    const userName = this.cookieService.get(this.userNameKey);
    return userName;
  }


  public setUserId(userId: any){
    this.cookieService ? this.cookieService.set(this.userIdKey, userId) : "";
  }

  public getUserId(): any {
    const userId = this.cookieService.get(this.userIdKey);
    return userId;
  }



  public payload(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  public clear(): any {
    this.cookieService.deleteAll()
    //localStorage ? localStorage.removeItem('accessToken') : '';
  }

  public setOthersData(data : string, key_name : string): any {

    localStorage ? localStorage.setItem(key_name, JSON.stringify(data)) : '';

  }

  public getOthersData(key_name : string): any {

    return localStorage ? JSON.parse(localStorage.getItem(key_name)!) : '';

  }

  public setFilterData(data: any): void {
    let filterData = this.getOthersData('filterData') ? this.getOthersData('filterData') : {};
    if (data["pageIndex"] >= 0) {
      filterData["pageIndex"] = data["pageIndex"];
    }
    if (data["pageSize"]) {
      filterData["pageSize"] = data["pageSize"];
    }
    if (data["filterData"]) {
      filterData["filterData"] = data["filterData"];
    }
    if (data["search"] == "clear") {
      filterData["search"] = "";
    } else if (data["search"] != "" && data["search"] != undefined) {
      filterData["pageIndex"] = 0;
      filterData["pageSize"] = 100;
      filterData["search"] = data["search"];
    }

    this.setOthersData(filterData, "filterData");
  }

  public getFilterData(): any {

    return localStorage ? JSON.parse(localStorage.getItem("filterData")!) : '';

  }

  public clearFilterData(): void {

    localStorage ? localStorage.removeItem('filterData') : '';
  }


  public clearOthersData(key_name: string) {
    localStorage.removeItem(key_name);
  }
}


// class CarPlateQueue extends Array<CarPlate> {
//   enqueue(val) {
//     this.push(val);
//   }

//   dequeue() {
//     return this.shift();
//   }

//   peek(index) {
//     return this[index];
//   }

//   isEmpty() {
//     return this.length === 0;
//   }
// }