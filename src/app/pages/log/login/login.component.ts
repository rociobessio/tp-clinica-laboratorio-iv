import { Component } from '@angular/core';
import { Usuario } from '../../../interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import {  NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CurrentUserService } from '../../../services/current-user.service';
import { EspecialistaService } from '../../../services/especialista.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin!: FormGroup;
  usuario! : Usuario;

  constructor(private formBuilder: FormBuilder, private router: Router,
     private auth: AuthService, private usuarioService : UsuarioService,
     private spinner : NgxSpinnerService, private cUser : CurrentUserService,
     private especialistaService : EspecialistaService
    ) { 
      this.formLogin = this.formBuilder.group({
       usuario: ['', [Validators.required]],
       clave: ['', [Validators.required]],
     });
   }

  onLogin() {
    this.spinner.show();
    this.usuario = {
      email: this.formLogin.controls['usuario'].value,
      clave: this.formLogin.controls['clave'].value
    } as Usuario;

    this.auth.loginWithAuth(this.usuario.email,this.usuario.clave)
      .then(res => {
        console.log(res);
        if (res) {
          this.cUser.currentUser.email = this.usuario.email;
          this.cUser.currentUser.clave = this.usuario.clave;
          this.auth.esAdmin(res.user!.email!)
            .subscribe(admin => {
              if (admin) {
                setTimeout(() => {
                  this.spinner.hide();
                  console.log("Como Administrador");
                  this.cUser.admin = admin;
                  this.router.navigateByUrl('/usuarios');
                }, 1000);
              } else {
                if (res.user!.emailVerified) {
                  this.especialistaService.obtenerEspPorMail(res.user!.email!)
                    .subscribe(esp => {
                      console.log(esp);
                      if (!esp || esp.active) {
                        this.auth.esPaciente(res.user!.email!).subscribe(paciente => {
                          if (paciente) {
                            setTimeout(() => {
                              this.spinner.hide();
                              this.cUser.paciente = paciente;
                              console.log("Como paciente");
                              this.router.navigateByUrl('/paciente');
                            }, 1000);
                          }
                        });
                        this.auth.esEspecialista(res.user!.email!).subscribe(especialista => {
                          if (especialista) {
                            setTimeout(() => {
                              this.spinner.hide();
                              this.cUser.especialista = especialista;
                              console.log("Como especialista!");
                              this.router.navigateByUrl('/especialista');
                            }, 1000);
                          }
                        });
                      }
                      else {
                        setTimeout(() => {
                          this.spinner.hide();
                          Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Cuenta no esta activada',
                            footer: 'Para verificar su cuenta comuniquese con administracion'
                          });
                        }, 1000);
                      }
                    });
                }
                else {
                  setTimeout(() => {
                    this.spinner.hide();
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Cuenta no verificada',
                      footer: 'Verificar cuenta antes de loguearse'
                    });
                  }, 1000);
                }
              }
            });

        } else {
          setTimeout(() => {
            this.spinner.hide();
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Usuario/contraseña incorrectos',
              footer: 'Vuelva a intentarlo'
            })
            console.log("error log");
          }, 1000);
        }
      });
  }


  onFastLoginPaciente() {
    this.formLogin.controls['usuario'].setValue('testdecodigo003@gmail.com');
    this.formLogin.controls['clave'].setValue('123456');
    // this.onLogin();
  }

  onFastLoginAdmin() {
    this.formLogin.controls['usuario'].setValue('gabessio@gmail.com');
    this.formLogin.controls['clave'].setValue('123456');
    // this.onLogin();
  }

  onFastLoginEspecialista() {
    this.formLogin.controls['usuario'].setValue('rocibessio@gmail.com');
    this.formLogin.controls['clave'].setValue('123456');
    // this.onLogin();
  }

}
