import { Routes } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {Page404Component} from './page404/page404.component';
import {PageDetailTableComponent} from './pagedetailtable/pagedetailtable.component';

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
    path: '**',
    redirectTo: '404',
  }
];
