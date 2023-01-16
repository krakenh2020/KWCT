import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PresentationCardComponent } from './presentation-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProtocolDetailDialogService } from 'src/app/shared/components/dialog-detail/protocol-detail-dialog.service';
import { AgentProofService } from 'src/app/services/present-proof/agent.proof.service';
import { MatDialogModule } from "@angular/material/dialog";
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';

describe('CredentialCardComponent', () => {
  let component: PresentationCardComponent;
  let fixture: ComponentFixture<PresentationCardComponent>;
  let mocklogger = jasmine.createSpyObj('NGXLogger', ['info'])

  const mockAgentProofService = () => ({
    removePresentationByName: () => of<any>({ result: "aFakeResult"})
  });

  const mockProtocolDetailDialogService = () => ({
    openDialog: () => ( null )
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({

      imports:  [RouterTestingModule, HttpClientTestingModule, MatDialogModule ],
      declarations: [ 
        PresentationCardComponent
      ],
      providers: [
        { provide: ProtocolDetailDialogService, useFactory: mockProtocolDetailDialogService },
        { provide: NGXLogger, useValue: mocklogger },
        { AgentProofService, useFactory: mockAgentProofService}
      ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(PresentationCardComponent);
    fixture.detectChanges();
    TestBed.inject(ProtocolDetailDialogService);
    TestBed.inject(AgentProofService);

    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it( 'removePresentationByName works', () => {

    component.ngOnInit();
    expect( component.removePresentationByName("AFakeName")).toBeDefined;
  });

  it( 'getDetail works', () => {

    component.verifiedPresentation = { description: "aFakePresentation" };
    expect( component.getDetail()).toBeUndefined();
  })
});
