import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from '../../../../interfaces/paciente.interface';
import { Usuario } from '../../../../interfaces/user.interface';
import { ImagenService } from '../../../../services/imagen.service';
import { Router } from '@angular/router';
import { PacienteService } from '../../../../services/paciente.service';
import { AuthService } from '../../../../services/auth.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-paciente',
  templateUrl: './register-paciente.component.html',
  styleUrl: './register-paciente.component.css'
})
export class RegisterPacienteComponent implements OnInit{
  private paciente : Paciente | undefined;
  private user! : Usuario;
  private archivo1: any;//-->para la fto de perfil
  private archivo2: any;//-->para el dni

  constructor(private fb: FormBuilder, private imagenService : ImagenService,
    private router: Router, private pacienteService: PacienteService,
    private authService : AuthService, private spinner : NgxSpinnerService
  ) {}

  /**
   * Me permitira reiniciar 
   * el formulario de registro.
   */
  ngOnInit(): void {
    this.form.reset();
  }

  //-->Para validar el ingreso de datos
  public form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    edad: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
    dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
    obra: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    imagen1: ['', [Validators.required]],
    imagen2: ['', [Validators.required]],
  });
  
  /**
   * Para corroborar si el ingreso
   * del input es correcto.
   * @param field 
   * @returns 
   */
  isValidField(field: string): boolean | null {
    return this.form.controls[field].errors && this.form.controls[field].touched
  }

  /**
   * Si el ingreso es erroneo,
   * lanzo un msj.
   * @param field 
   * @returns 
   */
  getFieldError(field: string): string | null {
    if (!this.form.controls[field] && !this.form.controls[field].errors) return null;

    const errors = this.form.controls[field].errors;
    for (const key of Object.keys(errors!)) {
      switch (key) {
        case 'required':
          return "Este campo es requerido"
        case 'minlength':
          return `Minimo ${errors!['minlength'].requiredLength} caracteres.`
        case 'maxlength':
          return `Maximo ${errors!['maxlength'].requiredLength} caracteres.`
        case 'min':
          return `Como minimo debe ser ${errors!['min'].min}.`
        case 'max':
          return `Como maximo debe ser ${errors!['max'].max}.`
      }
    }
    return null;
  }

  /**
   * Me permtira obtener
   * la obra social seleccionada.
   * @param obra la obra social
   * seleccionada
   */
  getObra(obra: string) {
    this.form.controls['obra'].setValue(obra);
  }

  uploadImageUno(foto: any) {
    this.archivo1 = foto.target.files[0];
  }

  uploadImageDos(foto: any) {
    this.archivo2 = foto.target.files[0];
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log("invalid form");
      return;
    }

    const { nombre, apellido, edad, dni, obra, email, password, imagen1, imagen2 } = this.form.value;

    //-->Genero el Paciente
    this.paciente = {
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      dni: dni,
      obraSocial: obra,
      email: email,
      img1: imagen1,
      img2: imagen2,
      idDoc: ''
    } as Paciente;

    //-->Genero el usuario
    this.user = {
      email: email,
      clave: password
    } as Usuario;

    this.authService.register(this.user)
    .then(res =>{
      if(res == null){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al crear cuenta',
          footer: "El email ya fue registrado"
        });
      }
      else this.registerPaciente();
    })
  }
  
  async registerPaciente(){
    this.spinner.show();
    const pathFile1 = await this.imagenService.subirImg(this.archivo1);
    this.paciente!.img1 = pathFile1;
    const pathFile2 = await this.imagenService.subirImg(this.archivo2);
    this.paciente!.img2 = pathFile2;

    const response = await this.pacienteService.addPaciente(this.paciente!);
    // console.log(response);
    this.form.reset();

    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado',
        text: 'Revise la casilla de mail para confirmar el registro!',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.authService.logOut();
        this.router.navigate(['/login'])
      });
      this.spinner.hide();
    }, 1000);
    
  }

}
