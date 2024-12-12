import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
  },
  {
    path: 'pages/my-offers',
    loadChildren: () =>
      import('./pages/my-offers/my-offers.module').then(
        (m) => m.MyOffersPageModule
      ),
  },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () =>
  //     import('./folder/folder.module').then((m) => m.FolderPageModule),
  // },
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
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
