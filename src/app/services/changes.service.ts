import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangeService {
  private readonly API_URL = 'http://localhost:5000';

  constructor(private readonly http: HttpClient) {}

  supprimerDansTable(nomTable: string, id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/changes/${nomTable}/${id}`);
  }

  mettreAJourDansTable(nomTable: string, id: string, donneeMAJ: any): Observable<any> {
    return this.http.put(`${this.API_URL}/changes/${nomTable}/${id}`, donneeMAJ);
  }

  insererDansTable(nomTable: string, donnee: object): Observable<object> {
    return this.http.post(`${this.API_URL}/changes/${nomTable}`, donnee);
  } 
}