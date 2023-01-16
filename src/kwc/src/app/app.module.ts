
import { AuthInterceptor } from './auth/_helpers/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {KrakentWebControllerSocketIoService} from './services/krakent-web-controller-socket-io.service';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MaterialModule } from './material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { WebHookModule } from './core/web-hook-signal/web-hook.module';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { AuthService } from './services/auth.service';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import KEYCLOAK_CONFIG from '../config/server-configuration.json';
import { DefaultsModule } from './components/layouts/defaults.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import {UiSyncronizerService} from './services/uiSyncronizer/ui-syncronizer.service'

function initializeKeycloak (keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: $ENV.KEYCLOAK_URL !== undefined ? $ENV.KEYCLOAK_URL+'/auth' : KEYCLOAK_CONFIG.configurations.KEYCLOAK_URL+'/auth',
        realm: $ENV.KEYCLOAK_REALM !== undefined ? $ENV.KEYCLOAK_REALM : KEYCLOAK_CONFIG.configurations.KEYCLOAK_REALM,
        clientId: $ENV.KEYCLOAK_CLIENT_ID !== undefined ? $ENV.KEYCLOAK_CLIENT_ID : KEYCLOAK_CONFIG.configurations.KEYCLOAK_CLIENT_ID
      },
      initOptions: {
        /*onLoad: 'login-required'*/
        silentCheckSsoRedirectUri:
        window.location.origin + '/assets/silent-check-sso.html'
      }, 
      bearerExcludedUrls: [
        'https://raw.githubusercontent.com/krakenh2020/vc-schemas',
        '/assets',
        '/clients/public'],
      //loadUserProfileAtStartUp: true
    });
}

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.DEBUG,
    }),
    CommonModule,
    KeycloakAngularModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    MatInputModule,
    NgbModule,
    FormsModule,
    WebHookModule,
    MaterialModule,
    MatNativeDateModule,
    DefaultsModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: initializeKeycloak, multi: true, deps: [KeycloakService] },
    AuthService,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,useValue: { appearance: "fill" }},
    NgbActiveModal,
    KrakentWebControllerSocketIoService,
    UiSyncronizerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
