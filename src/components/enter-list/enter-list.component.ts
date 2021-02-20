import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { List } from "../../models/list";

@Component({
  selector: "enter-list",
  templateUrl: "./enter-list.component.html",
  styleUrls: ["./enter-list.component.scss"]
})
export class EnterListComponent {
  @ViewChild('errorSpan') errorSpan: ElementRef;
  list: List;
  error: string;
  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private renderer: Renderer2
    ) {
    this.list = new List(this.afs);
  }

  validateList(id: string) {
    if(!id.length) {
      this.renderer.addClass(this.errorSpan.nativeElement, 'error');
      return this.error = `List ID is required`;
    }
    this.list.getList(id).then(l => {
      if (l.exists) {
        this.list.setList(l.ref);
        this.router.navigateByUrl("/list");
      } else {
        this.error = `list doesn't exist`;
        this.renderer.addClass(this.errorSpan.nativeElement, 'error');
      }
    });
  }
}
