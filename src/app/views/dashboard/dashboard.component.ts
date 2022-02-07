import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../services/storageService/storage.service';
import { NbComponentStatus, NbDialogService, NbSidebarService, NbToastrService, NbMenuService, NbMenuItem } from "@nebular/theme";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  template: `
  <ngx-one-column-layout>
    <nb-menu [items]="menu" autoCollapse="true"></nb-menu>
    <router-outlet></router-outlet>
  </ngx-one-column-layout>
`,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   menu: NbMenuItem[] = [
     //{
  //   title: 'Dashboard',
  //   icon: 'people-outline',
  //   link: '/dashboard/home',
  // },
  // {
  //   title: 'User Management',
  //   icon: 'people-outline',
  //   children: [
  //     {
  //       icon: "person-add-outline",
  //       title: 'Users',
  //       link: '/dashboard/user',
  //     },
  //   ]
  // },
  // {
  //   title: 'Massage Management',
  //   icon: 'settings-2-outline',
  //   children: [
  //     {
  //       icon: "options-outline",
  //       title: 'Massage Setting',
  //       link: '/dashboard/massageSetting',
  //     },
  //     {
  //       icon: 'activity-outline',
  //       title: 'User Rating',
  //       link: '/dashboard/rating',
  //     },
  //   ]
  // },
  
];
 
  constructor(private storage: StorageService, private sidebarService: NbSidebarService,private router: Router,) { }

  ngOnInit(): void {
    this.setMenuItem();
  this.router.navigate(["dashboard/home"]);
  }

  setMenuItem() {
    const role = this.storage.getRole();
    if (role == 'MASTER_ADMIN' || role == 'ADMIN') {
      this.menu.push({
        title: 'Dashboard',
        icon: 'people-outline',
        link: '/dashboard/home',
      },
      {
        title: 'User Management',
        icon: 'people-outline',
        children: [
          {
            icon: "person-add-outline",
            title: 'Users',
            link: '/dashboard/user',
          },
        ]
      },
      {
        title: 'Massage Management',
        icon: 'settings-2-outline',
        children: [
          {
            icon: "options-outline",
            title: 'Massage Setting',
            link: '/dashboard/massageSetting',
          },
          {
            icon: 'activity-outline',
            title: 'User Rating',
            link: '/dashboard/rating',
          },
        ]
      },
      )
    }else if(role == 'DOCTOR'){
      this.menu.push({
        title: 'Dashboard',
        icon: 'people-outline',
        link: '/dashboard/home',
      },  {
        title: 'Massage Management',
        icon: 'settings-2-outline',
        children: [
          {
            icon: "options-outline",
            title: 'Massage Setting',
            link: '/dashboard/massageSetting',
          },
          {
            icon: 'activity-outline',
            title: 'User Rating',
            link: '/dashboard/rating',
          },
        ]
      },
      )
    }
  }

}
