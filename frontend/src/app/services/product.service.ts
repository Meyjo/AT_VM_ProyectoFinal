import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = "http://localhost:5041/api"

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return (this.http.get(`${this.apiUrl}/Product/products`));
  }

  getCategories(): Observable<any> {
    return (this.http.get(`${this.apiUrl}/Product/categories`))
  }

  deleteProduct(id: number): Observable<any> {
    return (this.http.delete(`${this.apiUrl}/Product/products/${id}`))
  }

  newProduct (newData: {name: string, description: string, category: string, image: string, price: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Product/products`, newData)
  }
}
