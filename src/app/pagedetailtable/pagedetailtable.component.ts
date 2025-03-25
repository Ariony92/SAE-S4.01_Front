import { Component, OnInit } from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import { TableService } from '../services/tables.service'
import { CommonModule } from '@angular/common'
import { TupleTable, Insertions, nomColonne } from '../modeleTS/tabledetail'

@Component({
  selector: 'app-pagedetailtable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagedetailtable.component.html',
  styleUrl: './pagedetailtable.component.sass'
})
export class PageDetailTableComponent implements OnInit {
  nomTable: string = ''
  attributs: string[] = []
  donnees: TupleTable[] = []
  messageErreur: string = ""


  constructor(private route: ActivatedRoute, private tableService: TableService,  private router: Router) {}

  ngOnInit(): void {
    this.nomTable = this.route.snapshot.paramMap.get('nomTable') || ''
    if (!this.nomTable) {
      this.router.navigate(['/404'])
      return
    }

    this.tableService.contenueTable(this.nomTable).subscribe({
      next: (reponse: Insertions) => {
        this.attributs = Object.keys(reponse.data[0] || {})
        this.donnees = reponse.data
      },
      error: () => {
        this.messageErreur = "Erreur lors de la récupération des données"
      }
    })
  }

  supprimerInsertion(ligne: TupleTable): void {
    if (!confirm("Supprimer ?")) return

    let id = ligne[this.attributs[0]]
    this.tableService.supprimerDansTable(this.nomTable, String(id)).subscribe({
      next: () => {
        this.tableService.contenueTable(this.nomTable).subscribe({
          next: rep => this.donnees = rep.data,
          error: () => this.messageErreur = "Erreur chargement des données"
        })
      },
      error: () => {
        this.messageErreur = "Erreur suppression"
      }
    })
  }

  modifierInsertion(ligne: TupleTable): void {
    let id = ligne[this.attributs[0]]
    let copie = { ...ligne }

    for (let i = 0; i < this.attributs.length; i++) {
      let att = this.attributs[i]
      if (att !== this.attributs[0]) {
        let val = prompt("Modifier " + att, String(copie[att]))
        if (val !== null) copie[att] = val
      }
    }

    this.tableService.mettreAJourDansTable(this.nomTable, String(id), copie).subscribe({
      next: () => {
        this.tableService.contenueTable(this.nomTable).subscribe({
          next: rep => this.donnees = rep.data,
          error: () => this.messageErreur = "Erreur rechargement"
        })
      },
      error: () => {
        this.messageErreur = "Erreur modification"
      }
    })
  }


  supprimerAttribut(attribut: string) {
    this.tableService.supprimerDansTable(this.nomTable, attribut).subscribe({
      next: () => {
        this.tableService.contenueTable(this.nomTable).subscribe(rep => {
          this.attributs = Object.keys(rep.data[0] || {})
          this.donnees = rep.data
        })
      },
      error: () => {
        this.messageErreur = "Erreur suppression attribut"
      }
    })
  }





}
