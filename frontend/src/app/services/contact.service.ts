import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateContactModel } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = "http://localhost:5041/api";
  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<any> { 
    return this.http.get(`${this.apiUrl}/Contact/contact`);
  }

  createContact(data: CreateContactModel): Observable<any> { 
    return this.http.post(`${this.apiUrl}/Contact/contact`, data);
  }
}
