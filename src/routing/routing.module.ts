import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListGuard } from "./guards/list.guard";
import { HomeGuard } from "./guards/home.guard";

import { HomeComponent } from "src/components/home/home.component";
import { ListComponent } from "src/components/list/list.component";
import { NotFoundComponent } from "src/components/not-found/not-found.component";
import { AllListsComponent } from "src/components/list/all-lists/all-lists.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  { path: "not-found/:error", component: NotFoundComponent },
  { path: "home", component: HomeComponent, canActivate: [HomeGuard] },
  {
    path: "list",
    children: [
      {
        path: "",
        component: ListComponent,
        canActivate: [ListGuard],
      },
      { 
        path: ":listId",
        component: ListComponent,
        canActivate: [ListGuard],
      },
      {
        path: 'all/:userId',
        component: AllListsComponent
      }
    ]
  },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
