import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

import { AgentConnectionService } from 'src/app/services/connection/agent.connection.service';

import { map, debounceTime, distinctUntilChanged, filter, tap, switchMap } from 'rxjs/operators';
import { Observable, timer, BehaviorSubject, throwError } from 'rxjs';


function debouncedInvitationValidator(): AsyncValidatorFn {
  return (control: FormControl): Observable<ValidationErrors | null> => {
    return timer(300)
      .pipe(
        map(() => {
          try {
            JSON.parse(control.value);
            return null;
          } catch (error) {
            return { json: error.message };
          }
        })
      );
  };
}

@Component({
  selector: 'app-accept-connection',
  templateUrl: './accept-connection.component.html',
  styleUrls: ['./accept-connection.component.scss']
})
export class AcceptConnectionComponent implements OnInit {
  form: FormGroup;

  invitationUrlError$ = new BehaviorSubject<string>(null);

  constructor(private agentService: AgentConnectionService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      invitationLabel: [null, Validators.required],
      invitation: [null, Validators.required, debouncedInvitationValidator()],
      invitationUrl: [null, Validators.nullValidator]
    });
  }

  public get invitation(): FormControl {
    return this.form && this.form.get('invitation') as FormControl;
  }

  public get invitationUrl(): FormControl {
    return this.form && this.form.get('invitationUrl') as FormControl;
  }

  public get invitationLabel(): FormControl {
    return this.form && this.form.get('invitationLabel') as FormControl;
  }

  ngOnInit() {
    this.invitationUrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.invitationUrlError$.next(null)),
        filter((value: string) => !!value),
        map((value: string) => {
          try {
            const url = new URL(value);
            const invitationParam = url.searchParams.get('c_i');
            if (!invitationParam) {
              throw new Error();
            }

            this.invitation.setValue(JSON.stringify(JSON.parse(atob(invitationParam)), null, 4));
            this.invitation.markAsDirty();
            this.invitation.updateValueAndValidity();
          } catch (error) {
            this.invitationUrlError$.next('Invalid invitation URL');
          }
        }),
      )
      .subscribe();
  }

  onSubmit() {

    if (!this.form.valid) {
      return;
    }
    var invitation = JSON.parse(this.invitation.value).invitation
   
    var inputEndPoint = JSON.stringify(JSON.parse(this.invitation.value).invitation.serviceEndpoint);

    console.log("inputEndPoint: " + inputEndPoint)

    this.agentService.getConnections().pipe(
      map((connections: any[]) => {
        
        //if (!connections || connections.filter((connection) => connection.ServiceEndPoint === inputEndPoint).length > 0) {
                    var invitationObj = JSON.parse(this.invitation.value).invitation
                    invitationObj["label"] = this.invitationLabel.value
                    this.agentService.receiveInvitation(JSON.stringify(invitationObj))
            .pipe(
              map(() => this.router.navigateByUrl('/connections'))
            )
            .subscribe();
       /*  } else {
           throw Error("Connection already estabilished");
        }
        return */
      })
    ).subscribe();

    console.log('Invitation: ' + JSON.stringify(JSON.parse(this.invitation.value).invitation, null, 4))


  }

}
