import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { AcceptConnectionComponent } from "./accept-connection.component";
import { AgentConnectionService } from 'src/app/services/connection/agent.connection.service';
import { FormBuilder} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { nextTick } from 'process';
import { ConnectionComponent} from '../connection/connection.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';


describe("AcceptConnectionComponent", () => {
  let component: AcceptConnectionComponent;
  let fixture: ComponentFixture<AcceptConnectionComponent>;
  let myService: AgentConnectionService;

  const routerSpy = jasmine.createSpyObj('Router', ['connections]']);
   
  const mockAgentConnectionService: Partial<AgentConnectionService>  = {
    getConnections: () => of<any[]>(
       [
        {
      ConnectionID: "1167d44b-bcc9-4cd3-a9fc-851a1bc2b4f8",
      State: "completed",
      ThreadID: "7db2e875-60b3-4c9e-b0eb-87a008cf0118",
      ParentThreadID: "",
      TheirLabel: "Depute Connection",
      TheirDID: "did:peer:1zQmTNMnZ7oY1YQvfLGTYnJUDemMVVdjb2romgXoWLr2Ut3Q",
      MyDID: "did:peer:1zQmPyNK3meyDfKQR475frYmNGQeLpEvXpG5sCpgebve76xp",
      ServiceEndPoint: "https://kraken-depute-agent.its-lab-infocert.it:443",
      RecipientKeys: ["did:key:z6MkoiVQ9tzit4oWNb2a7xTQMwG87JKAVk6h6gRhmZ4briPc"],
      RoutingKeys: null,
      InvitationID: "7db2e875-60b3-4c9e-b0eb-87a008cf0118",
      InvitationDID: "",
      Implicit : false,
      Namespace: "my",
      MediaTypeProfiles: null,
      DIDCommVersion: "v1",
      PeerDIDInitialState: ""
         }
       ]),
      
      receiveInvitation: () => of({})
      }
  
      
  
   beforeEach(async () => {

    let myService: AgentConnectionService;
    const agentConnectionServiceStub = () => ({
        
    });

    await TestBed.configureTestingModule({
      declarations: [AcceptConnectionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        {
          provide: AgentConnectionService,
          useObjetc: mockAgentConnectionService
        },
        { provide: Router, useValue: routerSpy }
      ],
      imports: [ ReactiveFormsModule, HttpClientModule ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    myService = TestBed.inject(AgentConnectionService);
    TestBed.inject(FormBuilder);
  
  });

 
  
  describe('on submit works', () => {
    it('on submit works ...', fakeAsync ( async () => {

      // mocking cut&paste in the control

      
      component.ngOnInit();
      component.form.controls
      component.form.controls.invitationLabel.setValue('fakeDescription')
      component.form.controls.invitationUrl.setValue(' ');
      component.form.controls.invitation.setValue(JSON.stringify({
        "invitation": {
          "serviceEndpoint": "https://kraken-server-agent.its-lab-infocert.it:443",
          "recipientKeys": [
            "did:key:z6MksrF8yhaxL4y8MVNQtcXHqgfGJmLJfB2kaukW49ppq91N"
          ],
          "@id": "6112e879-8e1a-4d2c-8a0e-d4883dac26f1",
          "label": "server.agent",
          "@type": "https://didcomm.org/didexchange/1.0/invitation"
        },
        "alias": "",
        "invitation_url": ""
      }));

      component.form.controls.invitation.markAsDirty();
      tick(1000);
      let router = fixture.debugElement.injector.get(Router);
      
      fixture.detectChanges();
      // let buttonSubmit = fixture.debugElement.query( By.css('btn btn-primary btn-lg btn-block'));
      let buttonSubmitText = fixture.debugElement.query( By.css('#submitAC')).nativeElement.innerText;
      expect( buttonSubmitText ).not.toBeUndefined();
      //expect( buttonSubmit).toBeNull();
      }));
  }); 
})