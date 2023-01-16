import { TestBed } from '@angular/core/testing';
import { AgentProofService } from 'src/app/services/present-proof/agent.proof.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PresentProofActionResolverService } from './present-proof-action-resolver.service';
import { of } from 'rxjs';

describe('PresentProofActionResolverService', () => {
  let service: PresentProofActionResolverService;

  beforeEach(() => {
    const agentProofServiceStub = () => ({
      getPresentProofActions: () => of<any[]>([

             {"PIID":"434caaa8-06c8-4b1f-b747-e97bca446c62","Msg":{"@id":"434caaa8-06c8-4b1f-b747-e97bca446c62","@type":"https://didcomm.org/present-proof/2.0/request-presentation","comment":"ultima","~thread":{"thid":"434caaa8-06c8-4b1f-b747-e97bca446c62"}},"MyDID":"did:peer:1zQmbvTWKSnLTUYuMfbQa3G1sC4dM36vMUK74RQkmtbYqPxp","TheirDID":"did:peer:1zQmb9vffi2yxu76MAVrbJv7937q6znavz4zAmz39g4YAtpx"},
             {"PIID":"4d306f63-dfce-4c66-8168-dccf8880c810","Msg":{"@id":"4d306f63-dfce-4c66-8168-dccf8880c810","@type":"https://didcomm.org/present-proof/2.0/request-presentation","comment":"send me a presentation","~thread":{"thid":"4d306f63-dfce-4c66-8168-dccf8880c810"}},"MyDID":"did:peer:1zQmNzBc5L5BFttZXa6PzSujrwE2Gb8qZBXrcSnE4Tds3TBE","TheirDID":"did:peer:1zQmZtwLzM3ooMtfuYZqTsKVor2RhJMJK8mGzne8Xd331Pwy"},
             {"PIID":"559867a0-0528-4883-88d4-e8cbb6734b64","Msg":{"@id":"559867a0-0528-4883-88d4-e8cbb6734b64","@type":"https://didcomm.org/present-proof/2.0/request-presentation","comment":"please, provide me your eID Credential","~thread":{"thid":"559867a0-0528-4883-88d4-e8cbb6734b64"}},"MyDID":"did:peer:1zQmXYffU8x71ksrmae2Y2bUVKMts6YxoTTiFbcr4CPWW5Rt","TheirDID":"did:peer:1zQmRwQ6eP4VqSUktZUYTwoDgA86oNGTatyz6XRAmWa7Ai27"},
             {"PIID":"af29c530-dbb3-45dc-bf96-daa16fe0583a","Msg":{"@id":"af29c530-dbb3-45dc-bf96-daa16fe0583a","@type":"https://didcomm.org/present-proof/2.0/request-presentation","comment":"please, provide me your eID Credential","~thread":{"thid":"af29c530-dbb3-45dc-bf96-daa16fe0583a"}},"MyDID":"did:peer:1zQmdUVK21viUfLEo2esjB9cvqpsV7uE57duu7M8h9UeBMXP","TheirDID":"did:peer:1zQmc1vFfvndHejB9RUPrPxrdtvR3kQTBrfdNUC596ZDM2gp"},
             {"PIID":"c3c96b68-73f1-42c7-ad99-ae18ceb2ff82","Msg":{"@id":"c3c96b68-73f1-42c7-ad99-ae18ceb2ff82","@type":"https://didcomm.org/present-proof/2.0/request-presentation","comment":"please, provide me your eID Credential","~thread":{"thid":"c3c96b68-73f1-42c7-ad99-ae18ceb2ff82"}},"MyDID":"did:peer:1zQmaWkoGA2D7cKcvJPKgc5oNjFtxMmkktFspSKk95hV5w62","TheirDID":"did:peer:1zQmQDCWrMjpkpJEmCNsqG4kHk8p2kjMn71hHb4i7HUgR7BF"},
      ])
    });
    const activatedRouteStub = () => ({});
    TestBed.configureTestingModule({
      providers: [
        PresentProofActionResolverService,
        { provide: AgentProofService, useFactory: agentProofServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub }
      ]
    });
    service = TestBed.inject(PresentProofActionResolverService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`actions has default value`, () => {
    expect(service.actions).toEqual([]);
  });

  it(`ACCEPT_PRESENTATION_REQUEST_TYPE has default value`, () => {
    expect(service.ACCEPT_PRESENTATION_REQUEST_TYPE).toEqual(
      `https://didcomm.org/present-proof/2.0/request-presentation`
    );
  });

  it(`ACCEPT_PRESENTATION_TYPE has default value`, () => {
    expect(service.ACCEPT_PRESENTATION_TYPE).toEqual(
      `https://didcomm.org/present-proof/2.0/presentation`
    );
  });

  describe('resolve actions', () => {

    it('resolve accept-presentation-request actions', () => {
      const agentProofServiceStub: AgentProofService = TestBed.inject(
        AgentProofService
      );
      const activatedRouteSnapshotStub: ActivatedRouteSnapshot = <any>{routeConfig: { path: 'accept-presentation-request'}};
      const routerStateSnapshotStub: RouterStateSnapshot = <any>{};
      spyOn(agentProofServiceStub, 'getPresentProofActions').and.callThrough();
      service.resolve(activatedRouteSnapshotStub, routerStateSnapshotStub).subscribe( val => {
        expect( val.length).toBe(5);
      })
    
    });
    it('resolve accept-presentation actions', () => {
      const agentProofServiceStub: AgentProofService = TestBed.inject(
        AgentProofService
      );
      const activatedRouteSnapshotStub: ActivatedRouteSnapshot = <any>{routeConfig: { path: 'accept-presentation'}};
      const routerStateSnapshotStub: RouterStateSnapshot = <any>{};
      spyOn(agentProofServiceStub, 'getPresentProofActions').and.callThrough();
      service.resolve(activatedRouteSnapshotStub, routerStateSnapshotStub).subscribe( val => {
        expect( val.length).toBe(0);
      })
    
    });
  });
});
