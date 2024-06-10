import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Paciente } from '../../../interfaces/paciente.interface';
import Swal from 'sweetalert2';
import { Usuario } from '../../../interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ImagenService } from '../../../services/imagen.service';
import { PacienteService } from '../../../services/paciente.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-form-paciente',
  templateUrl: './form-paciente.component.html',
  styleUrl: './form-paciente.component.css'
})
export class FormPacienteComponent implements OnInit {
  @Output() registrationSuccess = new EventEmitter<boolean>();

  private paciente: Paciente | undefined;
  private user!: Usuario;
  private archivo1: any;
  private archivo2: any;

  constructor(
    private fb: FormBuilder,
    private imagenService: ImagenService,
    private router: Router,
    private pacienteService: PacienteService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.form.reset();
  }

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

  isValidField(field: string): boolean | null {
    return this.form.controls[field].errors && this.form.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if (!this.form.controls[field] && !this.form.controls[field].errors) return null;

    const errors = this.form.controls[field].errors;
    for (const key of Object.keys(errors!)) {
      switch (key) {
        case 'required':
          return "Este campo es requerido";
        case 'minlength':
          return `Minimo ${errors!['minlength'].requiredLength} caracteres.`;
        case 'maxlength':
          return `Maximo ${errors!['maxlength'].requiredLength} caracteres.`;
        case 'min':
          return `Como minimo debe ser ${errors!['min'].min}.`;
        case 'max':
          return `Como maximo debe ser ${errors!['max'].max}.`;
      }
    }
    return null;
  }

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

    this.user = {
      email: email,
      clave: password
    } as Usuario;

    this.authService.register(this.user)
      .then(res => {
        if (res == null) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al crear cuenta',
            footer: "El email ya fue registrado"
          });
        } else this.registerPaciente();
      });
  }

  async registerPaciente() {
    this.spinner.show();
    try {
      const pathFile1 = await this.imagenService.subirImg(this.archivo1);
      this.paciente!.img1 = pathFile1;
      const pathFile2 = await this.imagenService.subirImg(this.archivo2);
      this.paciente!.img2 = pathFile2;

      await this.pacienteService.addPaciente(this.paciente!);
      this.form.reset();

      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado',
        text: 'Revise la casilla de mail para confirmar el registro!',
        showConfirmButton: false,
        timer: 1000
      }).then(() => {
        this.authService.logOut();
        this.registrationSuccess.emit(true);
      });
    } catch (error) {
      console.error("Error during patient registration:", error);
    } finally {
      this.spinner.hide();
    }
  }
}