import { Component } from '@angular/core';
import {FooterSection} from '../../../modeleTS/footerSection';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer-nav',
  imports: [RouterModule],
  templateUrl: './footer-nav.component.html',
  standalone: true,
  styleUrl: './footer-nav.component.sass'
})
export class FooterNavComponent {
  footerSections: FooterSection[] = [
    {
      title: 'Contact',
      links: [
        { nom: 'Twitter', url: 'https://x.com/elonmuskADO/status/1906524803122495905' },
        { nom: 'Email', url: 'https://mail.google.com' },
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
        { nom: 'FAQ', url: '/instructions' },
        { nom: 'À propos du site', url: '/a-propos' }
      ]
    }
  ];
  estLienInterne(url: string): boolean {
    return !url.startsWith('http');
  }

}
