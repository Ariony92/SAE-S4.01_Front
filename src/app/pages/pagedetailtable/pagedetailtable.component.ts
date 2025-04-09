import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableService } from '../../services/tables.service';
import { FiltreComponent } from '../../components/filtre/filtre.component';
import { TableAttribut, TupleTable } from '../../modeleTS/tabledetail';
import {PaginationComponent} from '../../components/pagination/pagination.component';
import { ChangeService } from '../../services/changes.service';
import { InsertPageComponent } from '../insert-page/insert-page.component';


@Component({
  selector: 'app-pagedetailtable',
  standalone: true,
  imports: [CommonModule, FiltreComponent, PaginationComponent, InsertPageComponent],
  templateUrl: './pagedetailtable.component.html',
  styleUrl: './pagedetailtable.component.sass'
})

export class PageDetailTableComponent implements OnInit {
  nomTable: string = ''
  attributs: TableAttribut[] = []
  donnees: TupleTable[] = []
  messageErreur: string = ""
  clePrimaire = '';
  formulaireModification = false;
  formualireInsert = false;
  donneModifier: TupleTable = {};
  pagination: TupleTable[] = []
  pageActuelle: number = 1
  elementsParPage: number = 10


  constructor(private route: ActivatedRoute, private tableService: TableService, private changeService: ChangeService, private router: Router) {}

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


  supprimerLigne(ligne: TupleTable): void {
    if (!confirm("Supprimer ?")) return;

    let id = ligne[this.clePrimaire];
    this.changeService.supprimerDansTable(this.nomTable, String(id)).subscribe({
      next: () => this.ngOnInit(),
      error: () => this.messageErreur = "Erreur suppression ligne"
    });
  }

  modifierLigne(donne: TupleTable): void {
    this.formulaireModification = true;
    this.formualireInsert = false;
    this.donneModifier = donne
  }

  
  setPage(page: number): void {
    this.pageActuelle = page;
    let debut = (page - 1) * this.elementsParPage;
    let fin = debut + this.elementsParPage;
    this.pagination = this.donnees.slice(debut, fin);
  }

  resetPage(): void {
    this.tableService.contenueTable(this.nomTable).subscribe({
      next: (res) => {
        this.donnees = res.data;
        this.clePrimaire = res.primaryKey;
        this.setPage(1);
        this.chargerColonnes();
      },
      error: () => this.messageErreur = "Erreur lors du reset"
    });
  }

  formualireInsertion(): void {
    this.formualireInsert = true;
    this.formulaireModification = false;
  }

  removeFormualire(){
    this.formulaireModification = false;
    this.formualireInsert = false;
    this.ngOnInit();
  }

}
