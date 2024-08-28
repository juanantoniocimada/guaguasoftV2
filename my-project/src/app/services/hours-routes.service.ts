import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoursRoutesService {

  private _apiUrl = `${environment.url}/hours-routes`;
  private _http = inject(HttpClient);

  deleteHour(routeId: string, hourId: string): Observable<any> {
    return this._http.delete<any>(`${this._apiUrl}/${routeId}/hour/${hourId}`);
  }

  putHour(id: string, item: any): Observable<any> {
    return this._http.put<any>(`${this._apiUrl}/${id}`, item);
  }

  postHour(routeId: string, hourId: string, item: any): Observable<any> {
    return this._http.post<any>(`${this._apiUrl}/${routeId}/hour/${hourId}`, item);
  }

  getHoursByRoute(routeId: string): Observable<any> {
    return this._http.get<any>(`${this._apiUrl}/${routeId}`);
  }

  getHourByHoursRoutesId(id: string): Observable<any> {
    return this._http.get<any>(`${this._apiUrl}/${id}/detail`);
  }
}
