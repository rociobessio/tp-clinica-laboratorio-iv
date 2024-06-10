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
  
  ngOnInit(): void {
    console.log('Implementa bien registro!');  
  }
}
