import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ExchangeRate } from './models/exchangeRate';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  apiUrl: string = 'https://api.ratesapi.io/api/latest';

  constructor(private http: HttpClient) {}

  getRates(base: string): Observable<ExchangeRate> {
    return this.http.get<ExchangeRate>(`${this.apiUrl}?base=${base}`);
  }
}
