import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterOutlet } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  id:any;
  product : Product =new Product();
  loading:boolean=false;
  cartProducts:any[]=[];
  toast:boolean=false;
  item : any;
  

  constructor(private route:ActivatedRoute,private productsService:ProductsService,private router:Router){
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id)
  }
  ngOnInit(): void {
    this.getProductById();
  }

  getProductById(){
    this.loading=true;
    if(this.id>20 || this.id<1){
      this.router.navigateByUrl('/products')
    }
      this.productsService.getProductById(this.id).subscribe(product=>{
      console.log(product)
      this.product= product;
      this.loading=false;
    },error=>{
      console.log("Error getting Product ID");
      this.loading=false;
      this.router.navigateByUrl('/products')
    })
  }
    addToCart(){
      this.item = {item:this.product,quantity:1};
      if ('cart' in localStorage){
        this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
        let exist = this.cartProducts.find(item=> item.item.id == this.id);
        if (exist){
          alert('Product is already in the cart')
        }
        else{
          this.cartProducts.push(this.item);
          localStorage.setItem('cart',JSON.stringify(this.cartProducts));
          this.showToast()
          setTimeout(() => {
            this.hideToast();
          }, 3000);
          }
        }
      else{
        this.cartProducts.push(this.item);
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
