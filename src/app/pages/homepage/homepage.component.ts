import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import {AsyncPipe} from '@angular/common';
import { CartesTitreTablesComponent } from '../../components/cartes-titre-tables/cartes-titre-tables.component';
import { TableService } from '../../services/tables.service';


@Component({
  selector: 'app-homepage',
  imports: [CartesTitreTablesComponent, AsyncPipe],
  templateUrl: './homepage.component.html',
  standalone: true,
  styleUrl: './homepage.component.sass'
})
export class HomepageComponent implements OnInit{

  private readonly tableService = inject(TableService);
  titresTables: Observable<string[]> = new BehaviorSubject<string[]>([]);

  ngOnInit(): void {
    this.titresTables = this.tableService.nomTables().pipe(
      map(response => response.tables)
    );
  }

}
