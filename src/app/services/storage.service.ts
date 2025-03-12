import { Injectable } from '@angular/core';
import {IPlace} from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private wishlistKey = 'wishlist';

  getWishlist(): IPlace[] {
    const wishlist = localStorage.getItem(this.wishlistKey);
    return wishlist ? JSON.parse(wishlist) : [];
  }

  addToWishlist(place: IPlace): void {
    const wishlist = this.getWishlist();
    const isAlreadyAdded = wishlist.some((item) => item.fsq_id === place.fsq_id);

    if (!isAlreadyAdded) {
      wishlist.push(place);
      localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
    }
  }

  removeFromWishlist(place: IPlace): void {
    let wishlist = this.getWishlist();
    wishlist = wishlist.filter((item) => item.fsq_id !== place.fsq_id);
    localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
  }

  isPlaceInWishlist(place: IPlace): boolean {
    const wishlist = this.getWishlist();
    return wishlist.some((item) => item.fsq_id === place.fsq_id);
  }

}

