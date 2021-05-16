import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'block-currency',
  templateUrl: './block-currency.component.html',
  styleUrls: ['./block-currency.component.css'],
})
export class BlockCurrencyComponent implements OnInit {
  @Input() currency: string;
  @Input() amount: number;
  @Input() allCurrencies: string[];

  @Output() currencyChanged: EventEmitter<string> = new EventEmitter();
  @Output() amountChanged: EventEmitter<number> = new EventEmitter();

  message: string;

  constructor() {}

  ngOnInit(): void {}

  selectCurrency(event: any) {
    const currencySelected = event.target.value;
    this.currencyChanged.emit(currencySelected);
  }

  onChangeAmount(newAmount: number) {
    if (newAmount > 0) {
      this.amountChanged.emit(newAmount);
      this.message = '';
    } else {
      this.message = 'Amount should be greater than 0';
    }
  }
}
