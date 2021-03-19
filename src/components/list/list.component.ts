import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import {
  AngularFirestore,
  QueryDocumentSnapshot
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { DarkModeService } from "src/services/dark-mode.service";
import { Collections } from "../../interfaces/interfaces";
import { List } from "../../models/list";
import { Product } from "../../models/product";

@Component({
  selector: "list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  @ViewChild('container') container: ElementRef;
  @ViewChild('parentCopy') parentCopy: ElementRef;
  @ViewChild('spanCopy') spanCopy: ElementRef;
  list: List;
  product: Product;
  products: QueryDocumentSnapshot<Collections.Product>[];
  total: number;
  
  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private renderer: Renderer2,
    private darkModeService: DarkModeService
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
    // const el: HTMLTextAreaElement = /* document.createElement('textarea'); */ this.renderer.createElement('textarea');
    // el.value = this.list.getListId();
    // this.renderer.appendChild(this.parentCopy.nativeElement, el);
    // el.select();
    // document.execCommand('copy');
    // el.remove();
    this.renderer.addClass(this.spanCopy.nativeElement, 'is-error');
    this.renderer.addClass(this.spanCopy.nativeElement, 'transition-click');
    this.renderer.removeClass(this.spanCopy.nativeElement, 'is-warning');
    this.renderer.setProperty(this.spanCopy.nativeElement, 'textContent', 'Copied!');
    setTimeout(() => {
      this.renderer.addClass(this.spanCopy.nativeElement, 'is-warning');
      this.renderer.removeClass(this.spanCopy.nativeElement, 'is-error');
      this.renderer.removeClass(this.spanCopy.nativeElement, 'transition-click');
      this.renderer.setProperty(this.spanCopy.nativeElement, 'textContent', 'Click to share list ID');
    }, 3000);
  }

  ngAfterViewInit() {
    this.darkModeService.initService(this.renderer, this.container);
  }

  ngOnInit() {
    this.list.getList(this.list.getListId()).
      then((l) => {
        this.list.setList(l.ref)
        this.getProductList()
      }).catch(console.log)
  }
}
