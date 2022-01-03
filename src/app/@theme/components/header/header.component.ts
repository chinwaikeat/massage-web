import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService,NbComponentStatus,NbToastrService } from '@nebular/theme';
import { filter } from 'rxjs/operators';
import { LayoutService } from '../../../services/layoutService/layout.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storageService/storage.service';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private toastr: NbToastrService,
              private router: Router,
              private storage: StorageService) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.user = this.storage.getUserName();
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

      this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {

        if (title == 'Log out') {
          this.storage.clear();
          localStorage.clear();
          this.router.navigate(['/']);

        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  showToast(status: NbComponentStatus, message: string) {
    this.toastr.show(status, message, { status });
  }
}
