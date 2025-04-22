import {Component, input,} from '@angular/core';
import {Router} from "@angular/router";
import {IPlace} from "../../interfaces/interfaces";
import {PlaceItemComponent} from '../place-item/place-item.component';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-places-list',
  imports: [
    PlaceItemComponent
  ],
  templateUrl: './places-list.component.html',
})

export class PlacesListComponent {
  constructor(
    private router: Router,
    public storageService: StorageService
  ) {}

  placesList  = input<IPlace[] | null>([]);

  isPlaceInWishlist(place: IPlace): boolean {
    return this.storageService.isPlaceInWishlist(place);
  }
  addToWishlist(place: IPlace): void {
    this.storageService.addToWishlist(place);
  }

  removeFromWishlist(place: IPlace): void {
    this.storageService.removeFromWishlist(place);
  }

  selectPlace(place: IPlace): void {
    if(place) {
      this.router.navigate(['/places', place.fsq_id]);
    }
  }
}
