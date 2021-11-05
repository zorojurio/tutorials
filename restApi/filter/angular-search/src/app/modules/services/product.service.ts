import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../core/models/product';

const backendUrl = 'http://127.0.0.1:8000/api/products/frontend'
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() : Observable <Product[]> {
    return this.http.get<Product[]>(`${backendUrl}`); 
  }
}
