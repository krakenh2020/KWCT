# KWCT The Kraken Web Company Tool
This web tool was developed by Infocert in the context of the EU2020 Kraken project to study, verify and test the evolutions of the W3C data model and of the open souce Hyperledger Aries framework implementations during the lifetime of the Kraken project ( dec 2019- jan 2023).
It was really useful to us because with 2 KWCT instances only it is possible to cover all the 3 SSI roles: Issuer, Holder and Verifier.
These are the reasons we decided to provide it as an open source sw, we hope it will be as useful to you as it was for us.

## Main Features of the tool
* It is a Hyperledger Aries Controller, i.e an interface on an Hyperledger Aries Agent ( NB: the agent is not part of this project)
* It was developed to work on a Hyperledger Aries Go-Rest-Agent instance, it's tested on v0.1.8 of the agent; the agent is provided by the Hyperledegr Aries community: https://github.com/hyperledger/aries-framework-go.
     * The tool supports DID-EXCHANGE, ISSUE-CREDENTIAL and PRESENT-PROOF Aries Protocols in the version implemented by the go rest Agent v01.8
] Web socket are used receive webhooks from the backend
* The index/list of the defined VC schemas and the definitions of the VC used by KWCT to generate the input forms during the credential issuing, are inside the github repository : "https://github.com/krakenh2020/vc-schemas" - VC schemas are defined in https://json-schema.org/ format and "text" is the only field type supported by this release of the tool.
* Credential issued by this version are in W3C Json-LD format.
* The tool is designed for companies, so the DID used to issue the credentials is associated to a company and employees access is protected by openID connect sessions.
It works out-of-the-box using OpenId Connect authentication services provided by an instance of KeyCloack: https://www.keycloak.org/ (NB: keyCloak is not part of this project)
     * if you plan to use a keycloak instance:
     change the values of any parameter starting with "KEYCLOAK" in the project's backend configuration file ( src/config/server-configuration.json) with the values of your instance
     * if you do not plan to use KeyCloack:
     remove the import and comment any line of code containing 'AuthGuard' in the angular project's main routing file ( src/app/app-routing.module.ts )
* While it also works directly on a go agent rest api, go agent instances deployed in Kraken are protected by a reverse proxy, so we also protect the agent's REST API with the OpenId Connect session: we suggest you this architecture if you plan to develop a production tool.

## Development features
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.1and migrated to 14.2.9

Angular CLI: 14.2.9
Node: 16.19.0
Package Manager: npm 8.19.3 
OS: win32 x64

Angular: 14.2.10
... animations, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router     

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1402.9
@angular-devkit/build-angular   14.2.9
@angular-devkit/core            14.2.9
@angular-devkit/schematics      14.2.9
@angular/cdk                    13.3.9
@angular/cli                    14.2.9
@angular/flex-layout            12.0.0-beta.35
@angular/material               13.3.9
@angular/service-worker         14.0.7
@schematics/angular             14.2.9
rxjs                            6.6.7
typescript                      4.7.4
webpack                         5.74.0

# Commands

## setup
Run `npm install` under `src\kwc`

## Build
Run `ng build` under `src\kwc` to build the project. The build artifacts will be stored in the `src\kwc\dist` directory.

## Serve
Run `ng serve` under `src\kwc` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Test:
### execute unit tests
Run "npm run test"
### debug a single unit test
1-  Run on terminal "ng test --include **/unitTestFileName.ts
2-  click the debug icon on the left in VSCode
3 - Run "Attach2Karma" in "RUN AND DUBUG" in VSCode
3 - Choose "Attach2Karma" process in VSCode debug window


## Docker
A DockerFile is provided that build all requirement:
* @angular/cli@11.2.1 
* ts-node
* http-server
and a `run-depute.sh` script is used to run the application.
## The sw will use environment variables aligned with the names inside the server configuration file if defined. If not it take the values from the configuration file.

## Configuration file parameters
`TITLE` define the tite of application

`BACKEND_HOST_NAME` is the url of backend that must be provided as follow [http://{server-host-name}]

`BACKEND_PORT` is the service port of backend

`SOCKET_IOCLIENT_BASE_URL` is the url where the agend sended webhooks are received 

`SOCKET_IO_PORT` is the port where the agend sended webhooks are received 


`KEYCLOAK_URL` the url of a keycloak idp (es. http://keycloak:8080)

`KEYCLOAK_REALM` the realm name(es. kraken)

`KEYCLOAK_CLIENT_ID` the client id for this application es. "kwc-frontend" or "kwc-client-frontend"


# Authors
Designed and Developed with fun by Davide Porro and Pasquale Minervini - Infocert S.p.A




