import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { List } from "../../models/list";
import { Collections } from "../../interfaces/interfaces";
import { Router } from "@angular/router";

@Component({
  selector: "create-list",
  templateUrl: "./create-list.component.html",
  styleUrls: ["./create-list.component.scss"]
})
export class CreateListComponent {
  @ViewChild('errorSpan') errorSpan: ElementRef;
  private list: List;
  error: string;
  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private renderer: Renderer2
    ) {
    this.list = new List(this.afs);
  }

  createList() {
    const newList: Collections.List = {
      isClosed: false
    };
    this.list
      .create(newList)
      .then(this.list.setList)
      .catch(() => {
        this.renderer.addClass(this.errorSpan.nativeElement, 'error');
      })
      .finally(() => {
        this.router.navigate(["/list"]);
      });
  }
}
