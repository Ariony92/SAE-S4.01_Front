import { Component } from '@angular/core';
import {FooterSection} from '../../../modeleTS/footerSection';

@Component({
  selector: 'app-footer-nav',
  imports: [],
  templateUrl: './footer-nav.component.html',
  standalone: true,
  styleUrl: './footer-nav.component.sass'
})
export class FooterNavComponent {
  footerSections: FooterSection[] = [
    {
      title: 'Contact',
      links: ['Twitter', 'Email', 'Instagram']
    },
    {
      title: 'À propos de nous',
      links: ['Notre histoire', 'Nos exploits', 'Nos difficultées']
    },
    {
      title: 'Aide',
      links: ['Contact support', 'Instructions', 'A propos de nous']
    }
  ];
}
