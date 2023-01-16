import { TestBed } from '@angular/core/testing';
import { AgentCredentialService } from 'src/app/services/issue-credential/agent.credential.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ActionResolverService } from './action-resolver.service';
import { of } from 'rxjs';

describe('ActionResolverService', () => {
  let service: ActionResolverService;

  beforeEach(() => {
    const agentCredentialServiceStub = () => ({
      getPiid: () => of<any[]>(
        [
          {"PIID":"c23dd85d-0796-4ccb-89b5-ad97ecca9329","Msg":{"@id":"3a4167e4-5512-4dd0-ba88-ce1b57bd0817","@type":"https://didcomm.org/issue-credential/2.0/request-credential","requests~attach":[{"data":{"links":["https://raw.githubusercontent.com/krakenh2020/vc-schemas/main/DegreeVCSchema.json"]},"description":"SampleKRAKENDegree"}],"~thread":{"thid":"c23dd85d-0796-4ccb-89b5-ad97ecca9329"},"~transport":{"~return_route":"all"}},"MyDID":"did:peer:1zQmcgNPEGzTZe16bNF3jnG7rtyA4DkQeGSkkEtKomQiZNoa","TheirDID":"did:peer:1zQmW5mvKvXKp6qhW83tLhhgDvDXv81R3ixSDQknJXBeE2tR"}
        ]) 
    });
    const activatedRouteStub = () => ({});
    TestBed.configureTestingModule({
      providers: [
        ActionResolverService,
        {
          provide: AgentCredentialService,
          useFactory: agentCredentialServiceStub
        },
        { provide: ActivatedRoute, useFactory: activatedRouteStub }
      ]
    });
    service = TestBed.inject(ActionResolverService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`actions has default value`, () => {
    expect(service.actions).toEqual([]);
  });

  it(`OFFER_CREDENTIAL_TYPE has default value`, () => {
    expect(service.OFFER_CREDENTIAL_TYPE).toEqual(
      `https://didcomm.org/issue-credential/2.0/offer-credential`
    );
  });

  it(`REQUEST_CREDENTIAL_TYPE has default value`, () => {
    expect(service.REQUEST_CREDENTIAL_TYPE).toEqual(
      `https://didcomm.org/issue-credential/2.0/request-credential`
    );
  });

  it(`ACCEPT_REQUEST_TYPE has default value`, () => {
    expect(service.ACCEPT_REQUEST_TYPE).toEqual(
      `https://didcomm.org/issue-credential/2.0/issue-credential`
    );
  });

  describe('resolve actions', () => {
    it('resolve offer-credential actions', () => {
      const agentCredentialServiceStub: AgentCredentialService = TestBed.inject(
        AgentCredentialService
      );
      const activatedRouteSnapshotStub: ActivatedRouteSnapshot = <any>{routeConfig: { path: 'accept-offer'}};
      const routerStateSnapshotStub: RouterStateSnapshot = <any>{};
      spyOn(agentCredentialServiceStub, 'getPiid').and.callThrough();
      service.resolve(activatedRouteSnapshotStub, routerStateSnapshotStub).subscribe( val => {
        expect( val.length).toBe(0);
      })
    //  expect(agentCredentialServiceStub.getPiid).toHaveBeenCalled();
    });

    it('resolve actions of type request-credential', () => {
      const agentCredentialServiceStub: AgentCredentialService = TestBed.inject(
        AgentCredentialService
      );
      const activatedRouteSnapshotStub: ActivatedRouteSnapshot = <any>{routeConfig: { path: 'accept-request'}};
      const routerStateSnapshotStub: RouterStateSnapshot = <any>{};
      spyOn(agentCredentialServiceStub, 'getPiid').and.callThrough();
      service.resolve(activatedRouteSnapshotStub, routerStateSnapshotStub).subscribe( val => {
        expect( val.length).toBe(1);
      })
    //  expect(agentCredentialServiceStub.getPiid).toHaveBeenCalled();
    });

    it('resolve actions of type issue-credential', () => {
      const agentCredentialServiceStub: AgentCredentialService = TestBed.inject(
        AgentCredentialService
      );
      const activatedRouteSnapshotStub: ActivatedRouteSnapshot = <any>{routeConfig: { path: 'accept-credential'}};
      const routerStateSnapshotStub: RouterStateSnapshot = <any>{};
      spyOn(agentCredentialServiceStub, 'getPiid').and.callThrough();
      service.resolve(activatedRouteSnapshotStub, routerStateSnapshotStub).subscribe( val => {
        expect( val.length).toBe(0);
      })
    //  expect(agentCredentialServiceStub.getPiid).toHaveBeenCalled();
    });
  });
});
