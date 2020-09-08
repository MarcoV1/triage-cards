import {AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CardService} from '../../services/card.service';
import {takeWhile} from 'rxjs/operators';
import {CARD_STATUS, ICards} from '../../models/cards.interface';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit, OnDestroy, AfterViewChecked {

  private inView = true;
  filteredValue: string;
  public cards: ICards[] = [];
  pendingCards: ICards[] = [];
  rejectedCards: ICards[] = [];

  constructor(private cardService: CardService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getCards();
  }

  ngOnDestroy() {
    this.inView = false;
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  onDrop(event: CdkDragDrop<ICards[]>) {
    // in case the item goes from done to the to do pile
    if (event.item.data.status === CARD_STATUS.DONE) {
      console.log('rejected', event.item.data);

      event.item.data.status = CARD_STATUS.REJECTED;
    } else if (event.item.data.status === CARD_STATUS.PENDING ||
      event.item.data.status === CARD_STATUS.REJECTED) {
      // else the item goes from pending to done
      console.log('done', event.item.data);

      event.item.data.status = CARD_STATUS.DONE;
    }



    //   const cardData: ICards = event.container.data;
 //   cardData.status === CARD_STATUS.DONE;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


  getCards() {
    this.cardService.searchCards()
      .pipe(takeWhile(() => this.inView))
      .subscribe( (cards: ICards[]) => {
        console.log('res', cards);
        this.cards = cards;
        this.pendingCards = this.cards.filter(card => (card.status === CARD_STATUS.PENDING || card.status === CARD_STATUS.REJECTED));
        this.rejectedCards = this.cards.filter(card => (card.status === CARD_STATUS.DONE));

      });
  }

  get cardStatus() {
    return CARD_STATUS;
  }
}
