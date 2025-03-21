import { Routes } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';

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
    path: '**',
    redirectTo: '404',
  },
  {
    path: 'table/:nomTable',
    //component:
  }
]
