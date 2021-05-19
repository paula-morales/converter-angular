import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ExchangeRate } from './models/exchangeRate';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  apiUrl: string =
    'https://api.exchangeratesapi.io/v1/latest?access_key=399965e0b37f7fffcf90f4940ce11448';

  constructor(private http: HttpClient) {}

  getRatesByBase(base: string): Observable<ExchangeRate> {
    return this.http.get<ExchangeRate>(`${this.apiUrl}&base=${base}`);
  }

  getRates(): Observable<ExchangeRate> {
    return this.http.get<ExchangeRate>(this.apiUrl);
  }
}
