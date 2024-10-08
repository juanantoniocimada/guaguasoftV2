import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private _apiUrl = `${environment.url}/route`;
  private _http = inject(HttpClient);


  // GET todas las entidades
  getAllItems(): Observable<any[]> {
    return this._http.get<any[]>(`${this._apiUrl}`);
  }

  // GET una entidad por ID
  getItemById(id: string): Observable<any> {
    return this._http.get<any>(`${this._apiUrl}/${id}`);
  }

  // POST para insertar una nueva entidad
  createItem(item: any): Observable<any> {
    return this._http.post<any>(`${this._apiUrl}`, item);
  }

  // PUT para modificar una entidad existente
  updateItem(id: string, item: any): Observable<any> {
    return this._http.put<any>(`${this._apiUrl}/${id}`, item);
  }

  // DELETE para borrar una entidad por ID
  deleteItem(id: number): Observable<any> {
    return this._http.delete<any>(`${this._apiUrl}/${id}`);
  }
}
