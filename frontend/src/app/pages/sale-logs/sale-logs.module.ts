import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesLogComponent } from './sale-logs.component';
import { SalesLogActionComponent } from './components/sales-log-action/sales-log-action.component';
import { CommonComponentsModule } from '../../common/common-component.module';
import { SalesLogListComponent } from './components/sales-log-list/sales-log-list.component';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { TableRowActionComponent } from './components/table-row-action/table-row-action.component';
import { RelativeDatePipe } from '../../pipe/relative-date.pipe';
import { LocalDateTimePipe } from '../../pipe/local-date.pipe';
import { SalesLogState } from './state/sales-log.state';
import { NgxsModule } from '@ngxs/store';
import { DebounceChangeDirective } from '../../directives/debounce-change.directive';

@NgModule({
  declarations: [
    SalesLogComponent,
    SalesLogActionComponent,
    SalesLogListComponent,
    TaskModalComponent,
    TableRowActionComponent,
    RelativeDatePipe,
    DebounceChangeDirective,
  ],
  providers: [SalesLogActionComponent, TaskModalComponent],
  imports: [
    CommonModule,
    MatIconModule,
    CommonComponentsModule,
    LocalDateTimePipe,
    NgxsModule.forRoot([SalesLogState], {
      compatibility: { strictContentSecurityPolicy: true },
    }),
  ],
  exports: [SalesLogComponent],
})
export class SalesLogModule {}
