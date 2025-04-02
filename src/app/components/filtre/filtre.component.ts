import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Insertions, TableAttribut, TupleTable } from '../../modeleTS/tabledetail';
import { TableService } from '../../services/tables.service';


@Component({
  selector: 'app-filtre',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filtre.component.html',
  styleUrl: './filtre.component.scss'
})
export class FiltreComponent {

  @Input({ required: true }) nomTable!: string;
  @Input({ required: true }) colonne!: string;
  @Input({ required: true }) types!: string;
  @Output() envoieDonnees = new EventEmitter<TupleTable[]>();

  attributs: TableAttribut[] = []
  donnees: TupleTable[] = []
  showForm = false; res = false;
  private readonly tableService = inject(TableService);

  formualire() {
    this.showForm = !this.showForm;  // Toggle pour afficher ou cacher le formulaire
  }

  onSubmit(form: NgForm){
    if (form.valid){
      console.log(form.value.recherche)
      this.tableService.recherche(this.nomTable, this.colonne, form.value.recherche).subscribe({
            next: (reponse: Insertions) => {
              this.envoieDonnees.emit(reponse.entry)
            }
      })
     
    }
  }
  
}
