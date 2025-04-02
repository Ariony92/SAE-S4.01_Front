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
  clePrimaire = '';

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
      this.tableService.attributsTable(this.nomTable).subscribe({
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
        },
        error: () => {
          this.messageErreur = "Erreur lors de la récupération des données";
        }
      });
    }
  }

  updateDonnees(data: TupleTable[]) {
    this.donnees = data;
  }

  supprimerColonne(nom: string): void {
    const confirmation = confirm(`Voulez-vous vraiment supprimer la colonne "${nom}" ?`);
    if (!confirmation) return;
    this.tableService.supprimerAttribut(this.nomTable, nom).subscribe({
      next: () => this.chargerattributs(),
      error: () => this.messageErreur = "Erreur suppression colonne"
    });
  }


  supprimerLigne(ligne: TupleTable): void {
    if (!confirm("Supprimer ?")) return;

    let id = ligne[this.clePrimaire];
    this.tableService.supprimerDansTable(this.nomTable, String(id)).subscribe({
      next: () => this.ngOnInit(),
      error: () => this.messageErreur = "Erreur suppression ligne"
    });
  }

  modifierLigne(ligne: TupleTable): void {
    let id = ligne[this.clePrimaire];
    let maj: any = {};

    for (let i = 0; i < this.attributs.length; i++) {
      let col = this.attributs[i];

      if (col.nom === this.clePrimaire) continue;

      let valeurActuelle = ligne[col.nom];
      let nouvelleValeur = prompt("Modifier " + col, String(valeurActuelle));

      if (nouvelleValeur !== null && nouvelleValeur !== String(valeurActuelle)) {
        maj[col.nom] = nouvelleValeur;
      }
    }

    if (Object.keys(maj).length === 0) return;

    this.tableService.mettreAJourDansTable(this.nomTable, String(id), maj).subscribe({
      next: () => this.ngOnInit(),
      error: () => this.messageErreur = "Erreur modification ligne"
    });
  }
}
