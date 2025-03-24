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

    this.tableService.colonnesTable(this.nomTable).subscribe({
      next: (reponse: nomColonne) => {
        this.attributs = reponse.columns
      },
      error: () => {
        this.messageErreur = "Erreur lors de la récupération des attributs"
      }
    })
    this.tableService.contenueTable(this.nomTable).subscribe({
      next: (reponse: Insertions) => {
        this.donnees = reponse.data
      },
      error: () => {
        this.messageErreur = "Erreur lors de la récupération des données"
      }
    })
  }

  supprimerAttribut(attribut: string): void {
    //supprimer attribut
  }

  SupprimerInsertion(id: TupleTable): void {
    //metthode dans le back qui supprime l'insertion avec id
  }



}
