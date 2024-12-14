import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesLogModule } from './sale-logs/sale-logs.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SalesLogModule],
  exports: [SalesLogModule],
})
export class PagesModule {}
