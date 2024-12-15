import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  LogParameters,
  SalesTaskList,
  SelectedFilters,
  TaskModel,
} from '../interface/sales-log.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalesLogService {
  constructor(private _http: HttpClient) {}

  createSalesTask(body: TaskModel) {
    const url = `${environment.domain}/sales-log/create-task`;
    return this._http.post(url, body);
  }

  updateSalesTask(body: TaskModel): Observable<any> {
    const url = `${environment.domain}/sales-log/update-task`;
    return this._http.put(url, body);
  }

  fetchSalesLog(
    body: SelectedFilters,
    params: LogParameters
  ): Observable<SalesTaskList[]> {
    const url = `${environment.domain}/sales-log/get-logs`;
    return this._http.post<SalesTaskList[]>(url, body, {
      params: params as HttpParams,
    });
  }

  deleteSalesTaskLog(id: string) {
    const url = `${environment.domain}/sales-log/delete-log/${id}`;
    return this._http.delete(url);
  }

  fetchSalesLogFilter() {
    const url = `${environment.domain}/sales-log/filters`;
    return this._http.get(url);
  }

  updateSalesTaskStatus(taskId: string, status: number) {
    const url = `${environment.domain}/sales-log/status/${taskId}`;
    return this._http.patch(url, { status });
  }
}
