import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from 'rxjs';
import {Insertions, TableAttribut, TupleTable} from '../modeleTS/tabledetail';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private readonly API_URL = 'http://localhost:5000';

  constructor(private readonly http: HttpClient) {}

  nomTables(): Observable<{ tables: string[] }> {
    return this.http.get<{ tables: string[] }>(`${this.API_URL}/tables`);
  }

  contenueTable(nomTable: string): Observable<{ data: TupleTable[], primaryKey: string }> {
    return this.http.get<{ data: TupleTable[], primaryKey: string }>(`${this.API_URL}/tables/${nomTable}`);
  }

  colonnesTable(nomTable: string): Observable<{ nom: string; types: string }[]> {
    return this.http.get<{ columns: [string, string][] }>(
      `${this.API_URL}/tables/${nomTable}/columns`
    ).pipe(
      map(response => response.columns.map(col => ({ nom: col[0], types: col[1] })))
    );
  }

  recherche(nomTable: string, columns: string, recherche:string): Observable<Insertions> {
    return this.http.get<Insertions>(`${this.API_URL}/tables/${nomTable}/${columns}/${recherche}`)
  }

  rechercheDate(nomTable: string, columns: string, minDate: Date, maxDate: Date){
    return this.http.get<Insertions>(`${this.API_URL}/tables/${nomTable}/${columns}/${minDate}/${maxDate}`)
  }

  obtenirValeursEtrangeres(colonne: string): Observable<{ id: string; label: string }[]> {
    return this.http.get<{ id: string; label: string }[]>(`${this.API_URL}/tables/foreign_values/${colonne}`);
  }

  initialiserDepuisScript(sql: string) {
    return this.http.post<{ message: string }>(`${this.API_URL}/changes/init_sql`, { sql });
  }
}
