import { Component } from '@angular/core';
import {NavComponent} from './nav/nav.component';

@Component({
  selector: 'app-header',
  imports: [NavComponent],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.sass'
})
export class HeaderComponent {
  menuOuvert = false;
  toggleMenu() {
    this.menuOuvert = !this.menuOuvert;
  }

}
