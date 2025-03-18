import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-cartes-titre-tables',
  imports: [],
  templateUrl: './cartes-titre-tables.component.html',
  standalone: true,
  styleUrl: './cartes-titre-tables.component.sass'
})
export class CartesTitreTablesComponent {
  @Input({required: true}) titre!: string;
}
