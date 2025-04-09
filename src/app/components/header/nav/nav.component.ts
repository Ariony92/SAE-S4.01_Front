import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.sass'
})
export class NavComponent {
  nav: Array<string> = ["Accueil", "Importation"];
  pagePrincipale: string = "Home";

  setActiveTab(tab: string): void {
    this.pagePrincipale = tab;
  }

  getonglet(element: string): string {
    if (element === this.pagePrincipale) {
      return 'home-link';
    }
    return '';
  }

  tabactive(element: string): boolean {
    return element === this.pagePrincipale;
  }


  getRoute(element: string): string {
    switch (element) {
      case "Accueil":
        return "/home";
      case "Importation":
        return "/import";
      default:
        return "/home"
        //ajout d'autre route si besoin
    }
  }
}
