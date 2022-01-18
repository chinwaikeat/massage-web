import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storageService/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string;
  private apiUrl!: string;
  constructor(private http: HttpClient, private storage: StorageService) {
    this.baseUrl = environment.base_url;
  }

  getHeader(params?: HttpParams) {
    let token = this.storage.getAccessToken();
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      Authorization: 'Bearer ' + token,
    });
    if (params) {
      return { headers: reqHeader, params: params };
    }
    return { headers: reqHeader };
  }

  public login(route: string, data: string): Observable<any> {
    const url = this.baseUrl + route;
    return this.http.post(url, data);
  }

  public post(route: string, data: string): Observable<any> {
    let headers = this.getHeader();
    const url = this.baseUrl + route;
    return this.http.post(url, data, headers);
  }

  public get(route: string, params?: HttpParams): Observable<any> {
    let headers = this.getHeader(params);

    const url = this.baseUrl + route;
    return this.http.get(url, headers);
  }

  public put(route: string, data?: string): Observable<any> {
    let headers = this.getHeader();
    const url = this.baseUrl + route;
    return this.http.put(url, data, headers);
  }

  public delete(route: string, data?: string): Observable<any> {
    let headers = this.getHeader();
    const url = this.baseUrl + route;
    return this.http.put(url, data, headers);
  }

  public actualDelete(route: string, params?: HttpParams): Observable<any> {
    let headers = this.getHeader(params);
    const url = this.baseUrl + route;
    return this.http.delete(url, headers);
  }
}
