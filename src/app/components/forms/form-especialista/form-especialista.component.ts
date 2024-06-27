import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Especialista } from '../../../interfaces/especialista.interface';
import { Usuario } from '../../../interfaces/user.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspecialistaService } from '../../../services/especialista.service';
import { ImagenService } from '../../../services/imagen.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-especialista',
  templateUrl: './form-especialista.component.html',
  styleUrl: './form-especialista.component.css'
})
export class FormEspecialistaComponent {
  @Input() isAdmin: boolean = false;
  private especialista: Especialista | undefined;
  private user!: Usuario;
  private file: any;
  public isLoading: boolean = false;//-->Para mostrar el spinner
  @Output() registrationSuccess = new EventEmitter<boolean>();

  //-->Para el captcha de google
  public siteKey : string  = "6LcNGQIqAAAAAMPgoAeH7PKi6PLnAkWegpmhAcKq";
  public captcha: string ='';

  
  //-->Para validar el ingreso de datos
  public form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    edad: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
    dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
    especialidad: this.fb.array([], [Validators.required]),
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    img: ['', [Validators.required]],
    recaptcha: ['', Validators.required],//-->eL CAPTCHA
  });

  constructor(private fb: FormBuilder,
     private especialistaService: EspecialistaService, private auth: AuthService, private router: Router, 
     private imagenService: ImagenService,
     private spinner: NgxSpinnerService) { }

  /**
   * Para resetear el formulario.
   */   
  ngOnInit(): void {
    this.form.reset();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log("invalid form");
      this.captcha = '';

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, complete todos los campos',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'darkslategray', //-->Color del boton de confirmar
        background: 'antiquewhite'//-->Color de fondo
      });
      return;
    }

    this.especialista = this.form.value;
    const { nombre, apellido, edad, dni, especialidad, email, password, img } = this.form.value;
    this.especialista = {
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      dni: dni,
      especialidad: especialidad,
      email: email,
      img: img,
      active: false,
      idDoc: ''
    } as Especialista;

    this.user = {
      email: email,
      clave: password
    } as Usuario;

    //-->Mostrar el spinner
    this.isLoading = true;

    this.auth.register(this.user)
      .then(res => {
        if (res != null) {
          this.imagenService.subirImg(this.file)
            .then(path => {
              this.especialista!.img = path;
              this.especialistaService.addEspecialista(this.especialista!)
                .then(() => {
                  
                  //-->Ocultar el spinner
                  this.isLoading = false;

                  Swal.fire({
                    title: 'Se ha logrado registrar',
                    text: 'Revise su casilla de email para confirmar el registro!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    background: 'antiquewhite'//-->Color de fondo
                  })
                  .then(() => {
                    // this.router.navigate(['/login']
                    this.form.reset();
                    this.auth.logOut();
                    this.registrationSuccess.emit(true);
                  });
                });
            });
        }
      })
      .catch(() => {
        //-->Ocultar el spinner en caso de error
        this.isLoading = false;
      });
  }



  /**
   * Me permitira obtener la 
   * espcecialidad del form
   */
  get especialidad() {
    return this.form.get('especialidad') as FormArray;
  }

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
   * Para subir la imagen
   * del especialista
   * @param foto 
   */
  uploadImage(foto: any) {
    this.file = foto.target.files[0];
  }


  /**
   * Para obtener la especialidad/es
   * seleccionada/s.
   * @param especialidad 
   */
  getEspecialidad(especialidad: string){
    const existe = this.elementoExisteEnFormArray(especialidad)
    console.log('Especialidad seleccionada: ', especialidad);
    console.log('Existe?: ', existe);
    
    
    if (existe === false) {
      this.especialidad.push(this.fb.control(especialidad, [Validators.required]));
      console.log("Si cliquea se agrega su especialidad: ", especialidad);
    }
    else {
      this.especialidad.removeAt(existe);
      console.log("Si cliquea otra se remueve: ", especialidad);
    }
  }

  /**
   * Para saber si el elemento 
   * existe en el array
   * @param valor 
   * @returns 
   */
  elementoExisteEnFormArray(valor: string) {
    const formArray = this.form.get('especialidad') as FormArray;
    //-->Recorro 
    for (let i = 0; i < formArray.length; i++) {
      if (formArray.at(i).value === valor) {
        return i;
      }
    }
    return false;
  }

///////////////////////////////// CAPTCHA /////////////////////////////////
  handleSuccess(captchaResponse: string): void {
    this.captcha = captchaResponse;
    this.form.controls['recaptcha'].setValue(captchaResponse);
  }
}
