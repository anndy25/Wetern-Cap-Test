import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesLogModule } from './sales-log/sales-log.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SalesLogModule],
  exports: [SalesLogModule],
})
export class PagesModule {}
