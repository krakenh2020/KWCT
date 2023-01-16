import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AgentProofService } from 'src/app/services/present-proof/agent.proof.service';
import { ActivatedRoute } from '@angular/router';
import { PresentationListComponent } from './presentation-list.component';

describe('PresentationListComponent', () => {
  let component: PresentationListComponent;
  let fixture: ComponentFixture<PresentationListComponent>;

  beforeEach(() => {
    const agentProofServiceStub = () => ({});
    const activatedRouteStub = () => ({
      data: { pipe: () => ({ subscribe: f => f({}) }) }
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PresentationListComponent],
      providers: [
        { provide: AgentProofService, useFactory: agentProofServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub }
      ]
    });
    fixture = TestBed.createComponent(PresentationListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`presentations has default value`, () => {
    expect(component.presentations).toEqual([]);
  });
});
