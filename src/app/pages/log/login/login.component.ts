import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import {  NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CurrentUserService } from '../../../services/current-user.service';
import { EspecialistaService } from '../../../services/especialista.service';
import { AdminService } from '../../../services/admin.service';
import { PacienteService } from '../../../services/paciente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formLogin!: FormGroup;
  usuario! : Usuario;
  isLoading : boolean = false;

  admin : any;
  especialista1 : any;
  especialista2 : any;
  paciente1 : any;
  paciente2 : any;
  paciente3 : any;

  constructor(private formBuilder: FormBuilder, private router: Router,
     private auth: AuthService, private usuarioService : UsuarioService,
     private spinner : NgxSpinnerService, private cUser : CurrentUserService,
     private especialistaService : EspecialistaService,
     private adminService : AdminService, private pacienteService : PacienteService
    ) { 
      this.formLogin = this.formBuilder.group({
       usuario: ['', [Validators.required]],
       clave: ['', [Validators.required]],
     });
   }

  /**
   * En el OnInit me traigo los usuarios
   * y uso el spinner para esperar 
   * mientras cargan.
   */
  async ngOnInit(): Promise<void> {
    this.isLoading = true;

    //--> Obtengo los usuarios para el fast login.
    let admins = await this.adminService.obtener('admins');
    this.admin = admins.find((admin: any) => admin.data.email === "gabessio@gmail.com");
    console.log('Administrador: ', this.admin);

    let especialistas = await this.especialistaService.obtener('especialistas');
    this.especialista1 = especialistas.find((esp1 : any) => esp1.data.email === 'rocibessio@gmail.com');
    console.log('Especialista #1: ', this.especialista1);
    this.especialista2 = especialistas.find((esp1 : any) => esp1.data.email === 'kotekib178@kernuo.com');
    console.log('Especialista #2: ', this.especialista2);
    
    let pacientes = await this.pacienteService.obtener('pacientes');
    this.paciente1 = pacientes.find((pac : any) => pac.data.email === 'testdecodigo003@gmail.com');
    console.log('Paciente #1: ', this.paciente1);

    this.paciente2 = pacientes.find((pac : any) => pac.data.email === 'sicoxe5539@cnurbano.com');
    console.log('Paciente #2: ', this.paciente2);

    this.paciente3 = pacientes.find((pac : any) => pac.data.email === 'mdv50y0olb@tidissajiiu.com');
    console.log('Paciente #3: ', this.paciente3);

    this.isLoading = false;
  }

  onLogin() {
    this.isLoading = true;

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
                  this.isLoading = false;
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
                              this.isLoading = false;
                              this.cUser.paciente = paciente;
                              console.log("Como paciente");
                              this.router.navigateByUrl('/paciente');
                            }, 1000);
                          }
                        });
                        this.auth.esEspecialista(res.user!.email!).subscribe(especialista => {
                          if (especialista) {
                            setTimeout(() => {
                              this.isLoading = false;
                              this.cUser.especialista = especialista;
                              console.log("Como especialista!");
                              this.router.navigateByUrl('/especialista');
                            }, 1000);
                          }
                        });
                      }
                      else {
                        setTimeout(() => {
                          this.isLoading = false;
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
                    this.isLoading = false;
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
            this.isLoading = false;
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


  onFastLoginPaciente1() {
    if (this.paciente1) {
      this.formLogin.controls['usuario'].setValue(this.paciente1.data.email);
      this.formLogin.controls['clave'].setValue('123456');
      this.onLogin();
    } else {
      console.error('Paciente no encontrado');
    }
  }

  onFastLoginPaciente2() {
    if (this.paciente2) {
      this.formLogin.controls['usuario'].setValue(this.paciente2.data.email);
      this.formLogin.controls['clave'].setValue('123456');
      this.onLogin();
    } else {
      console.error('Paciente no encontrado');
    }
  }

  onFastLoginPaciente3() {
    if (this.paciente3) {
      this.formLogin.controls['usuario'].setValue(this.paciente3.data.email);
      this.formLogin.controls['clave'].setValue('123456');
      this.onLogin();
    } else {
      console.error('Paciente no encontrado');
    }
  }

  onFastLoginAdmin() {
    if (this.admin) {
      this.formLogin.controls['usuario'].setValue(this.admin.data.email);
      this.formLogin.controls['clave'].setValue('123456');
      this.onLogin();
    } else {
      console.error('Administrador no encontrado');
    }
  }

  onFastLoginEspecialista1() {
    this.formLogin.controls['usuario'].setValue(this.especialista1.email);
    this.formLogin.controls['clave'].setValue('123456');
    // this.onLogin();
  }

  onFastLoginEspecialista2() {
    this.formLogin.controls['usuario'].setValue(this.especialista2.email);
    this.formLogin.controls['clave'].setValue('123456');
    // this.onLogin();
  }

}
