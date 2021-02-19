export namespace Collections {
  export interface List {
    isClosed: boolean;
  }
  export interface Product {
    name: string;
    price: number;
    qty: number;
    listId?: string;
  }
}
