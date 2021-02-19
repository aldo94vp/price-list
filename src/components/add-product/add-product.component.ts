import { Component } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { NgForm } from "@angular/forms";
import { Product } from "../../models/product";

@Component({
  selector: "add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"]
})
export class AddProductComponent {
  product: Product;
  constructor(private afs: AngularFirestore) {
    this.product = new Product(this.afs);
  }

  add(form: NgForm) {
    this.product
      .create(form.value)
      .catch(console.log)
      .finally(() => form.resetForm());
  }
}
