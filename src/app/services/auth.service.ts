import { Injectable } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, Timestamp, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from "sweetalert2";
import { Usuario } from '../interfaces/user.interface';
import { Admin } from '../interfaces/admin.interface';
import { AdminService } from './admin.service';
import { Paciente } from '../interfaces/paciente.interface';
import { PacienteService } from './paciente.service';
import { Especialista } from '../interfaces/especialista.interface';
import { EspecialistaService } from './especialista.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  msjError: string = "";
  
  constructor(private authAngFire : Auth,private firestore: Firestore,
    private router: Router,private adminService : AdminService,
    private pacienteService : PacienteService, private especialista: EspecialistaService) { }

  async loginWithAuth(
    email: string, 
    password: string
  ) {
    try {
      return await signInWithEmailAndPassword(this.authAngFire,email, password);
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return null;
    }
  }

  async register(user: Usuario) {
    try {
      const credential = await createUserWithEmailAndPassword(this.authAngFire, user.email, user.clave);
      if (credential) {
        console.log('Credential: ', credential);
        
        const currentUser = this.authAngFire.currentUser;
        if (currentUser) {
          await sendEmailVerification(currentUser);
          console.log("Registrado. Email de verificación enviado.");
          return credential.user;
        } else {
          console.error("Error: Usuario actual no disponible para enviar verificación.");
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      this.getError(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.msjError,
      });
      return null;
    }
  }

  async registerAdmin(user: Usuario){
    try{
      const credential = await createUserWithEmailAndPassword(this.authAngFire, user.email, user.clave);
      if(credential){
        const currentUser = this.authAngFire.currentUser;
        if(currentUser){
          console.log("Administrador registrado.");
          return credential.user;
        }
        else return null;

      }else return null;
    }
    catch(error){
      this.getError(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.msjError,
      });
      return null;
    }
  }
  

  private getError(error: any){
    switch(error.code){
      case "auth/invalid-email":
        this.msjError = "Email no valido!"
      break;
      case "auth/email-already-in-use":
        this.msjError = "Email ya registrado!"
      break;
      case "auth/weak-password":
        this.msjError = "La contraseña debe ser mayor a 6 caracteres!"
      break;
      default:
        this.msjError = "Error inesperado al intentar registrarse!"
      break;
    }
  }

  /**
   * Me permitira realizar un
   * log-out
   * @returns 
   */
  logOut(){
    console.log('Deslogueandose');
    return signOut(this.authAngFire)
    .then(() => {
        console.log(this.authAngFire.currentUser?.email);
        // this.router.navigate(['']);
      })
    .catch(error =>{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrio un error al intentar desloguearse.',
            footer: 'Reintente!'
        }); 
    });
  }

  getUserLogged(): Observable<User | null> {
    return Observable.create((observer: { next: (arg0: User | null) => void; complete: () => void; }) => {
      observer.next(this.authAngFire.currentUser);
      observer.complete();
    });
  }

  esAdmin(email: string): Observable<Admin | null> {
    return new Observable<Admin | null>((observer) => {
      this.adminService.traer().subscribe(admins => {
        for (const admin of admins) {
          if (admin.email === email) {
            observer.next(admin);
            observer.complete();
            return; // Exit the loop after finding a match
          }
        }
        observer.next(null); // No matching admin found
        observer.complete();
      });
    });
  }

  esPaciente(
    email: string
  ): Observable<Paciente | null> {
    return new Observable<Paciente | null>((observer) => {
      this.pacienteService.traer().subscribe(pacientes => {
        pacientes.forEach(paciente => {
          if (paciente.email === email) {
            observer.next(paciente);
            observer.complete();
          }
        });
        observer.next(null);
        observer.complete();
      })
    });
  }

  esEspecialista(
    email: string
  ): Observable<Especialista | null> {
    return new Observable<Especialista | null>((observer) => {
      this.especialista.traer().subscribe(especialista => {
        especialista.forEach(especialista => {
          if (especialista.email === email) {
            observer.next(especialista);
            observer.complete();
          }
        });
        observer.next(null);
        observer.complete();
      })
    });
  }

}
