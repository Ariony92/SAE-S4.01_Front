import { Component, inject, OnInit } from '@angular/core';
import { TableService } from '../services/tables.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CartesTitreTablesComponent } from '../cartes-titre-tables/cartes-titre-tables.component';
import {AsyncPipe} from '@angular/common';


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
