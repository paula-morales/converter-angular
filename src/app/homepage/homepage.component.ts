import { Component, OnInit } from '@angular/core';
import { HomepageService } from './homepage.service';
import { ExchangeRate } from './models/exchangeRate';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  sourceCurrency: string = 'EUR';
  targetCurrency: string = 'USD';

  constructor(private homepageService: HomepageService) {}

  ngOnInit(): void {
    this.getRates();
  }

  getRates() {
    this.homepageService
      .getRates(this.sourceCurrency)
      .subscribe((exchangeRate: ExchangeRate) => {
        console.log(exchangeRate);
      });
  }
}
