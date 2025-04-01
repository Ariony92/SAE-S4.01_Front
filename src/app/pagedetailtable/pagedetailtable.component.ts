import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from '../services/tables.service';
import { CommonModule } from '@angular/common';
import { TupleTable, Insertions, nomColonne, TableAttribut } from '../modeleTS/tabledetail';
import { FiltreComponent } from '../filtre/filtre.component';

@Component({
  selector: 'app-pagedetailtable',
  standalone: true,
  imports: [CommonModule, FiltreComponent],
  templateUrl: './pagedetailtable.component.html',
  styleUrl: './pagedetailtable.component.sass'
})
export class PageDetailTableComponent implements OnInit {
  nomTable: string = ''
  attributs: TableAttribut[] = []
  donnees: TupleTable[] = []
  messageErreur: string = ""

  constructor(
    private route: ActivatedRoute, 
    private tableService: TableService,  
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nomTable = this.route.snapshot.paramMap.get('nomTable') || '';
    if (!this.nomTable) {
      this.router.navigate(['/404']);
      return;
    }

    
    if (!this.attributs || this.attributs.length === 0) {
      this.tableService.colonnesTable(this.nomTable).subscribe({
        next: (reponse: TableAttribut[]) => {
          
          this.attributs = reponse; 
        },
        error: () => {
          this.messageErreur = "Erreur lors de la récupération des attributs";
        }
      });
    }

    
    if (!this.donnees || this.donnees.length === 0) {
      this.tableService.contenueTable(this.nomTable).subscribe({
        next: (reponse: Insertions) => {
          this.donnees = reponse.data;
          console.log("Init:", reponse.data);
        },
        error: () => {
          this.messageErreur = "Erreur lors de la récupération des données";
        }
      });
    }
  }

  updateDonnees(data: TupleTable[]) {
    console.log("Événement reçu avec les nouvelles données:", data);
    this.donnees = data;
  }

  supprimerAttribut(attribut: string): void {
    //supprimer attribut
  }

  SupprimerInsertion(id: TupleTable): void {
    // méthode dans le back qui supprime l'insertion avec id
  }
}
