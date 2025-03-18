import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-cartes-titre-tables',
  imports: [CommonModule],
  templateUrl: './cartes-titre-tables.component.html',
  styleUrl: './cartes-titre-tables.component.css'
})
export class CartesTitreTablesComponent {
  @Input({required: true}) titre!: string;
}
