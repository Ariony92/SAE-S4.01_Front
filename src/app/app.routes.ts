import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PageDetailTableComponent } from './pages/pagedetailtable/pagedetailtable.component';
import { Page404Component } from './pages/page404/page404.component';
import { FormulaireDonneeComponent } from './components/formulaire-donnee/formulaire-donnee.component';
import { ImportDonneesComponent } from './pages/import-donnees/import-donnees.component';
import {AProposComponent} from './pages/pages-footer/a-propos/a-propos.component';
import {InstructionsComponent} from './pages/pages-footer/instructions/instructions.component';
import {ContactSupportComponent} from './pages/pages-footer/contact-support/contact-support.component';
import {NosDifficultesComponent} from './pages/pages-footer/nos-difficultes/nos-difficultes.component';
import {NosExploitsComponent} from './pages/pages-footer/nos-exploits/nos-exploits.component';
import {NotrehistoireComponent} from './pages/pages-footer/notrehistoire/notrehistoire.component';


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
    path: 'notre-histoire',
    component: NotrehistoireComponent
  },
  {
    path: 'nos-exploits',
    component: NosExploitsComponent
  },
  {
    path: 'nos-difficultes',
    component: NosDifficultesComponent
  },
  {
    path: 'contact-support',
    component: ContactSupportComponent
  },
  {
    path: 'instructions',
    component: InstructionsComponent
  },
  {
    path: 'a-propos',
    component: AProposComponent
  },
  {
    path: '**',
    redirectTo: '404',
  }
];
