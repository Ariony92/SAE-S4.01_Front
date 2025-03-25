import { Component, inject, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TableService } from '../services/tables.service';
import { PageDetailTableComponent } from '../pagedetailtable/pagedetailtable.component';
import { Insertions, TableAttribut, TupleTable } from '../modeleTS/tabledetail';

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
  

  
  attributs: TableAttribut[] = []
  donnees: TupleTable[] = []
  showForm = false; res = false;
  private readonly tableService = inject(TableService);

  formualire() {
    this.showForm = !this.showForm;  // Toggle pour afficher ou cacher le formulaire
  }
  
  onSubmit(form: NgForm){
    if (form.valid){
      this.tableService.recherche(this.nomTable, this.colonne, form.value).subscribe({
            next: (reponse: Insertions) => {
              this.donnees = reponse.data
            }
      })
      this.tableService.colonnesTable(this.nomTable).subscribe({
        next: (reponse: TableAttribut[]) => {
          this.attributs = reponse; 
        }
      });
    }
  }
    
}
