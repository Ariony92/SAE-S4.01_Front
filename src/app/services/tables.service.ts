import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, tap } from 'rxjs';



  @Injectable({
    providedIn: 'root',
  })

  export class TableService {
    private readonly API_URL = 'http://localhost:5000';
    constructor(private readonly http: HttpClient) {}

    nomTables(): Observable<{ tables: [string[], number] }> {
        return this.http.get<{ tables: [string[], number] }>(this.API_URL + '/tables');
    }

    contenueTable(nomTable : string): Observable<{ tables: [Array<any>, number] }> { // Array<any> car une table renvoie des valeur de diffrent type a chaque fois 
      return this.http.get<{ tables: [string[], number] }>(this.API_URL + '/tables');
    }
      

  }