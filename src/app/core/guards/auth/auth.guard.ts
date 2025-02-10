import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlatformService } from '../../services/platforn/platform.service';
import { RegisrtationService } from '../../services/auth/regisrtation.service';

export const authGuard: CanActivateFn = (route, state) => {
  let platform = inject(PlatformService);
  let regisrtationService = inject(RegisrtationService);
  let router = inject(Router);
  if (platform.checkplatform()) {

    if (localStorage.getItem('usertoken') !== null) {
      regisrtationService.savedata()
      return true;
    } else {
      return router.createUrlTree(['/login']);
    }
  }
  return false;
};
