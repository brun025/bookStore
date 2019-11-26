import { TestBed } from '@angular/core/testing';

import { CardCategoriesService } from './card-categories.service';

describe('CardCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardCategoriesService = TestBed.get(CardCategoriesService);
    expect(service).toBeTruthy();
  });
});
