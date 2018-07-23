import { TestBed, inject } from '@angular/core/testing';

import { AddNewProductServiceService } from './add-new-product-service.service';

describe('AddNewProductServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddNewProductServiceService]
    });
  });

  it('should be created', inject([AddNewProductServiceService], (service: AddNewProductServiceService) => {
    expect(service).toBeTruthy();
  }));
});
