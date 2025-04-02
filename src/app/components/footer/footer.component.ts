import { Component } from '@angular/core';
import {FooterNavComponent} from './footer-nav/footer-nav.component';

@Component({
  selector: 'app-footer',
  imports: [FooterNavComponent],
  templateUrl: './footer.component.html',
  standalone: true,
  styleUrl: './footer.component.sass'
})
export class FooterComponent {

}
