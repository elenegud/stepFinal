import { Component, EventEmitter, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{

  constructor(private productsService : ProductsService){}

  products:Product[] =[];
  categories:string[] =[];
  loading:boolean=false;
  cartProducts:any[]=[];
  toast:boolean=false;

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.loading=true;
    this.productsService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
        this.loading=false;
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.loading=false;
      }
    );
  }

  getCategories() {
    this.loading=true;
    this.productsService.getCategories().subscribe(
      (categories: any) => {
        this.categories = categories;
        this.loading=false;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        this.loading=false;
      }
    );
  }

  filterCategory(event:any){
    let category = event.target.value;
    category =='all' ? this.getProducts() :  this.getProductsByCategory(category);
  }

  getProductsByCategory(category:string){
    this.loading=true;
    this.productsService.getProductsByCategory(category).subscribe(products=>{
      this.products=products;
      this.loading=false;
    })
  }

  addToCart(event:any){
    if ('cart' in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find(item=> item.item.id == event.item.id);
      if (exist){
        alert('Product is already in the cart')
      }
      else{
      this.cartProducts.push(event);
      localStorage.setItem('cart',JSON.stringify(this.cartProducts));
      this.showToast()
    setTimeout(() => {
      this.hideToast();
    }, 3000);
      }
    }
    else{
      this.cartProducts.push(event);
      localStorage.setItem('cart',JSON.stringify(this.cartProducts));
      this.showToast()
    setTimeout(() => {
      this.hideToast();
    }, 3000);
    }
  }
  showToast(){
    this.toast=true;
  }
  hideToast(){
    this.toast=false;
  }


}
