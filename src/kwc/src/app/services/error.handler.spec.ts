import { TestBed } from '@angular/core/testing';
import { ErrorHandler } from './error.handler';

describe('ErrorHandler', () => {
  let service: ErrorHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ErrorHandler] });
    service = TestBed.inject(ErrorHandler);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
