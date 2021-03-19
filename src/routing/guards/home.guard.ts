import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { List } from "../../models/list";

@Injectable()
export class HomeGuard implements CanActivate {
  list: List;
  constructor(private afs: AngularFirestore, private router: Router) {
    this.list = new List(this.afs);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.listIsSet()) {
      this.router.navigateByUrl("/list/");
    } else {
      return true;
    }
  }

  listIsSet(): boolean {
    const id = this.list.getListId().length;
    return id > 0 ? true: false
  }
}
