import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./views/pages.module')
      .then(m => m.PagesModule),
  },
 
  { path: '', redirectTo: 'pages/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes /*, { useHash: true }*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
