import { Injectable } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, Timestamp, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from "sweetalert2";
import { Usuario } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  msjError: string = "";
  
  constructor(private authAngFire : Auth,private firestore: Firestore,
    private router: Router) { }

  async loginWithAuth(
    email: string, 
    password: string
  ) {
    try {
        const response = await signInWithEmailAndPassword(this.authAngFire, email, password);
        if (response) {
            //-->Obtengo cuando se logueo en la app
            const loginTime = Timestamp.now();
            //-->Guardo el log del  inicio de sesion a Firebase
            await addDoc(collection(this.firestore, 'logs'), {
                email: email,
                loginTime: loginTime
            });
            return response;
        } else {
            return null;
        }
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
      observer.complete(); // Complete the observable
    });
  }
}
