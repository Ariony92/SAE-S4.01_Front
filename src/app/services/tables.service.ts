import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from 'rxjs';
import {Insertions} from '../modeleTS/tabledetail';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private readonly API_URL = 'http://localhost:5000';

  constructor(private readonly http: HttpClient) {}

  nomTables(): Observable<{ tables: string[] }> {
    return this.http.get<{ tables: string[] }>(`${this.API_URL}/tables`);
  }

  contenueTable(nomTable: string): Observable<Insertions> {
    return this.http.get<Insertions>(`${this.API_URL}/tables/${nomTable}`)
  }

  insererDansTable(nomTable: string, donnee: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/tables/${nomTable}`, donnee);
  }

  supprimerDansTable(nomTable: string, id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/tables/${nomTable}/${id}`);
  }

  mettreAJourDansTable(nomTable: string, id: string, donneeMAJ: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/tables/${nomTable}/${id}`, donneeMAJ);
  }

  colonnesTable(nomTable: string): Observable<{ nom: string; type: string }[]> {
    return this.http.get<{ columns: [string, string][] }>(
      `${this.API_URL}/tables/${nomTable}/columns`
    ).pipe(
      map(response => response.columns.map(col => ({ nom: col[0], type: col[1] })))
    );
  }

  recherche(nomTable: string, columns: string, recherche:string): Observable<Insertions> {
    return this.http.get<Insertions>(`${this.API_URL}/tables/${nomTable}/${columns}/${recherche}`)
  }
  

}
