import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../../Shared/_services/order.service';
import { OrderModel, OrderModel_ProductModel } from '../../Shared/_services/order.model';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css'],  
})
export class OrderCreateComponent implements OnInit {
  @Output() orderCreated = new EventEmitter<OrderModel>();
  private order: OrderModel; 

  constructor(
    private router: Router,
    private orderService: OrderService,
    private http: HttpClient) { }
 
  ngOnInit() {
    this.order = new OrderModel();
    this.order.dateCreated = new Date();
    this.order.dateRequired = new Date();
    this.order.products = [];
    this.addProduct();
    }
  

  addProduct() {
    let newProduct = new OrderModel_ProductModel();
    newProduct.quantity = 0;
    newProduct.productName = "";

    this.order.products.push(newProduct);  
  }

  deleteProduct(index) {
    if (this.order.products.length == 1) {
      return false;
    } else {
      this.order.products.splice(index, 1);
      return true;
    }
  }

  saveOrder() {
    //console.log("Its working");
    //if (this.order.dateRequired ||
    //  this.order.description ||
    //  this.order.orderNumber ||
    //  this.order.products == null) {
    //  return;
    //}
    this.orderService
      .createOrder(this.order)
      .subscribe(reponseData => {
          this.router.navigate(['/order-Index']);
      });
  }
} 

