export class OrderModel {
  public id?: string;
  public orderNumber: number;
  public dateRequired: Date;
  public description: string;
  public dateCreated: Date;
  public products: OrderModel_ProductModel[];
}

export class OrderModel_ProductModel {
  public productName: string;
  public quantity: number;
}
