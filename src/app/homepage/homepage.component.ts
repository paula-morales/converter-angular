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
    if (this.rateExists()) {
      const newTargetAmount =
        this.sourceAmount * this.exchangeRate.rates[this.targetCurrency];
      this.targetAmount = this.setFourDecimalPlaces(newTargetAmount);
    } else if (this.targetCurrency == this.sourceCurrency) {
      this.targetAmount = this.sourceAmount;
    } else {
      this.errorMessage = 'Something went wrong';
    }
  }

  rateExists(): boolean {
    return this.exchangeRate.rates[this.targetCurrency];
  }

  setFourDecimalPlaces(amount: number) {
    return Number(amount.toFixed(4));
  }

  updateSourceCurrency(currencySelected: string) {
    this.sourceCurrency = currencySelected;
    this.getRatesByBase();
  }

  updateTargetCurrency(currencySelected: string) {
    this.targetCurrency = currencySelected;
    this.calculateTargetAmount();
  }

  updateSourceAmount(newSourceAmount: number) {
    this.sourceAmount = newSourceAmount;
    this.calculateTargetAmount();
  }

  calculateSourceAmount() {
    if (this.rateExists()) {
      const newSourceAmount =
        this.targetAmount / this.exchangeRate.rates[this.targetCurrency];
      this.sourceAmount = this.setFourDecimalPlaces(newSourceAmount);
    } else if (this.targetCurrency == this.sourceCurrency) {
      this.sourceAmount = this.targetAmount;
    } else {
      this.errorMessage = 'Something went wrong';
    }
  }

  updateTargetAmount(newTargetAmount: number) {
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
