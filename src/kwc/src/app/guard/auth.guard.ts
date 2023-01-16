import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {

  constructor(protected readonly router: Router,
    protected readonly keycloak: KeycloakService) {
    super(router, keycloak);
  }


  async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    // Get the roles required from the route.
    const requiredRoles = route.data.roles;

    let granted = false;

    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      granted = true;
      return granted;
    }

    // Allow the user to proceed if all the required roles are present.
    granted = requiredRoles.every((role) => this.roles.includes(role));

    // Routing user into permission denied view if don't have necessary roles.
    if (!granted) {
      await this.router.navigate(['permission-denied']);
    }

    return granted;
  }
}