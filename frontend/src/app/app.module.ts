import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';

import { HeaderComponent } from './components/header/header.component';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, PagesModule, AppRoutingModule, MatInputModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
