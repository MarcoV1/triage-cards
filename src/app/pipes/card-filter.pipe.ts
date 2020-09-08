import { Pipe, PipeTransform } from '@angular/core';
import {ICards} from '../models/cards.interface';

@Pipe({
  name: 'cardFilter'
})
export class CardFilterPipe implements PipeTransform {

  transform(cards: ICards[], filter: string): any {
    if (!cards || !filter) {
      return cards;
    }
    // filter cards array by word filter
    // this is done either by patient name, or by any arrhytmia in the arrhytmias array
    return cards.filter(card => card.patient_name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
        || card.arrhythmias.find(arr => arr.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ));
  }

}
