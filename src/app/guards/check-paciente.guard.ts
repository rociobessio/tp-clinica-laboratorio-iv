import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class checkPacienteGuard implements CanActivate{
  constructor(private router: Router, private auth : AuthService) {}

  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.getUserLogged().pipe(
      switchMap(res => {
        if (res) {
          return this.auth.esPaciente(res.email!).pipe(
            map(pac => {
              if (pac) {
                console.log('Ingreso valido como paciente: ',pac);
                
                return true;
              } else {
                console.log('Ingreso no valido como paciente');
                this.showAccessDenied('Debes de ser paciente para ingresar.');
                return false;
              }
            }),
            catchError(() => {
              this.showAccessDenied('Debes de ser paciente para ingresar.');
              return of(false);
            })
          );
        } else {
          this.showAccessDenied('Debes de estar logueado como paciente para ingresar.');
          return of(false);
        }
      }),
      catchError(() => {
        this.showAccessDenied('Debes de estar logueado como paciente para ingresar.');
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

