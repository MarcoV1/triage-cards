import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CardListComponent} from './card-list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CardFilterPipe} from '../../pipes/card-filter.pipe';
import {CARD_STATUS, ICards} from '../../models/cards.interface';
import {By} from '@angular/platform-browser';


const testCard: ICards =  {
    arrhythmias: [
      'AFib',
      'AV Block',
      'Pause',
      'PSVC',
      'PVC'
    ],
    created_date: '2020-03-10T13:14:59+0000',
    id: 0,
    patient_name: 'Bob',
    status: CARD_STATUS.PENDING
  };

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, DragDropModule, HttpClientTestingModule ],
      declarations: [ CardListComponent, CardFilterPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a card to the pending cards array', () => {
    component.pendingCards.push(testCard);
    expect(component.pendingCards.length).toBeGreaterThanOrEqual(1);
  });

  it('should remove a card from rejected cards array', () => {
    component.rejectedCards.push(testCard);
    component.rejectedCards.pop();
    expect(component.rejectedCards.length).toBeLessThan(1);
  });


  it('should check if input ngmodel two way binding is correct', () => {
    const input = fixture.debugElement.query(By.css('input'));
    const el = input.nativeElement;
    el.value = 'pause';
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const value = component.filteredValue;
    expect(value).toBe('pause');
  });

});
