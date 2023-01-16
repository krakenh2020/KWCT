import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NewConnectionComponent } from "./new-connection.component";
import { AgentConnectionService } from 'src/app/services/connection/agent.connection.service';
import { of } from 'rxjs';

describe("NewConnectionComponent", () => {
  let component: NewConnectionComponent;
  let fixture: ComponentFixture<NewConnectionComponent>;
  let myService: AgentConnectionService;

  beforeEach(async () => {

    const agentConnectionServiceStub = () => ({

      createInvitation: () => of({
        "invitation": {
          "serviceEndpoint": "https://kraken-server-agent.its-lab-infocert.it:443",
          "recipientKeys": ["did:key:z6MkjFZMTeGKagUVPYQL8KtA6edQW12PCqwgKxKD46Lr81mJ"],
          "@id": "65902b43-377e-47ab-9860-8abd8f3686d7",
          "label": "server.agent",
          "@type": "https://didcomm.org/didexchange/1.0/invitation"
        },
        "alias": "",
        "invitation_url": ""
      })

    });

    await TestBed.configureTestingModule({
      declarations: [NewConnectionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: AgentConnectionService,
          useFactory: agentConnectionServiceStub
        },
      ],
      imports: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    myService = TestBed.inject(AgentConnectionService);
  });

  describe('should create', () => {
    it('should create..', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('createInvitation works', () => {
    it('onSubmit works..', () => {
      expect(component.onSubmit()).toBeUndefined();
    });
  });
})