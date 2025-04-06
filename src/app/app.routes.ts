import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PageDetailTableComponent } from './pages/pagedetailtable/pagedetailtable.component';
import { Page404Component } from './pages/page404/page404.component';
import { FormulaireInsertionComponent } from './pages/formulaire-insertion/formulaire-insertion.component';

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
    path: 'insertion',
    component: FormulaireInsertionComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  }
];
