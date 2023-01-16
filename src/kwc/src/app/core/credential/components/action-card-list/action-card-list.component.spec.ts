import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AgentCredentialService } from 'src/app/services/issue-credential/agent.credential.service';
import { ActionCardListComponent } from './action-card-list.component';

describe('ManageOfferComponent', () => {
  let component: ActionCardListComponent;
  let fixture: ComponentFixture<ActionCardListComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({
      data: { pipe: () => ({ subscribe: f => f({}) }) }
    });
    const routerStub = () => ({});
    const agentCredentialServiceStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ActionCardListComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        {
          provide: AgentCredentialService,
          useFactory: agentCredentialServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(ActionCardListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`actions has default value`, () => {
    expect(component.actions).toEqual([]);
  });
});
