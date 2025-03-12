import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import {PlaceDetailsComponent} from "./components/place-details/place-details.component";
import {WishListComponent} from "./components/wish-list/wish-list.component";

export const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'places/:id', component: PlaceDetailsComponent },
  { path: 'wishlist', component: WishListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
