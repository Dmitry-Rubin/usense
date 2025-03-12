import {Component, EventEmitter, input, Output} from '@angular/core';
import {IPlace} from '../../interfaces/interfaces';

@Component({
  selector: 'app-place-item',
  templateUrl: './place-item.component.html',
  styleUrl: './place-item.component.scss'
})
export class PlaceItemComponent {
  @Output() onSelectPlace = new EventEmitter<IPlace>();

  place  = input<IPlace | null>(null);

  selectPlaceItem(event: IPlace) {
    this.onSelectPlace.emit(event)
  }
}
