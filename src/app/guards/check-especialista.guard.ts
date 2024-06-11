import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class checkEspecialistaGuard implements CanActivate{
  
  constructor(private router: Router, private auth : AuthService) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.getUserLogged().pipe(
      switchMap(res => {
        if (res) {
          return this.auth.esEspecialista(res.email!).pipe(
            map(esp => {
              if (esp) {
                console.log('Ingreso valido como especialista: ', esp);
                
                return true;
              } else {
                console.log('Ingreso no valido como especialista');
                this.showAccessDenied('Debes de ser especialista para ingresar.');
                return false;
              }
            }),
            catchError(() => {
              this.showAccessDenied('Debes de ser especialista para ingresar.');
              return of(false);
            })
          );
        } else {
          this.showAccessDenied('Debes de estar logueado como especialista para ingresar.');
          return of(false);
        }
      }),
      catchError(() => {
        this.showAccessDenied('Debes de estar logueado como especialista para ingresar.');
        return of(false);
      })
    );
  }

  private showAccessDenied(message: string) {
    Swal.fire({
      title: 'Ingreso no valido.',
      text: message,
      confirmButtonText: 'Ok',
      icon: 'error'
    });
    this.router.navigate(['/login']);
  }
};
