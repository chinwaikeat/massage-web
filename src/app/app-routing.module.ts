import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pageModules/login.module')
      .then(m => m.LoginModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pageModules/dashboard.module')
      .then(m => m.DashboardModule),
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes /*, { useHash: true }*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
