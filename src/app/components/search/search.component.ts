import {Component, OnInit, signal} from '@angular/core';
import { PlacesService } from '../../services/places.service';
import {FormsModule} from "@angular/forms";
import {PlacesListComponent} from "../places-list/places-list.component";
import {IPlace} from "../../interfaces/interfaces";
import {take} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  imports: [
    FormsModule,
    PlacesListComponent,
  ],
})
export class SearchComponent {
  searchQuery: string = 'Dnipro';
  coordinates ='48.2800,35.0105';
  searchResults = signal<IPlace[] | null>([])
  isLoading = signal<boolean>(false);

  constructor(
    private placesService: PlacesService
  ) {}


  onSearch(): void {
    if (this.searchQuery) {
      this.isLoading.set(true);
      this.placesService.searchPlaces(this.searchQuery, this.coordinates)
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.isLoading.set(false);
            this.searchResults.set(data?.results);
          },
          error: (error) => {
            console.error('Error fetching places list:', error);
          }
        });
    }
  }
}
