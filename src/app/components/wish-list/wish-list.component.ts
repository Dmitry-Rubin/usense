import {Component, OnInit, signal} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {IPlace} from "../../interfaces/interfaces";
import {Router} from "@angular/router";
import {PlaceItemComponent} from '../place-item/place-item.component';

@Component({
  selector: 'app-wish-list',
  imports: [
    PlaceItemComponent
  ],
  templateUrl: './wish-list.component.html',
})
export class WishListComponent implements OnInit {
  wishlist = signal<IPlace[]>([]);

  constructor(
    private storageService: StorageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.wishlist.set(this.storageService.getWishlist());
  }

  removeFromWishlist(place: IPlace): void {
    this.storageService.removeFromWishlist(place);
    this.wishlist.set(this.storageService.getWishlist())
  }

  goToMainPage():void {
    this.router.navigate(['/']);
  }

  selectPlace(place: IPlace): void {
    if(place) {
      this.router.navigate(['/places', place.fsq_id]);
    }
  }
}
