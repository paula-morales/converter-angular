import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataQuery } from './models/dataQuery';
import { API_KEY } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  apiUrl: string = `https://freecurrencyapi.net/api/v2/latest?apikey=${API_KEY}`;

  constructor(private http: HttpClient) {}

  getRatesByBase(base: string): Observable<DataQuery> {
    return this.http.get<DataQuery>(`${this.apiUrl}&base_currency=${base}`);
  }
}
