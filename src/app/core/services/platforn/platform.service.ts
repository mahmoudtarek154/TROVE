import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(@Inject(PLATFORM_ID) private platformid:object) { }

 checkplatform():boolean{

  if (isPlatformBrowser(this.platformid)) {
    return true
  }
  return false
 }
}
