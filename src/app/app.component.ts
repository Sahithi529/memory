import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';

import { Card } from './shared/card.model';
import { Accomplishment } from './shared/accomplishment.model';
import { GameService } from './game.service';
import { PlayerDialogComponent } from './dialogs/player-dialog/player-dialog.component';

import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('in', [
      transition('void => *', [
        style({
          transform: 'rotate(360deg) scale(0)'
        }),
        animate(1000, style({
          transform: 'rotate(0) scale(1)'
        }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  constructor(private gameService: GameService,
              private dialog: MatDialog) {}

  boardSize = '4'; // stored as string to set a default value to Select input (if as a number it won't work).
  cards: Card[][] = [];
  showLoading = false;
  isGameRunning = false;
  isGameOver = false;
  clickedCard: Card; // this is the first card was clicked, after well compared with the second card.
  clicks = 0; // count the clicks. (maximum 2)
  delayTimer;

  players: Accomplishment[] = [];
  startedTime: number; // this will hold the started time as milliseconds.

  countInterval: any;
  seconds = 0;
  minutes = 0;

  ngOnInit(): void { // getting the accomplishments from the server (firebase) if there is.
    this.gameService.getAccomplishments().
    subscribe(
      (players) => {
        if (players !== null) {
          this.players = players;
        }
      }, (error: HttpErrorResponse) => { // log to the console in error case.
        console.log(error.message);
        console.log(error);
      }
    );
  }

  onStart(): void {
    const tempCards = this.gameService.getCards(+this.boardSize); // get the cards as a completely new instances.
    this.gameService.suffleCards(tempCards, +this.boardSize); // then suffle the Cards.

    this.isGameOver = false;
    this.showLoading = true;
    this.isGameRunning = true;

    this.delayTimer = setTimeout(() => {
        this.cards = tempCards; // setting the 'Real Cards' to the tempCards.
        this.showLoading = false;
        this.startedTime = new Date().getTime(); // current time stored as milliseconds as we said.

        this.countInterval = setInterval(() => { // just a simple timer to out put to the user.
          this.seconds++;
          if (this.seconds === 59) {
            this.seconds = 0;
            this.minutes++;
          }
        }, 1000);

      }, 3000);

  }

  onStop(): void { // reset all
    this.cards = [];
    this.isGameRunning = this.showLoading = false;
    this.clicks = this.seconds = this.minutes = 0;
    clearTimeout(this.delayTimer);
    clearInterval(this.countInterval);
  }

  onClick(card: Card): void {
    // if the user click twice and the card didn't succeed
    if (this.clicks < 2 && !card.succeed) {
      this.clicks++;
      card.showImage = true; // show the 'Real' card image
      if (this.clicks === 1) { // in the first click save the card to property 'clickedCard'
        this.clickedCard = card;
      } else if (this.clicks === 2) { // if it's the second click...
        if (this.clickedCard === card) { // if the user clicked on exact the same card (checking by its reference object)
          this.clicks--; // so he be able to click on another card.
          return;
        }
        if (this.clickedCard.ID === card.ID) { // on success

          setTimeout(() => {
            this.clicks = 0;
            this.clickedCard.succeed = true; // put the card as succeed state to true
            card.succeed = true; // put the card as succeed state to true
            if (this.isGameFinished() === true) { // check every time on success if the game is finished (all cards succeed)
              this.onFinished();
            }
          }, 400);

        } else { // on fail

          setTimeout(() => {
            this.clicks = 0; // reset the clicks
            this.clickedCard.showImage = false; // reverse the card
            card.showImage = false; // reverse the card
          }, 800);

        }
      }
    }

  }

  isGameFinished(): boolean {
    if (this.cards[0] === undefined) { // this is to avoid error which happens at the beginning.
      return false;
    }

    for (let i = 0; i < +this.boardSize; i++) { // run on all rows.

      if (this.cards[i].every((card: Card) => { // run every card in that row.
        if (card.succeed === false) { // if some card didn't succeed yet return false, which mean the game is not over.
          return false;
        }
        return true; // if the card succeed return true to keep checking in the next card.
      }) === false) { // if the function every return false which mean some card didn't succeed return false and exit from the function.
        return false;
      }

    }
    return true; // if all passed success (no return false happened) return true, which mean the game IS Over!.
  }

  // get the fastest Accomplishment.
  getTheFastest(boardSize: number): number {
    const accomplishment = this.players.find((player) => {
      return player.size === boardSize;
      // remember the array is already sorted, so all we need is the find the first player with same boardSize which is the fastest.
    });

    if (accomplishment === undefined) { // if there is no accomplishment return some bigggg number.
      return 99999999999999;
    }

    return accomplishment.totalTime;
  }

  onFinished(): void {
    const min = this.minutes;
    const sec = this.seconds;

    this.isGameOver = true;
    this.isGameRunning = false;
    this.clicks = this.seconds = this.minutes = 0;
    this.cards = [];
    clearInterval(this.countInterval);
    const tTime = new Date().getTime() - this.startedTime; // totalTime as milliseconds.

    if (tTime < this.getTheFastest(+this.boardSize)) { // if the new accomplishment is faster.
      const dialogRef = this.dialog.open(PlayerDialogComponent, { hasBackdrop: false, data: min + ':' + sec });

      dialogRef.afterClosed().subscribe(
        (name: string) => {
          if (name.length > 3) {
            this.players.push({ // push a new Accomplishment
              name: name,
              size: +this.boardSize,
              totalTime: tTime,
              minutes: min,
              seconds: sec
            });
            this.gameService.saveAccomplishments(this.players); // save all
          }
        });
      }

  }

}
