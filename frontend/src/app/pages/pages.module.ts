import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleLogsModule } from './sale-logs/sale-logs.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SaleLogsModule],
  exports: [SaleLogsModule],
})
export class PagesModule {}
