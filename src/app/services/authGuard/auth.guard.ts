import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
//import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  sessionData: any;
  constructor(
    private router:Router,        
  //  private storage:StorageService
    )
  {
    // this.sessionData =  this.storage.getUserData();

  }

  canActivate(): boolean {
      // if(this.sessionData){
      //   var date:any = new Date();
      //   let  current_time =  Math.floor(date / 1000);
      //   if(this.sessionData.exp>current_time){
      //     return true;
      //   }
      //   else{
      //     this.router.navigate(["/auth/login"])
      //     return false;
      //   }
      // }

    return true;
  }

}
