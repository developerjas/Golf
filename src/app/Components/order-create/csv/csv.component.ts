import { Component, OnInit, Injectable } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OrderService } from '../../../Shared/_services/order.service';
import { OrderCsvModel } from '../../../Shared/_services/order.csv.export.model';
import { OrderModel, OrderModel_ProductModel } from '../../../Shared/_services/order.model';

type AOA = any[][];

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css']
})
@Injectable({ providedIn: 'root' })
export class CsvComponent implements OnInit {
  data: AOA = [];
  order: OrderModel[];
  constructor(private http: HttpClient,
    private router: Router,
    private orderService: OrderService) { }
  ngOnInit() {
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
    };
    reader.readAsBinaryString(target.files[0]);
  }

  public getTotalProductQuantity(order: OrderModel): number {
    let total = 0;
    for (let i = 0; i < order.products.length; i++) {
      total += order.products[i].quantity;
    }
    return total;
  }

  uploadClicked() {
    var csvData = [];
    for (var i = 1; i < this.data.length; i++) {
      let rowData = this.data[i];

      let csvRow = new OrderCsvModel();
      csvRow.dateCreated = new Date(rowData[0]);
      csvRow.dateRequired = new Date(rowData[1]);
      csvRow.description = rowData[2];
      csvRow.orderNumber = rowData[3];
      csvRow.productName = rowData[4];
      csvRow.productQuantity = rowData[5];

      csvData.push(csvRow);
    }

    let csvDataGroupped = this.groupBy(csvData, 'orderNumber');

    let orders = [];

    for (const orderNumber in csvDataGroupped) {
      if (csvDataGroupped.hasOwnProperty(orderNumber)) {
        let products = csvDataGroupped[orderNumber];

        let order = new OrderModel();

        order.orderNumber = Number(products[0].orderNumber);
        order.dateCreated = new Date(products[0].dateCreated);
        order.dateRequired = new Date(products[0].dateRequired);
        order.description = products[0].description;
        order.products = [];

        for (var i = 0; i < products.length; i++) {
          let product = new OrderModel_ProductModel();
          product.productName = products[i].productName;
          product.quantity = Number(products[i].productQuantity);
          order.products.push(product);
        }

        // TODO Improve to accept multiple orders and post to the API
        orders.push(order);

        this.orderService
          .createOrder(order)
          .subscribe(reponseData => {
            // TODO displayu message on the screen
          });
      }
    }

    //this.orderService
    //  .createOrders(orders)
    //  .subscribe(reponseData => {
    //    // TODO displayu message on the screen
    //    console.log("All done!");
    //  });
  }

  groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }
}
