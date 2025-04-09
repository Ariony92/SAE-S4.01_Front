import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PageDetailTableComponent } from './pages/pagedetailtable/pagedetailtable.component';
import { Page404Component } from './pages/page404/page404.component';
import { FormulaireDonneeComponent } from './components/formulaire-donnee/formulaire-donnee.component';
import { ImportDonneesComponent } from './pages/import-donnees/import-donnees.component';


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
    component: FormulaireDonneeComponent
  },  
  {
    path: 'import',
    component: ImportDonneesComponent
  }, 
  {
    path: '**',
    redirectTo: '404',
  }
];
