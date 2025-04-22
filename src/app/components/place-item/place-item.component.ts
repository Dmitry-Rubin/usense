import {Component, EventEmitter, input, output, Output} from '@angular/core';
import {IPlace} from '../../interfaces/interfaces';

@Component({
  selector: 'app-place-item',
  templateUrl: './place-item.component.html',
})
export class PlaceItemComponent {
  onSelectPlace = output<IPlace>();

  place  = input<IPlace | null>(null);

  selectPlaceItem(event: IPlace) {
    this.onSelectPlace.emit(event)
  }
}
