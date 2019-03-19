import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Card } from '../shared/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('effect', [
      transition('void => *', [ // when the cards are showen
        style({
          opacity: 0,
          transform: 'scale(0)'
        }),
        animate(500, style({
          opacity: 1,
          transform: 'scale(1)'
        }))
      ]),
      transition('* => void', [ // when the cards are removed (on a success match)
        animate(300, style({
          transform: 'scale(0.5)',
          opacity: 0
        }))
      ]),

      state('reverse', style({
        transform: 'rotateY(180deg)' // by default the card will be reversed
      })),
      state('normal', style({
        transform: 'rotateY(0deg)'
      })),
      transition('normal => reverse', animate(150)),
      transition('reverse => normal', animate(250)),

    ]),
  ]
})
export class CardComponent {

  @Input() card: Card;

  constructor() { }

}
