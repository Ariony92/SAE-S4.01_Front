import { Component, OnInit } from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import { TableService } from '../services/tables.service'
import { TupleTable} from '../modeleTS/tabledetail'

@Component({
  selector: 'app-pagedetailtable',
  standalone: true,
  imports: [],
  templateUrl: './pagedetailtable.component.html',
  styleUrl: './pagedetailtable.component.sass'
})

export class PageDetailTableComponent implements OnInit {
  nomTable = '';
  colonnes: string[] = [];
  lignes: TupleTable[] = [];
  clePrimaire = '';
  messageErreur = '';

  constructor(private route: ActivatedRoute, private tableService: TableService, private router: Router) {}

  ngOnInit(): void {
    this.nomTable = this.route.snapshot.paramMap.get('nomTable') || '';
    if (!this.nomTable) {
      this.router.navigate(['/404']);
      return;
    }

    this.tableService.contenueTable(this.nomTable).subscribe({
      next: (res) => {
        this.lignes = res.data;
        this.clePrimaire = res.primaryKey;
        this.chargerColonnes();
      },
      error: () => this.messageErreur = "Erreur chargement des données"
    });
  }

  chargerColonnes(): void {
    this.tableService.colonnesTable(this.nomTable).subscribe({
      next: (res) => this.colonnes = res.columns,
      error: () => this.messageErreur = "Erreur chargement des colonnes"
    });
  }

  supprimerColonne(nom: string): void {
    const confirmation = confirm(`Voulez-vous vraiment supprimer la colonne "${nom}" ?`);
    if (!confirmation) return;
    this.tableService.supprimerAttribut(this.nomTable, nom).subscribe({
      next: () => this.chargerColonnes(),
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

    for (let i = 0; i < this.colonnes.length; i++) {
      let col = this.colonnes[i];

      if (col === this.clePrimaire) continue;

      let valeurActuelle = ligne[col];
      let nouvelleValeur = prompt("Modifier " + col, String(valeurActuelle));

      if (nouvelleValeur !== null && nouvelleValeur !== String(valeurActuelle)) {
        maj[col] = nouvelleValeur;
      }
    }

    if (Object.keys(maj).length === 0) return;

    this.tableService.mettreAJourDansTable(this.nomTable, String(id), maj).subscribe({
      next: () => this.ngOnInit(),
      error: () => this.messageErreur = "Erreur modification ligne"
    });
  }
}
