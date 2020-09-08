import { TestBed } from '@angular/core/testing';

import { CardService } from './card.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule],
    providers: []
  }));

  it('should be created', () => {
    const service: CardService = TestBed.get(CardService);
    expect(service).toBeTruthy();
  });
});
