import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import {
  AngularFirestore,
  QueryDocumentSnapshot
} from "@angular/fire/firestore";
import { ActivatedRoute, Router } from "@angular/router";
import { Collections } from "src/interfaces/interfaces";
import { List } from "src/models/list";
import { Product } from "src/models/product";

@Component({
  selector: "list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  @ViewChild('spanCopy') spanCopy: ElementRef;
  list: List;
  product: Product;
  products: QueryDocumentSnapshot<Collections.Product>[];
  total: number;
  
  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private renderer: Renderer2
    ) {
    this.list = new List(this.afs);
    this.product = new Product(this.afs);
  }

  getProductList() {
    let firstTime = true;
    this.product.getProducts().then(p => {
      this.products = [...p.docs];
      this.calculateTotal();
      p.query.onSnapshot(c => {
        if (c.docChanges().length > 0 && !firstTime) {
          c.docChanges().map(x => {
            switch (x.type) {
              case 'added':
                this.products = [
                  ...this.products,
                  c.docChanges().shift().doc
                ];
                break;
              case 'removed':
                const id = c.docChanges().shift().doc.id;
                const idx = this.products.findIndex(t => {
                  return t.id === id
                });
                this.products.splice(idx, 1);
                this.products = [
                  ...this.products
                ];
                break;
              case 'modified':
                const modDoc = c.docChanges().shift();
                const idm = modDoc.doc.id;
                const idxm = this.products.findIndex(t => {
                  return t.id === idm
                });
                this.products.splice(idxm, 1, modDoc.doc);
                this.products = [
                  ...this.products
                ];
                break;
            }
            this.calculateTotal();
          });
        }
        firstTime = false;
      },
      console.log);
    });
  }

  calculateTotal() {
    this.total = 0;
    this.products.map(p => {
      const price = p.data().price;
      const qty = p.data().qty;
      this.total += price * qty;
    })
  }

  closeList() {
    this.list.close().
      catch(console.log).
      finally(() => {
        this.list.closeList();
    })
  }

  returnHome() {
    this.list.closeList();
    this.router.navigateByUrl("/");
  }

  copyListId() {
    const text = `<i class="nes-icon whatsapp is-small"></i> Share list <i class="nes-icon whatsapp is-small"></i>`;
    this.renderer.addClass(this.spanCopy.nativeElement, 'is-error');
    this.renderer.addClass(this.spanCopy.nativeElement, 'transition-click');
    this.renderer.removeClass(this.spanCopy.nativeElement, 'is-warning');
    this.renderer.setProperty(this.spanCopy.nativeElement, 'textContent', 'Shared!');
    setTimeout(() => {
      this.renderer.addClass(this.spanCopy.nativeElement, 'is-warning');
      this.renderer.removeClass(this.spanCopy.nativeElement, 'is-error');
      this.renderer.removeClass(this.spanCopy.nativeElement, 'transition-click');
      this.renderer.setProperty(this.spanCopy.nativeElement, 'innerHTML', text);
    }, 3000);
  }

  ngOnInit() {
    const id = this.activeRoute.snapshot.params['listId'] || this.list.getListId();
    this.list.getList(id).
      then((l) => {
        this.list.setList(l.ref)
        this.getProductList()
      }).catch(() => {
        this.router.navigateByUrl('/not-found/error');
      })
  }
}
