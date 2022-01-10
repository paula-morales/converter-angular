import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BlockCurrencyComponent } from './block-currency.component';

describe('BlockCurrencyComponent', () => {
  let component: BlockCurrencyComponent;
  let fixture: ComponentFixture<BlockCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlockCurrencyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component.amountChanged, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an error when input is empty and not emit an event', () => {
    component.onChangeAmount(-5);
    const errorMessage = component.message;
    expect(errorMessage).toBeTruthy();
    expect(component.amountChanged.emit).not.toHaveBeenCalled();
  });

  it('should not display an error when input is correct and emit an event', () => {
    component.onChangeAmount(5);
    const errorMessage = component.message;
    expect(errorMessage).toBeFalsy;
    expect(component.amountChanged.emit).toHaveBeenCalledWith(5);
  });
});
