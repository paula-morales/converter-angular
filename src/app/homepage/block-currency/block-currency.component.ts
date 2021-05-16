import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'block-currency',
  templateUrl: './block-currency.component.html',
  styleUrls: ['./block-currency.component.css'],
})
export class BlockCurrencyComponent implements OnInit {
  @Input() currency: string;

  constructor() {}

  ngOnInit(): void {}
}
