import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PageDetailTableComponent } from './pages/pagedetailtable/pagedetailtable.component';
import { Page404Component } from './pages/page404/page404.component';
import { InsertPageComponent } from './pages/insert-page/insert-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: 'table/:nomTable',
    component: PageDetailTableComponent,
  },
  {
    path: '404',
    component: Page404Component,
  },
  {
    path: 'insert/:nomTable',
    component: InsertPageComponent
  },  
  {
    path: '**',
    redirectTo: '404',
  }
];
