import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  LogParameters,
  SalesLogFilters,
  SalesLogStateModel,
  SalesTaskList,
  SelectedFilters,
  SortingOrder,
} from '../interface/sales-log.interface';
import { ColumnIds } from '../enum/sales-log.eum';
import {
  ChangeTaskStatus,
  CreateSalesTask,
  DeleteSalesTaskLog,
  FetchSalesTaskLogs,
  RemoveFilterOption,
  UpdateAppliedSalesLogFilters,
  UpdateSalesLogParameter,
} from './sales-log.action';
import { patch, removeItem } from '@ngxs/store/operators';
import { SalesLogService } from '../services/sales-log.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FilterOption } from '../../../interfaces/filter-menu.interface';

const InitialState: SalesLogStateModel = {
  parameters: {
    sortBy: ColumnIds.DATE,
    sortingOrder: SortingOrder.ASC,
    search: '',
  },
  filterOptions: {
    entityName: [],
    taskType: [],
    contactPerson: [],
    status: [],
  },
  appliedFilters: {
    entityName: [],
    date: { startAt: '', endAt: '' },
    taskType: [],
    contactPerson: [],
    status: [],
  },
  logs: [],
};

@State<SalesLogStateModel>({
  name: 'SalesLogState',
  defaults: InitialState,
})
@Injectable()
export class SalesLogState {
  saleLogService = inject(SalesLogService);

  @Selector()
  static getAppliedFilter(state: SalesLogStateModel) {
    return state.appliedFilters;
  }

  @Selector()
  static getSalesLogParameters(state: SalesLogStateModel) {
    return state.logs;
  }

  @Selector()
  static getSalesLog(state: SalesLogStateModel) {
    return state.logs;
  }

  @Selector()
  static getSalesFilterOptions(state: SalesLogStateModel) {
    return state.filterOptions;
  }

  @Action(FetchSalesTaskLogs)
  FetchSalesLog(ctx: StateContext<SalesLogStateModel>, _: FetchSalesTaskLogs) {
    const { parameters, appliedFilters: selectedFilters } = ctx.getState();
    const filters: SelectedFilters = {
      entityNames: selectedFilters.entityName.map((entity) => entity.value),
      date: selectedFilters.date,
      taskTypes: selectedFilters.taskType.map((taskType) => taskType.value),
      contactPerson: selectedFilters.contactPerson.map(
        (person) => person.value
      ),
      status: selectedFilters.status.map((status) => status.value),
    };
    return this.saleLogService
      .fetchSalesLog(filters, parameters)
      .subscribe((response: SalesTaskList[]) => {
        ctx.patchState({ logs: response });
      });
  }

  @Action(CreateSalesTask)
  CreateSalesTask(
    ctx: StateContext<SalesLogStateModel>,
    action: CreateSalesTask
  ) {
    return this.saleLogService.createSalesTask(action.body).pipe(
      tap(() => {
        ctx.dispatch(new FetchSalesTaskLogs());
      }),
      catchError((err) => {
        console.error('Error updating task:', err);
        return throwError(() => err);
      })
    );
  }

  @Action(CreateSalesTask)
  UpdateSalesTask(
    ctx: StateContext<SalesLogStateModel>,
    action: CreateSalesTask
  ) {
    return this.saleLogService.updateSalesTask(action.body).pipe(
      tap(() => {
        ctx.dispatch(new FetchSalesTaskLogs());
      }),
      catchError((err) => {
        console.error('Error updating task:', err);
        return throwError(() => err);
      })
    );
  }

  @Action(DeleteSalesTaskLog)
  DeleteSalesTaskLog(
    ctx: StateContext<SalesLogStateModel>,
    action: DeleteSalesTaskLog
  ) {
    this.saleLogService.deleteSalesTaskLog(action.taskId).subscribe({
      next: () => {
        ctx.dispatch(new FetchSalesTaskLogs());
      },
      error: () => {},
    });
  }

  @Action(UpdateAppliedSalesLogFilters)
  UpdateAppliedSalesLogFilters(
    ctx: StateContext<SalesLogStateModel>,
    action: UpdateAppliedSalesLogFilters
  ) {
    const propertyName = Object.keys(
      action.logsFilters
    )[0] as keyof SalesLogFilters;

    ctx.setState(
      patch({
        appliedFilters: patch({
          [propertyName]: action.logsFilters[propertyName],
        }),
      })
    );

    ctx.dispatch(new FetchSalesTaskLogs());
  }

  @Action(UpdateSalesLogParameter)
  UpdateSalesLogParameter(
    ctx: StateContext<SalesLogStateModel>,
    action: UpdateSalesLogParameter
  ) {
    const propertyName = Object.keys(
      action.parameters
    )[0] as keyof LogParameters;

    ctx.setState(
      patch({
        parameters: patch({ [propertyName]: action.parameters[propertyName] }),
      })
    );
    ctx.dispatch(new FetchSalesTaskLogs());
  }

  @Action(RemoveFilterOption)
  RemoveFilterOption(
    ctx: StateContext<SalesLogStateModel>,
    action: RemoveFilterOption
  ) {
    if (action.columnId === ColumnIds.DATE) {
      ctx.setState(
        patch({ appliedFilters: patch({ date: { startAt: '', endAt: '' } }) })
      );
    } else {
      ctx.setState(
        patch({
          appliedFilters: patch({
            [action.columnId]: removeItem<FilterOption>(
              (option) => option.value === action.value
            ),
          }),
        })
      );
    }
    ctx.dispatch(new FetchSalesTaskLogs());
  }

  @Action(ChangeTaskStatus)
  changeTaskStatus(
    ctx: StateContext<SalesLogStateModel>,
    action: ChangeTaskStatus
  ) {
    ctx.dispatch(new FetchSalesTaskLogs());
  }
}
