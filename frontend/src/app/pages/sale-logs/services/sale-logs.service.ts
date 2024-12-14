import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  LogParameters,
  SalesLogFilters,
  SalesTaskList,
  TaskModel,
} from '../interface/sales-log.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalesLogService {
  constructor(private _http: HttpClient) {}

  createSalesTask(body: TaskModel) {
    const url = `${environment.domain}/sale-logs/create-task`;
    return this._http.post(url, body);
  }

  updateSalesTask(body: TaskModel): Observable<any> {
    const url = `${environment.domain}/sale-logs/update-task`;
    return this._http.put(url, body);
  }

  fetchSalesLog(
    body: SalesLogFilters,
    params: LogParameters
  ): Observable<SalesTaskList[]> {
    const url = `${environment.domain}/sale-logs/get-logs`;
    return this._http.post<SalesTaskList[]>(url, body, {
      params: params as HttpParams,
    });
  }

  deleteSalesTaskLog(id: string) {
    const url = `${environment.domain}/sale-logs/delete-log/${id}`;
    return this._http.delete(url);
  }
}
