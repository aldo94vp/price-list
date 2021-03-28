import { Collections } from "src/interfaces/interfaces";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QuerySnapshot
} from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";

export class List {
  $isClosed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isClosed = this.$isClosed.asObservable();
  private listsCollection: AngularFirestoreCollection<Collections.List>;
  constructor(private afs: AngularFirestore) {
    this.listsCollection = this.afs.collection<Collections.List>(
      "lists"
    );
  }

  async create(
    list: Collections.List
  ): Promise<DocumentReference<Collections.List>> {
    try {
      return await this.listsCollection.add(list);
    } catch (e) {
      return e;
    }
  }

  async close(): Promise<void> {
    try {
      return await this.listsCollection.doc(this.getListId()).update({ isClosed: true });
    } catch (e) {
      return e;
    }
  }


  getList(id: string) {
    return this.listsCollection.ref.doc(id).get();
  }

  async getLists(uid: string): Promise<QuerySnapshot<Collections.List>> {
    try {
      return await this.listsCollection.ref.where('uid', '==', uid).get()
    } catch (error) {
      return error;
    }
  }

  setList(list: DocumentReference<Collections.List>) {
    localStorage.setItem("list-id", list.id);
    this.listsCollection.doc(list.id).ref.onSnapshot(l => {
      this.$isClosed.next(l.data().isClosed);
    });
  }

  closeList() {
    localStorage.removeItem("list-id");
  }

  getListId(): string {
    return localStorage.getItem("list-id") || "";
  }
}
