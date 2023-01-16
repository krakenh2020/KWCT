import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { AgentConnectionService } from '../../services/connection/agent.connection.service';
import { ConnectionResolverService } from './connection-resolver.service';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConnectionResolverService', () => {
  let service: ConnectionResolverService;
  const mockGetConnectionReturnValue = [

      {
        "ConnectionID": "1167d44b-bcc9-4cd3-a9fc-851a1bc2b4f8",
        "State": "completed",
        "ThreadID": "7db2e875-60b3-4c9e-b0eb-87a008cf0118",
        "ParentThreadID": "",
        "TheirLabel": "Depute Connection",
        "TheirDID": "did:peer:1zQmTNMnZ7oY1YQvfLGTYnJUDemMVVdjb2romgXoWLr2Ut3Q",
        "MyDID": "did:peer:1zQmPyNK3meyDfKQR475frYmNGQeLpEvXpG5sCpgebve76xp",
        "ServiceEndPoint": "https://kraken-depute-agent.its-lab-infocert.it:443",
        "RecipientKeys": ["did:key:z6MkoiVQ9tzit4oWNb2a7xTQMwG87JKAVk6h6gRhmZ4briPc"],
        "RoutingKeys": null,
        "InvitationID": "7db2e875-60b3-4c9e-b0eb-87a008cf0118",
        "InvitationDID": "",
        "Implicit": false,
        "Namespace": "my",
        "MediaTypeProfiles": null,
        "DIDCommVersion": "v1",
        "PeerDIDInitialState": ""
      },
      {
        "ConnectionID": "b863a9fa-8ca0-4b0f-bfa6-98e3035ed20d",
        "State": "completed",
        "ThreadID": "929051a8-4f9f-4255-b76a-f1b32198f1bc",
        "ParentThreadID": "",
        "TheirLabel": "",
        "TheirDID": "did:peer:1zQmWCLdwzBFhjWJMskeeA8Tn5kJLH1Nh4L5RmzdA24MT3vA",
        "MyDID": "did:peer:1zQmZHjqZvEgEJv2Ds2mUxsdtASSHAspVEBynd34ZpAmP2YQ",
        "ServiceEndPoint": "",
        "RecipientKeys": null,
        "RoutingKeys": null,
        "InvitationID": "929051a8-4f9f-4255-b76a-f1b32198f1bc",
        "InvitationDID": "",
        "Implicit": false,
        "Namespace": "their",
        "MediaTypeProfiles": ["didcomm/aip2;env=rfc19"],
        "DIDCommVersion": "v1",
        "PeerDIDInitialState": ""
      }
    ];
  
    
  const agentConnectionServiceSpy = jasmine.createSpyObj('AgentConnectionService', ['getConnections']);
  agentConnectionServiceSpy.getConnections.and.returnValue(of(mockGetConnectionReturnValue));

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        ConnectionResolverService,
        {
          provide: AgentConnectionService,
          useValue: agentConnectionServiceSpy
        },
        /*{
          provide: AgentConnectionService,
          useObject: mockAgentConnectionService
        }*/
      ],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ConnectionResolverService);
    TestBed.inject(AgentConnectionService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('resolve the connections', () => {
    it('resolve for completed', () => {

    const activatedRouteSnapshotStubCompleted: ActivatedRouteSnapshot = {
        routeConfig: { path: 'completed'},
        url: null,
        params: null,
        queryParams: null,
        fragment: null,
        data: null,
        outlet: "",
        component:  null,
        root: null,
        parent:  null,
        firstChild: null,
        children: null,
        pathFromRoot: null,
        paramMap: null,
        queryParamMap: null,
        toString: () => 'fakeActivatedRouteSnapshot'
  
      }
         const routerStateSnapshotStub: RouterStateSnapshot = <any>{};
      service.resolve(activatedRouteSnapshotStubCompleted, routerStateSnapshotStub).subscribe(val => {
        expect( val.length ).toBe( 2); // mocked connections are both in state 'completed'
      });
    });

      it('resolve for requested', () => {

        const activatedRouteSnapshotStubCompleted: ActivatedRouteSnapshot = {
            routeConfig: { path: 'requested'},
            url: null,
            params: null,
            queryParams: null,
            fragment: null,
            data: null,
            outlet: "",
            component:  null,
            root: null,
            parent:  null,
            firstChild: null,
            children: null,
            pathFromRoot: null,
            paramMap: null,
            queryParamMap: null,
            toString: () => 'fakeActivatedRouteSnapshot'
      
          }
             const routerStateSnapshotStub: RouterStateSnapshot = <any>{};
          service.resolve(activatedRouteSnapshotStubCompleted, routerStateSnapshotStub).subscribe(val => {
            expect( val.length ).toBe( 0 ); // mocked connections are both in state 'completed'
          });
    });

    it('resolve for responded', () => {

      const activatedRouteSnapshotStubCompleted: ActivatedRouteSnapshot = {
          routeConfig: { path: 'responded'},
          url: null,
          params: null,
          queryParams: null,
          fragment: null,
          data: null,
          outlet: "",
          component:  null,
          root: null,
          parent:  null,
          firstChild: null,
          children: null,
          pathFromRoot: null,
          paramMap: null,
          queryParamMap: null,
          toString: () => 'fakeActivatedRouteSnapshot'
    
        }
        const routerStateSnapshotStub: RouterStateSnapshot = <any>{};
        service.resolve(activatedRouteSnapshotStubCompleted, routerStateSnapshotStub).subscribe(val => {
          expect( val.length ).toBe( 0 ); // mocked connections are both in state 'completed'
        });
     });


     it('resolve for invited', () => {

      const activatedRouteSnapshotStubCompleted: ActivatedRouteSnapshot = {
          routeConfig: { path: 'invited'},
          url: null,
          params: null,
          queryParams: null,
          fragment: null,
          data: null,
          outlet: "",
          component:  null,
          root: null,
          parent:  null,
          firstChild: null,
          children: null,
          pathFromRoot: null,
          paramMap: null,
          queryParamMap: null,
          toString: () => 'fakeActivatedRouteSnapshot'
    
        }
           const routerStateSnapshotStub: RouterStateSnapshot = <any>{};
        service.resolve(activatedRouteSnapshotStubCompleted, routerStateSnapshotStub).subscribe(val => {
          expect( val.length ).toBe( 0 ); // mocked connections are both in state 'completed'
        });
     });


  });

});
