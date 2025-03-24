import { Component } from '@angular/core';
import {FooterSection} from '../../modeleTS/footerSection';

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
      links: [
        { nom: 'Twitter', url: 'https://twitter.com' },
        { nom: 'Email', url: 'mailto:contact@example.com' },
        { nom: 'Instagram', url: 'https://instagram.com' }
      ]
    },
    {
      title: 'À propos de nous',
      links: [
        { nom: 'Notre histoire', url: '/notre-histoire' },
        { nom: 'Nos exploits', url: '/nos-exploits' },
        { nom: 'Nos difficultées', url: '/nos-difficultes' }
      ]
    },
    {
      title: 'Aide',
      links: [
        { nom: 'Contact support', url: '/contact-support' },
        { nom: 'Instructions', url: '/instructions' },
        { nom: 'À propos de nous', url: '/a-propos' }
      ]
    }
  ];
}
