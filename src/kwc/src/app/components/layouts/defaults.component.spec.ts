import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { DefaultsComponent } from './defaults.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

describe('DefaultsComponent', () => {
  let component: DefaultsComponent;
  let fixture: ComponentFixture<DefaultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [
        MaterialModule, 
        BrowserAnimationsModule, 
        NoopAnimationsModule,
        RouterTestingModule
              ]
    })
    .compileComponents();
  });

  beforeEach(() => {

    window['ENV'] = {
        TITLE: "KWCT Server Agent",        
        BACKEND_HOST_NAME: "http://localhost",
        BACKEND_PORT: "6080",
        SOCKET_IOCLIENT_BASE_URL: "aFakeSocketIoBaseUrl",
        SOCKET_IO_PORT: "aFakeBaseUrl",
        KEYCLOAK_REALM: "kraken",
        KEYCLOAK_CLIENT_ID: "depute-frontend",
        VC_SCHEMA_INDEX_FILE_URL: "https://raw.githubusercontent.com/krakenh2020/vc-schemas/main/VCSchemaIndex.json"
    }
    


    fixture = TestBed.createComponent(DefaultsComponent);
    component = fixture.componentInstance;
    TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
