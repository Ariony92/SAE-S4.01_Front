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
    }

    this.tableService.colonnesTable(this.nomTable).subscribe({
      next: (tuple: nomColonne) => {
        this.attributs = tuple.columns;
      },
      error: () => {
        this.messageErreur = "Erreur récuperation données"
      }
    })

    this.tableService.contenueTable(this.nomTable).subscribe({
      next: (insertions: Insertions) => {
        this.donnees = insertions.data;

        if (this.attributs.length > 0) {
          const cle = this.attributs[0]

          this.donnees.sort((a, b) => {
            const valeurA = a[cle]
            const valeurB = b[cle]

            const nombreA = parseInt(String(valeurA).match(/\d+/)?.[0] || '0', 10)
            const nombreB = parseInt(String(valeurB).match(/\d+/)?.[0] || '0', 10)

            return nombreA - nombreB
          })
        }
      },
    })
  }

  supprimerAttribut(attribut: string): void {
    //supprimer attribut
  }

  SupprimerInsertion(id: TupleTable): void {
    //metthode dans le back qui supprime l'insertion avec id
  }

}
