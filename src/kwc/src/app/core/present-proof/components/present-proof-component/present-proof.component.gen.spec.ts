import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { PresentProofComponent } from './present-proof.component';

describe('PresentProofComponent', () => {
  let component: PresentProofComponent;
  let fixture: ComponentFixture<PresentProofComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PresentProofComponent]
    });
    fixture = TestBed.createComponent(PresentProofComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
