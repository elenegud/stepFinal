import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient) { }

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(environment.apiUrl+'products');
  }

  getCategories():Observable<any>{
    return this.http.get<any>(environment.apiUrl + 'products/categories')
  }

  getProductsByCategory(category:string):Observable<Product[]>{
    return this.http.get<Product[]>(environment.apiUrl + `products/category/${category}`)
  }

  getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(environment.apiUrl + `products/${id}`);
  }
}


