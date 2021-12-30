import { Component, OnInit, } from '@angular/core';
import { NavigationStart , Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from "./services/storageService/storage.service";

export let browserRefresh = false;

@Component({
  selector: 'ngx-app',
  template: '<app-loading-spinner></app-loading-spinner><router-outlet></router-outlet>',
})
export class AppComponent  implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  subscription: Subscription;
  constructor( private storage: StorageService,

   // private seoService: SeoService,
    private router: Router){

    this.subscription = router.events.subscribe((event) => {

      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
        var token = this.storage.getAccessToken();
        console.log("refresh " + token);
        if ((router.navigated || browserRefresh) && event.url !== '/' && event.url !== '/pages/login' && (token == null || token == '')) {
          // console.log("token " + token)
          this.storage.clear();
          localStorage.clear();
          console.log("************");
          this.router.navigate(['/']);
        }
      }

    });
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  ngOnDestroy() {
    localStorage.clear();
  }

}
