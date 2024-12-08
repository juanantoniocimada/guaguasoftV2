import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsRoutesService {

  private _apiUrlV2 = `${environment.url}/get-itinerary-specific-admin`;

  private _apiUrlV3 = `${environment.url}/post-itinerary-specific-admin`;


  private _apiUrl = `${environment.url}/locations-routes`;
  private _http = inject(HttpClient);

    // routev3/16
  getLocationByLocationsRoutesId(id: string): Observable<any> {
    return this._http.get<any>(`${this._apiUrl}/${id}/detail`);
  }

  // route/7/location/23
  deleteLocation(id: any): Observable<any> {
    return this._http.delete<any>(`${this._apiUrl}/${id}`);
  }

  putLocation(id: string, item: any): Observable<any> {
    return this._http.put<any>(`${this._apiUrl}/${id}`, item);
  }

  putLocationItinerary(id: string, item: any): Observable<any> {
    return this._http.put<any>(`${this._apiUrlV2}/${id}`, item);
  }

  post(item: any): Observable<any> {
    return this._http.post<any>(`${this._apiUrlV3}`, item);
  }

  // route/27/location/17
  postLocation(routeId: string, hourId: string, item: any): Observable<any> {
    return this._http.post<any>(`${this._apiUrl}/${routeId}/location/${hourId}`, item);
  }

  // route/20/locations
  getLocationsByRoute(routeId: string): Observable<any> {
    return this._http.get<any>(`${this._apiUrl}/${routeId}`);
  }

  get(item: any): Observable<any> {
    return this._http.post<any>(`${this._apiUrlV2}-get`, item);
  }
}
