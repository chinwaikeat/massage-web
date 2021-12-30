import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../services/storageService/storage.service';
import { NbComponentStatus, NbDialogService, NbSidebarService, NbToastrService, NbMenuService } from "@nebular/theme";


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
  menu: any = [{
    title: 'Dashboard',
    icon: 'grid-outline',
    link: '/dashboard/home',
  },];
  constructor(private storage: StorageService, private sidebarService: NbSidebarService,) { }

  ngOnInit(): void {
    this.setMenuItem();
  }

  setMenuItem() {
    const role = this.storage.getRole();
    if (role == 'MASTER ADMIN' || role == 'ADMIN') {
      this.menu.push({
        title: 'Dashboard',
        icon: 'grid-outline',
        link: '/dashboard/home',
      },
      {
        title: 'Users Management',
        icon: 'people-outline',
        link: '/dashboard/user',
      },
      {
        title: 'Student Management',
        icon: 'people-outline',
        link: '/dashboard/student',
      },
      )
    }else if(role == 'NORMAL'){
      this.menu.push({
        title: 'Dashboard',
        icon: 'grid-outline',
        link: '/dashboard/home',
      },)
    }
  }

}
