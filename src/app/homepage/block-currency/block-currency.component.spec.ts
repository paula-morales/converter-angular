import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCurrencyComponent } from './block-currency.component';

describe('BlockCurrencyComponent', () => {
  let component: BlockCurrencyComponent;
  let fixture: ComponentFixture<BlockCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockCurrencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
