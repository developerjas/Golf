import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../../../Shared/_services/order.model';
import { OrderService } from '../../../Shared/_services/order.service';
import { ExcelService } from '../../../Shared/_services/csv.service';
import { OrderCsvModel } from '../../../Shared/_services/order.csv.export.model';

@Component({
  selector: 'app-order-index',
  templateUrl: './order-index.component.html',
  styleUrls: ['./order-index.component.css']
})
export class OrderIndexComponent implements OnInit {
  editableOrderId: string;


  public orders: OrderModel[];
  constructor(private _orderservice: OrderService,
    private excelService: ExcelService, ) {

  }

  ngOnInit() {

    this._orderservice
      .fetchOrders()
      .subscribe(result => {
        this.orders = result;
      });

    this.editableOrderId = "not null";
  }

   public getTotalProductQuantity(order: OrderModel): number {
    let total = 0;
    for (let i = 0; i < order.products.length; i++) {
      total += order.products[i].quantity;
    }
    return total;
  }
  onSelected(orderId: string) {
    this.editableOrderId = orderId;
  }

  exportAsXLSX(): void {
    let ordersCsvExports = [];

    for (let i = 0; i < this.orders.length; i++) {
      let orderModel = this.orders[i];

      for (let j = 0; j < orderModel.products.length; j++) {
        let orderCsvRow = new OrderCsvModel();
        orderCsvRow.dateCreated = orderModel.dateCreated;
        orderCsvRow.dateRequired = orderModel.dateRequired;
        orderCsvRow.description = orderModel.description;
        orderCsvRow.orderNumber = orderModel.orderNumber;

        let product = orderModel.products[j];
        orderCsvRow.productName = product.productName;
        orderCsvRow.productQuantity = product.quantity;

        ordersCsvExports.push(orderCsvRow);
      }
    }

    this.excelService.exportAsExcelFile(ordersCsvExports, 'sample');
  }
}
