import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ColumnIds,
  RowActionsSet,
  TaskStatus,
  TaskStatusTranslation,
  TaskTypeIcon,
  ColumnNames,
} from '../../enum/sales-log.eum';
import { Store } from '@ngxs/store';
import {
  ChangeTaskStatus,
  DeleteSalesTaskLog,
  FetchSalesLogFilters,
  RemoveFilterOption,
  UpdateAppliedSalesLogFilters,
} from '../../state/sales-log.action';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { MatDialog } from '@angular/material/dialog';
import {
  SalesTaskList,
  TableColumn,
  TaskModel,
} from '../../interface/sales-log.interface';
import { Subscription, tap } from 'rxjs';
import { SalesLogState } from '../../state/sales-log.state';
import { FilterOption } from '../../../../interfaces/filter-menu.interface';

@Component({
  selector: 'app-sales-log-list',
  standalone: false,
  templateUrl: './sales-log-list.component.html',
})
export class SalesLogListComponent implements OnInit, OnDestroy {
  taskTypeIcon = TaskTypeIcon;
  taskStatus = TaskStatus;
  columnIds = ColumnIds;
  object = Object;
  columnNames = ColumnNames;
  taskStatusTranslation = TaskStatusTranslation;
  subs = new Subscription();
  tableList: SalesTaskList[] = [];
  salesFiltersOptions = {} as Record<ColumnIds, any>;
  appliedFilterList = {} as Record<ColumnIds, any>;
  isFilterApplied = false;
  tableColumns: TableColumn[] = [
    {
      id: ColumnIds.DATE,
      name: 'Date',
      sort: true,
      width: 'w-[140px]',
    },
    {
      id: ColumnIds.ENTITY_NAME,
      name: 'Entity Name',
      sort: true,
      filter: true,
    },
    {
      id: ColumnIds.TASK_TYPE,
      name: 'Task Type',
      sort: true,
      filter: true,
      width: 'w-[140px]',
    },
    {
      id: ColumnIds.TIME,
      name: 'Time',
      width: 'w-[140px]',
    },
    {
      id: ColumnIds.CONTACT_PERSON,
      name: 'Contact Person',
      sort: true,
      filter: true,
    },
    {
      id: ColumnIds.NOTES,
      name: 'Notes',
      sort: false,
      filter: false,
      width: 'w-1/3',
    },
    {
      id: ColumnIds.STATUS,
      name: 'Status',
      width: 'w-[120px]',
      sort: true,
      filter: true,
    },
    {
      id: ColumnIds.EMTY,
      name: '',
      sort: false,
      filter: false,
    },
  ];

  data: any = [
    { status: 0, taskType: 'Meeting' },
    { status: 1, taskType: 'Call' },
  ];

  constructor(private _store: Store, private _dialog: MatDialog) {}

  ngOnInit(): void {
    this.setTableData();
    this.fetchSalesLogFilter();
  }

  rowActions(id: number, data: TaskModel) {
    switch (id) {
      case RowActionsSet.DELETE:
        this.deleteSalesTask(data._id);
        break;
      case RowActionsSet.EDIT:
        this.editSalesTask(data);
        break;
      case RowActionsSet.UPDATE_STATUS:
        this.updateSalesTaskStatus(
          data._id,
          data.status ? TaskStatus.CLOSED : TaskStatus.OPEN
        );
        break;
      default:
        console.warn('Unknown action');
    }
  }

  removeFilter(columnId: string, value: string | number) {
    this._store.dispatch(new RemoveFilterOption(columnId as ColumnIds, value));
  }

  private setTableData() {
    this.subs.add(
      this._store.select(SalesLogState.getSalesLog).subscribe((list) => {
        this.tableList = list;
      })
    );
    this.subs.add(
      this._store
        .select(SalesLogState.getAppliedFilter)
        .pipe(
          tap(
            (filter) =>
              (this.isFilterApplied = Object.keys(filter).some(
                (option: string) => {
                  const currentFilter = filter[option as keyof typeof filter];
                  if (Array.isArray(currentFilter)) {
                    return !!currentFilter.length;
                  }
                  if (
                    typeof currentFilter === 'object' &&
                    currentFilter?.startAt &&
                    typeof currentFilter.startAt === 'string'
                  ) {
                    return !!currentFilter.startAt.length;
                  }
                  return false;
                }
              ))
          )
        )
        .subscribe((filters) => {
          this.appliedFilterList = { ...filters } as Record<ColumnIds, any>;
        })
    );
  }

  private fetchSalesLogFilter() {
    this._store.dispatch(new FetchSalesLogFilters());
    this.subs.add(
      this._store
        .select(SalesLogState.getSalesFilterOptions)
        .subscribe((salesFilters) => {
          this.salesFiltersOptions = salesFilters as Record<ColumnIds, any>;
        })
    );
  }

  onSelectedFilters(options: FilterOption[], columnId: string) {
    this._store.dispatch(
      new UpdateAppliedSalesLogFilters({ [columnId]: options } as Record<
        ColumnIds,
        any
      >)
    );
  }

  private deleteSalesTask(taskId: string) {
    this._store.dispatch(new DeleteSalesTaskLog(taskId));
  }

  private updateSalesTaskStatus(TaskId: string, status: number) {
    this._store.dispatch(new ChangeTaskStatus(TaskId, status));
  }

  private editSalesTask(data: TaskModel) {
    const dialogRef = this._dialog.open(TaskModalComponent, {
      width: '470px',
      disableClose: true,
      autoFocus: true,
      data,
    });
    dialogRef.afterClosed().subscribe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
