import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Card } from './shared/card.model';
import { Accomplishment } from './shared/accomplishment.model';
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Injectable({providedIn: 'root'})
export class GameService {

  constructor (private httpClient: HttpClient) { }

    private allCards: Card[] = [
        new Card(1, '../assets/images/angular.png'),
        new Card(2, '../assets/images/asp.net.png'),
        new Card(3, '../assets/images/bootstrap.png'),
        new Card(4, '../assets/images/c sharp.png'),
        new Card(5, '../assets/images/C.png'),
        new Card(6, '../assets/images/c++.png'),
        new Card(7, '../assets/images/css.png'),
        new Card(8, '../assets/images/html.png'),
        new Card(9, '../assets/images/java.png'),
        new Card(10, '../assets/images/javascript.png'),
        new Card(11, '../assets/images/jquery.png'),
        new Card(12, '../assets/images/nodejs.png'),
        new Card(13, '../assets/images/php.png'),
        new Card(14, '../assets/images/python.png'),
        new Card(15, '../assets/images/react.png'),
        new Card(16, '../assets/images/sql.png'),
        new Card(17, '../assets/images/visual basic.png'),
        new Card(18, '../assets/images/vue.png')
    ];

    saveAccomplishments(accomplishments: Accomplishment[]): void {
       this.httpClient.put<HttpResponse<Accomplishment[]>>
       ('https://memory-game-d94d3.firebaseio.com/accomplishments.json', accomplishments).subscribe(
         (response) => { },
         (error: HttpErrorResponse) => {
           console.log(error.message);
           console.log(error);
         }
       );
    }

    getAccomplishments(): Observable<Accomplishment[]> {

      return this.httpClient.get<Accomplishment[]>
      ('https://memory-game-d94d3.firebaseio.com/accomplishments.json');
    }

    getCards(boardSize: number): Card[][] {
        let arr: Card[] = [];
        let arrToReturn: Card[][] = [];
        let tempArr: string;

        if (boardSize === 4) {
            tempArr = JSON.stringify(this.allCards.slice(0, 8)); // will contain only the first 8 cards as JSON string
            // then convert the 'tempArr' to JavaScript Object and to duplicate it to the 'arr'
            // that will contain Pair cards
            // NOTE: that i used the JSON for creating new Card instance with new Referance.
            arr = (JSON.parse(tempArr) as Card[]).concat(JSON.parse(tempArr));
            // and then prepare the 'arrToReturn' that sould return matrix Card[][]
            arrToReturn = [
                arr.slice(0, 4),
                arr.slice(4, 8),
                arr.slice(8, 12),
                arr.slice(12, 16)
            ];
            return arrToReturn;
        }
        // same as boardSize === 4 just do this for all cards
        tempArr = JSON.stringify(this.allCards);
        arr = (JSON.parse(tempArr) as Card[]).concat(JSON.parse(tempArr));
        arrToReturn = [
            arr.slice(0, 6),
            arr.slice(6, 12),
            arr.slice(12, 18),
            arr.slice(18, 24),
            arr.slice(24, 30),
            arr.slice(30, 36)
        ];
        return arrToReturn;
    }

    private generateRandom(number: number): number {
        return Math.floor(Math.random() * +number); // will generate random number wich depense of type board
        // example: if the boradType was 4 then it will genrate random number between 0-4 wich 4 not included!
    }

    suffleCards(cards: Card[][], boardSize: number): void {
        for (let i = 0; i < 100; i++) { // run 100 times to suffle.
            const rowToSave = this.generateRandom(boardSize);
            const indexToSave = this.generateRandom(boardSize);
            const cardToSave: Card = cards[rowToSave][indexToSave];

            const row = this.generateRandom(boardSize);
            const index = this.generateRandom(boardSize);
            const secCard: Card = cards[row][index];

            cards[rowToSave][indexToSave] = secCard;
            cards[row][index] = cardToSave;
        }
    }
}
