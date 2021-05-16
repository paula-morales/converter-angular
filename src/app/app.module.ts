import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomepageService } from './homepage/homepage.service';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BlockCurrencyComponent } from './homepage/block-currency/block-currency.component';

@NgModule({
  declarations: [AppComponent, HomepageComponent, BlockCurrencyComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [HomepageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
