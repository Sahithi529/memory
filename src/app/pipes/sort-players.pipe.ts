import { Pipe, PipeTransform } from '@angular/core';
import { Accomplishment } from '../shared/accomplishment.model';

@Pipe({
  name: 'sortPlayers',
  pure: false
})
export class SortPlayersPipe implements PipeTransform {

  transform(value: Accomplishment[]): Accomplishment[] {

    const players2Return = value.
    sort((firstPlayer: Accomplishment, secondPlayer: Accomplishment) => { // sort and put the faster at the top

      if (firstPlayer.totalTime < secondPlayer.totalTime) { // if the firstPlayer is faster put him before the secondPlayer.
        return -1;
      } else if (firstPlayer.totalTime > secondPlayer.totalTime) {
        return 1; // if the firstPlayer is slower put him after the secondPlayer.
      }

      return 0; // do nothing if same.
    }).sort((firstPlayer: Accomplishment, secondPlayer: Accomplishment) => { // sort again for 6x6 and 4x4.

      if (firstPlayer.size === secondPlayer.size) { // if same size do nothing
        return 0;
      }

      if (firstPlayer.size === 6) { // if its 6x6 put the firstPlayer before secondPlayer.
        return -1;
      } else { // if its 4x4 put the firstPlayer after secondPlayer.
        return 1;
      }

    });

    return players2Return; // return the sorted array;
  }

}
