// ID - will contain the indentity number.
// image - will contain the real card image path.
// ------- The Default Values -------
// defaultImage - .. the default image.
// showImage - if false show the default image else show the real card 'image'.
// succeed - property wich tell if the card was succeed (matchs with the other card).
export class Card {
    constructor (public ID: number, public image: string,
        public defaultImage: string = '../../assets/images/default.jpg', public showImage: boolean = false,
        public succeed: boolean = false) {}
}
