import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from "@angular/router";
import { Observable } from "rxjs";
import { List } from "../../models/list";

@Injectable()
export class ListGuard implements CanActivate, CanActivateChild {
  list: List;
  constructor(private afs: AngularFirestore, private router: Router) {
    this.list = new List(this.afs);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.listIsSet()) {
      this.router.navigateByUrl("/list");
    } else {
      return true;
    }
  }

  listIsSet(): boolean {
    const id = this.list.getListId().length;
    return id > 0 ? true: false
  }

  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (!this.listIsSet()) return false;
    const id = this.list.getListId();
    const l = await this.list.getList(id)
    if (l.exists) {
      return true;
    } else {
      this.router.navigateByUrl("/");
    }
  }
}
