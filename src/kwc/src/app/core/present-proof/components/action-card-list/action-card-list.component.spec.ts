import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AgentProofService } from '../../../../services/present-proof/agent.proof.service';
import { ActivatedRoute } from '@angular/router';
import { ActionCardListComponent } from './action-card-list.component';

describe('ActionCardListComponent', () => {
  let component: ActionCardListComponent;
  let fixture: ComponentFixture<ActionCardListComponent>;

  beforeEach(() => {
    const agentProofServiceStub = () => ({});
    const activatedRouteStub = () => ({
      data: { pipe: () => ({ subscribe: f => f({}) }) }
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ActionCardListComponent],
      providers: [
        { provide: AgentProofService, useFactory: agentProofServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub }
      ]
    });
    fixture = TestBed.createComponent(ActionCardListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`presentations has default value`, () => {
    expect(component.presentations).toEqual([]);
  });
});
