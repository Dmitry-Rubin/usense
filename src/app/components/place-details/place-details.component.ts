import {Component, computed, OnInit, signal} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacesService } from '../../services/places.service';
import { StorageService } from '../../services/storage.service';
import {IPlace} from "../../interfaces/interfaces";

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
})
export class PlaceDetailsComponent implements OnInit {
  place = signal<IPlace | null>(null);
  isLoading = signal<boolean>(false)
  wishlist = signal<IPlace[]>([]);
  isPlaceInWishlist = computed(() => (place: IPlace) =>
    this.wishlist().some((item) => item?.fsq_id === place?.fsq_id)
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.getPlaceDetails()
    this.updateWishList()
  }

  addToWishlist(place: IPlace): void {
    this.storageService.addToWishlist(place);
    this.updateWishList()
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  goWishListPage(): void {
    this.router.navigate(['wishlist']);
  }

  private updateWishList(): void {
    this.wishlist.set(this.storageService.getWishlist());
  }

  private getPlaceDetails(): void {
    const fsq_id = this.route.snapshot.paramMap.get('id');
    this.isLoading.set(true);
    if (fsq_id) {
      this.placesService.getPlaceDetails(fsq_id).subscribe({
        next: (place) => {
          this.isLoading.set(false);
          this.place.set(place)
        },
        error: () => this.router.navigate(['/'])
      });
    } else {
      this.router.navigate(['/']);
    }
  }
}
