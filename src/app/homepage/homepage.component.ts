import { Component, OnInit } from '@angular/core';
import { HomepageService } from './homepage.service';
import { ExchangeRate } from './models/exchangeRate';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  sourceCurrency: string;
  targetCurrency: string;
  exchangeRate: ExchangeRate;
  sourceAmount: number;
  targetAmount: number;
  allCurrencies: string[];

  constructor(private homepageService: HomepageService) {}

  ngOnInit(): void {
    this.getRates();
  }

  getRates() {
    this.homepageService.getRates().subscribe((exchangeRate: ExchangeRate) => {
      console.log('exchange rate is ', exchangeRate);
      this.exchangeRate = exchangeRate;
      this.getAllCurrencies();
      this.initializeValues();
    });
  }

  getAllCurrencies() {
    this.allCurrencies = Object.keys(this.exchangeRate.rates).sort((a, b) =>
      a.localeCompare(b)
    );
  }

  initializeValues() {
    this.sourceCurrency = this.exchangeRate.base;
    this.sourceAmount = 1;
    this.targetCurrency = this.allCurrencies[0];
    this.calculateTargetAmount();
  }

  calculateTargetAmount() {
    this.targetAmount =
      this.sourceAmount * this.exchangeRate.rates[this.targetCurrency];
  }

  updateSourceCurrency(currencySelected: string) {
    console.log('new currency source', currencySelected);
  }

  updateTargetCurrency(currencySelected: string) {
    console.log('new currency target', currencySelected);
  }

  updateSourceAmount(newSourceAmount: number) {
    console.log('new source amount ', newSourceAmount);
  }

  updateTargetAmount(newTargetAmount: number) {
    console.log('new Target amount ', newTargetAmount);
  }
}
