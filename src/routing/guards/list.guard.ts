import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { List } from "src/models/list";

@Injectable()
export class ListGuard implements CanActivate {
  list: List;
  constructor(private afs: AngularFirestore, private router: Router) {
    this.list = new List(this.afs);
  }

  listIsSet(id: string): boolean {
    return id.length > 0 ? true: false
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const id = route.params['listId'] || this.list.getListId();
    if (!this.listIsSet(id)) {
      this.router.navigateByUrl("/home");
    }
    const list = await this.list.getList(id)
    if (list.exists) {
      return true;
    } else {
      this.router.navigateByUrl("/not-found/lnf");
    }
  }
}
