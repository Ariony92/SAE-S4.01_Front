import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import {Insertions, TupleTable} from '../modeleTS/tabledetail';

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

  colonnesTable(nomTable: string): Observable<{ columns: string[] }> {
    return this.http.get<{ columns: string[] }>(`${this.API_URL}/tables/${nomTable}/columns`);
  }

  supprimerDansTable(nomTable: string, id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/tables/${nomTable}/${id}`);
  }

  mettreAJourDansTable(nomTable: string, id: string, donneeMAJ: any): Observable<any> {
    return this.http.put(`${this.API_URL}/tables/${nomTable}/${id}`, donneeMAJ);
  }

  supprimerAttribut(nomTable: string, attribut: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/tables/${nomTable}/columns/${attribut}`);
  }

  modifierAttribut(nomTable: string, ancienNom: string, nouveauNom: string): Observable<any> {
    return this.http.put(`${this.API_URL}/tables/${nomTable}/columns/${ancienNom}`, {
      nv_attribut_nom: nouveauNom
    });
  }
}
