import { Component, Input, OnInit } from "@angular/core";
import {
  AngularFirestore,
  QueryDocumentSnapshot
} from "@angular/fire/firestore";
import { NgForm } from "@angular/forms";
import { List } from "src/models/list";
import { Collections } from "src/interfaces/interfaces";
import { Product } from "src/models/product";

@Component({
  selector: "product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  @Input() productRef: QueryDocumentSnapshot<Collections.Product>;
  @Input() list: List;
  product: Product;
  isUpdating: boolean = false;
  id: string;

  constructor(private afs: AngularFirestore) {
    this.product = new Product(this.afs);
  }
  
  startUpdating() {
    this.isUpdating = true;
  }

  changeQty(increment: boolean, f: NgForm) {
    const value: number = f.form.controls['qty'].value;
    if (value < 2 && !increment) return;
    increment ? 
      f.form.controls['qty'].setValue(value+1) :
      f.form.controls['qty'].setValue(value-1);
  }

  updatePrice(form: NgForm) {
    this.product.update(this.id, form.value).
      catch(console.log).
      finally(() => {
        this.isUpdating = false;
    });
  }

  delete() {
    this.product.delete(this.id).catch(console.log);
  }

  ngOnInit() {
    this.id = this.productRef.id;
    this.productRef.ref.onSnapshot(
      p => this.product.setProduct(p.data() as Collections.Product),
      console.log
    );
  }
}
