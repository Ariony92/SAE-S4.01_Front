import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartes-titre-tables',
  imports: [],
  templateUrl: './cartes-titre-tables.component.html',
  standalone: true,
  styleUrl: './cartes-titre-tables.component.sass'
})
export class CartesTitreTablesComponent {
  constructor(
    private readonly router: Router
  ) {}

  @Input({required: true}) titre!: string;

  detail(){
    this.router.navigate(['table', this.titre]); 
  }
}
