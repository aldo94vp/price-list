import { Collections } from "src/interfaces/interfaces";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference
} from "@angular/fire/firestore";
import { List } from "./list";
import { BehaviorSubject, Observable, Subject } from "rxjs";

export class Product {
  productsCollection: AngularFirestoreCollection<Collections.Product>;
  list: List;
  name: string;
  private $price: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  price: Observable<number> = this.$price.asObservable();
  private $qty: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  qty: Observable<number> = this.$qty.asObservable();
  listId: string;
  changes: Subject<any> = new Subject<any>();

  constructor(private afs: AngularFirestore) {
    this.list = new List(this.afs);
    this.listId = this.list.getListId();
    this.productsCollection = this.afs.collection<Collections.Product>('products');
  }

  async create(
    product: Collections.Product
  ): Promise<DocumentReference<Collections.Product>> {
    try {
      product.qty = 1;
      product.listId = this.listId;
      return await this.productsCollection.add(product);
    } catch (e) {
      return e;
    }
  }

  async update(
    id: string,
    changes: {price?: number, qty?: number}
  ): Promise<void> {
    try {
      return await this.productsCollection.doc(id).update(changes);
    } catch (e) {
      return e;
    }
  }

  async delete(
    id: string
  ): Promise<void> {
    try {
      return await this.productsCollection.doc(id).delete();
    } catch (e) {
      return e;
    }
  }

  getProduct(id: string) {
    return this.productsCollection.doc(id).get();
  }

  setProduct(product: Collections.Product) {
    const { name, price, qty, listId } = { ...product };
    this.name = name;
    this.$price.next(price);
    this.$qty.next(qty);
    this.listId = listId;
  }

  getProducts() {
    return this.productsCollection.ref.where('listId', '==', this.listId).get();
  }
}
