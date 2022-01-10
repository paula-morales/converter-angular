import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HomepageService } from './homepage.service';
import { ExchangeRate } from './models/ExchangeRate';
import { DataQuery } from './models/dataQuery';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [
    trigger('fadeIn', [
      transition('*=>*', [
        style({ opacity: 0.7, fontSize: '110%' }),
        animate(500),
      ]),
    ]),
  ],
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
    this.initValues();
    this.getRates();
  }

  initValues() {
    this.sourceCurrency = 'USD';
    this.sourceAmount = 1;
    this.targetCurrency = 'EUR';
  }

  getRates() {
    this.isLoading = true;
    this.homepageService.getRatesByBase(this.sourceCurrency).subscribe(
      (dataQuery: DataQuery) => {
        this.exchangeRate = dataQuery.data;

        //the source currency is not included in response of API so we add it
        this.exchangeRate[this.sourceCurrency] = 1;

        if (!this.allCurrencies) this.getAllCurrencies();
        this.calculateTargetAmount();
        this.stopLoading();
      },
      () => this.setErrorStatus()
    );
  }

  getAllCurrencies() {
    this.allCurrencies = Object.keys(this.exchangeRate).sort((a, b) =>
      a.localeCompare(b)
    );
  }

  calculateTargetAmount() {
    if (this.rateExists()) {
      const newTargetAmount =
        this.sourceAmount * this.exchangeRate[this.targetCurrency];
      this.targetAmount = this.setFourDecimalPlaces(newTargetAmount);
      this.setErrorMessage(false);
    } else {
      this.setErrorMessage(true);
    }
  }

  rateExists() {
    return this.exchangeRate[this.targetCurrency];
  }

  setFourDecimalPlaces(amount: number) {
    return Number(amount.toFixed(4));
  }

  updateSourceCurrency(currencySelected: string) {
    this.sourceCurrency = currencySelected;
    this.getRates();
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
        this.targetAmount / this.exchangeRate[this.targetCurrency];
      this.sourceAmount = this.setFourDecimalPlaces(newSourceAmount);
      this.setErrorMessage(false);
    } else {
      this.setErrorMessage(true);
    }
  }

  updateTargetAmount(newTargetAmount: number) {
    this.targetAmount = newTargetAmount;
    this.calculateSourceAmount();
  }

  stopLoading() {
    this.isLoading = false;
    this.setErrorMessage(false);
  }

  setErrorStatus() {
    this.isLoading = false;
    this.setErrorMessage(true);
  }

  setErrorMessage(isError: boolean) {
    this.errorMessage = isError ? 'Something went wrong' : '';
  }
}
