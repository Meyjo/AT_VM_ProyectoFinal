import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = "http://localhost:5041/api"
  constructor(private http: HttpClient) { }

  getOrders():Observable<any> {
    return this.http.get(`${this.apiUrl}/Order/orders`)
  }

  newOrder(data: {total: number, name: string, address: string, phone: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/Order/orders`, data)
  }
}
