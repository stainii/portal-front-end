import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthGuardData, createAuthGuard} from 'keycloak-angular';
import {UserService} from "@app/user/user.service";
import {inject} from "@angular/core";

/**
 * Guard for the router.
 * Checks if the user is logged in, before letting him/her go to any page.
 */
const isAccessAllowed = async (
    route: ActivatedRouteSnapshot,
    _: RouterStateSnapshot,
    authData: AuthGuardData
): Promise<boolean | UrlTree> => {
    const {authenticated, grantedRoles} = authData;

    if(!authenticated) {
        await inject(UserService).login();
    }

    return authenticated;
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);
