import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleLogsComponent } from './sale-logs.component';
import { SalesLogActionComponent } from './components/sales-log-action/sales-log-action.component';
import { CommonComponentsModule } from '../../common/common-component.module';
import { SalesLogListComponent } from './components/sales-log-list/sales-log-list.component';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { TableRowActionComponent } from './components/table-row-action/table-row-action.component';
import { RelativeDatePipe } from '../../pipe/relative-date.pipe';
import { LocalDateTimePipe } from '../../pipe/local-date.pipe';

@NgModule({
  declarations: [
    SaleLogsComponent,
    SalesLogActionComponent,
    SalesLogListComponent,
    TaskModalComponent,
    TableRowActionComponent,
    RelativeDatePipe,
  ],
  providers: [SalesLogActionComponent, TaskModalComponent],
  imports: [
    CommonModule,
    MatIconModule,
    CommonComponentsModule,
    LocalDateTimePipe,
  ],
  exports: [SaleLogsComponent],
})
export class SaleLogsModule {}
