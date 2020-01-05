import { OrderModel, OrderModel_ProductModel } from './order.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, take, exhaustMap } from 'rxjs/operators';
import { UserService } from './user.service';


@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(
    private http: HttpClient,
    private UserService: UserService
  ) { }


  createOrder(order: OrderModel) {
    return this.http
      .post(
        'https://golf-d26fc.firebaseio.com/post.json',
        order
      );
  }
  fetchOrders() {
    return this.UserService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.
          get<OrderModel[]>(
            'https://golf-d26fc.firebaseio.com/post.json'
          ).pipe(
            map(responseData => {
              const orderArray: OrderModel[] = [];
              for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                  orderArray.push({ ...responseData[key], id: key });
                }
              }
              return orderArray;
            })
          );
      }));
  }
}
