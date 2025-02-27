

import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof window !== 'undefined' && localStorage.getItem('usertoken')) {
    if (req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist') ) {
      req = req.clone({
        setHeaders: {
          token: localStorage.getItem('usertoken')!
        }
      });
    }
  }
  return next(req);
};
