import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import {
  AngularFirestore,
  QueryDocumentSnapshot
} from "@angular/fire/firestore";
import { NgForm } from "@angular/forms";
import { List } from "../../models/list";
import { Collections } from "../../interfaces/interfaces";
import { Product } from "../../models/product";

@Component({
  selector: "product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
  encapsulation: ViewEncapsulation.Emulated
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
  
  changeQty(increment: boolean, f: NgForm) {
    const value: number = f.form.controls['qty'].value;
    if (value < 2 && !increment) return;
    increment ? 
      f.form.controls['qty'].setValue(value+1) :
      f.form.controls['qty'].setValue(value-1);
    this.product.update(this.id, f.value).
      catch(console.log);
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
    console.log(this.list)
  }
}
