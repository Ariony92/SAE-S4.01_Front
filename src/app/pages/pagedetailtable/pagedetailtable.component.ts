import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableService } from '../../services/tables.service';
import { FiltreComponent } from '../../components/filtre/filtre.component';
import { TableAttribut, TupleTable } from '../../modeleTS/tabledetail';
import {PaginationComponent} from '../../components/pagination/pagination.component';


@Component({
  selector: 'app-pagedetailtable',
  standalone: true,
  imports: [CommonModule, FiltreComponent, PaginationComponent],
  templateUrl: './pagedetailtable.component.html',
  styleUrl: './pagedetailtable.component.sass'
})

export class PageDetailTableComponent implements OnInit {
  nomTable: string = ''
  attributs: TableAttribut[] = []
  donnees: TupleTable[] = []
  messageErreur: string = ""
  clePrimaire = '';

  pagination: TupleTable[] = []
  pageActuelle: number = 1
  elementsParPage: number = 10


  constructor(private route: ActivatedRoute, private tableService: TableService, private router: Router) {}

  ngOnInit(): void {
    this.nomTable = this.route.snapshot.paramMap.get('nomTable') || '';
    if (!this.nomTable) {
      this.router.navigate(['/404']);
      return;
    }

    this.tableService.contenueTable(this.nomTable).subscribe({
      next: (res) => {
        this.donnees = res.data;
        this.clePrimaire = res.primaryKey;
        this.setPage(1);
        this.chargerColonnes();
      },
      error: () => this.messageErreur = "Erreur chargement des données"
    });
  }

  chargerColonnes(): void {
    this.tableService.colonnesTable(this.nomTable).subscribe({
      next: (res) => this.attributs = res,
      error: () => this.messageErreur = "Erreur chargement des colonnes"
    });
  }


  updateDonnees(data: TupleTable[]) {
    this.donnees = data;
    this.setPage(this.pageActuelle)
  }

  supprimerColonne(nom: string): void {
    if (!confirm('Voulez-vous vraiment supprimer la colonne "' + nom + '" ?')) return;

    this.tableService.supprimerAttribut(this.nomTable, nom).subscribe({
      next: () => {
        this.chargerColonnes();
      },
      error: () => {
        this.messageErreur = 'Erreur suppression colonne';
      }
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
    let maj: TupleTable = {};

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


  setPage(page: number): void {
    this.pageActuelle = page;
    let debut = (page - 1) * this.elementsParPage;
    let fin = debut + this.elementsParPage;
    this.pagination = this.donnees.slice(debut, fin);
  }

  resetPage(){
    window.location.reload();
  }

}
