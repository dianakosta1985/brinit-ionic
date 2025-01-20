import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loader',
    pathMatch: 'full',
  },
  {
    path: 'pages/my-requests',
    loadChildren: () =>
      import('./pages/my-requests/my-requests.module').then(
        (m) => m.MyRequestsPageModule
      ),
    //canLoad: [AuthGuard], // return it back when the current user logic will be completed
  },
  {
    path: 'pages/my-offers',
    loadChildren: () =>
      import('./pages/my-offers/my-offers.module').then(
        (m) => m.MyOffersPageModule
      ),
    //canLoad: [AuthGuard], // return it back when the current user logic will be completed
  },
  {
    path: 'loader',
    loadChildren: () =>
      import('./pages/loader/loader.module').then((m) => m.LoaderPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'create-request',
    loadChildren: () =>
      import('./pages/create-request/create-request.module').then(
        (m) => m.CreateRequestPageModule
      ),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
