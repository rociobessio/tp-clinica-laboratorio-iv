import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class checkAdminGuard implements CanActivate{
  
  constructor(private router: Router, private auth : AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.getUserLogged().pipe(
      switchMap(res => {
        if (res) {
          return this.auth.esAdmin(res.email!).pipe(
            map(admin => {
              if (admin) {
                return true;
              } else {
                this.showAccessDenied('Debes de ser administrador para ingresar.');
                return false;
              }
            }),
            catchError(() => {
              this.showAccessDenied('Debes de ser administrador para ingresar.');
              return of(false);
            })
          );
        } else {
          this.showAccessDenied('Debes de estar logueado como administrador para ingresar.');
          return of(false);
        }
      }),
      catchError(() => {
        this.showAccessDenied('Debes de estar logueado como administrador para ingresar.');
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
}
