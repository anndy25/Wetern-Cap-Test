import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  LogParameters,
  SalesTaskList,
  SelectedFilters,
  TaskModel,
} from '../interface/sales-log.interface';
import { Observable } from 'rxjs';
import { FilterOption } from '../../../interfaces/filter-menu.interface';

@Injectable({
  providedIn: 'root',
})
export class SalesLogService {
  constructor(private _http: HttpClient) {}

  createSalesTask(body: TaskModel) {
    const url = `${environment.domain}/sales-log/create-task`;
    return this._http.post(url, body);
  }

  updateSalesTask(taskId: string, body: TaskModel): Observable<any> {
    const url = `${environment.domain}/sales-log/update-task/${taskId}`;
    return this._http.put(url, body);
  }

  fetchSalesLog(
    body: SelectedFilters,
    params: LogParameters
  ): Observable<SalesTaskList[]> {
    const url = `${environment.domain}/sales-log/get-logs`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post<SalesTaskList[]>(url, body, {
      params: params as HttpParams,
      headers,
    });
  }

  deleteSalesTaskLog(id: string) {
    const url = `${environment.domain}/sales-log/delete-task/${id}`;
    return this._http.delete(url);
  }

  fetchSalesLogFilter() {
    const url = `${environment.domain}/sales-log/filters`;
    return this._http.get<Record<string, FilterOption[]>>(url);
  }

  updateSalesTaskStatus(taskId: string, status: number) {
    const url = `${environment.domain}/sales-log/status/${taskId}`;
    return this._http.patch(url, { status });
  }
}
