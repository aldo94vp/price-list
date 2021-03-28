export namespace Collections {
  export interface List {
    isClosed: boolean;
    uid: string;
    createdAt: Date;
  }
  export interface Product {
    name: string;
    price: number;
    qty: number;
    listId?: string;
  }
}
