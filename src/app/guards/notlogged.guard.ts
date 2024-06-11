import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const notloggedGuard: CanActivateFn = (): Observable<boolean> =>  {
  const router = inject(Router);
  const auth = inject(AuthService);
  // const user = inject(UsuarioService);

  return new Observable<boolean>(observer => {
    auth.getUserLogged().subscribe(res => {
      if (!res) {
        observer.next(true);
        observer.complete();
      } else {
        auth.esAdmin(res.email!).subscribe((ans) => {
          if (ans) {
            observer.next(false);
            observer.complete();
          } else {
            if (res.emailVerified) {
              auth.esEspecialista(res.email!).subscribe((ans) => {
                if (ans) {
                  observer.next(!ans.active);
                  observer.complete();
                } else {
                  observer.next(true);
                  observer.complete();
                }
              });
            } else {
              observer.next(true);
              observer.complete();
            }
          }
        });
      }
    });
  });
};
