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

  isLoading: boolean;
  errorMessage: string;

  constructor(private homepageService: HomepageService) {}

  ngOnInit(): void {
    this.getRates();
  }

  getRates() {
    this.isLoading = true;
    this.homepageService.getRates().subscribe(
      (exchangeRate: ExchangeRate) => {
        console.log('exchange rate is ', exchangeRate);
        this.exchangeRate = exchangeRate;
        this.getAllCurrencies();
        this.initializeValues();
        this.stopLoading();
      },
      (error) => this.setError()
    );
  }

  getRatesByBase() {
    this.isLoading = true;
    this.homepageService.getRatesByBase(this.sourceCurrency).subscribe(
      (exchangeRate: ExchangeRate) => {
        console.log('new exchange rate is ', exchangeRate);
        this.exchangeRate = exchangeRate;
        this.getAllCurrencies();
        this.calculateTargetAmount();
        this.stopLoading();
      },
      (error) => this.setError()
    );
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
    this.sourceCurrency = currencySelected;
    console.log('new currency source', currencySelected);
    this.getRatesByBase();
  }

  updateTargetCurrency(currencySelected: string) {
    console.log('new currency target', currencySelected);
    this.targetCurrency = currencySelected;
    this.calculateTargetAmount();
  }

  updateSourceAmount(newSourceAmount: number) {
    console.log('new source amount ', newSourceAmount);
    this.sourceAmount = newSourceAmount;
    this.calculateTargetAmount();
  }

  calculateSourceAmount() {
    this.sourceAmount =
      this.targetAmount / this.exchangeRate.rates[this.targetCurrency];
  }

  updateTargetAmount(newTargetAmount: number) {
    console.log('new Target amount ', newTargetAmount);
    this.targetAmount = newTargetAmount;
    this.calculateSourceAmount();
  }

  stopLoading() {
    this.isLoading = false;
    this.errorMessage = '';
  }

  setError() {
    this.isLoading = false;
    this.errorMessage = 'Something went wrong';
  }
}
