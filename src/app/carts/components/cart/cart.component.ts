import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cartProducts:any[]=[];
  total:any=0;
  toast:boolean=false;

  ngOnInit(): void {
   this.getCartProducts();
   this.getCartTotal();
  }

  constructor(private cartService: CartService){}

  getCartProducts(){
    if ('cart' in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
  }
  console.log(this.cartProducts)
  }

  decreaseQuantity(index:number){
    this.cartProducts[index].quantity--;
    localStorage.setItem('cart',JSON.stringify(this.cartProducts))
    this.getCartTotal()
  }

  increaseQuantity(index:number){
    this.cartProducts[index].quantity++;
    localStorage.setItem('cart',JSON.stringify(this.cartProducts))
    this.getCartTotal()
  }

  detectChange(){
    localStorage.setItem('cart',JSON.stringify(this.cartProducts))
    this.getCartTotal();
  }

  getCartTotal(){
    this.total =0;
    for(let x in this.cartProducts){
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  deleteProduct(index:number){
    this.cartProducts.splice(index,1);
    this.getCartTotal();
    localStorage.setItem('cart',JSON.stringify(this.cartProducts))
  }

  clearCart(){
    this.cartProducts=[]
    localStorage.setItem('cart',JSON.stringify(this.cartProducts))
  }

  order(){
    let products = this.cartProducts.map(product=>{
      return {productId : product.item.id , quantity : product.quantity}
    })
    let model = {
      userId: 5,
      date: Date.now(),
      products : products
    }
    this.cartService.createOrder(model).subscribe(res=>{
      this.showToast();
      setTimeout(() => {
        this.hideToast();
      }, 3000);
    })
  }

  showToast(){
    this.toast=true;
  }

  hideToast(){
    this.toast=false;
  }
}
