import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { EspecialistaService } from '../../../../services/especialista.service';
import { AuthService } from '../../../../services/auth.service';
import { ImagenService } from '../../../../services/imagen.service';

@Component({
  selector: 'app-register-especialista',
  templateUrl: './register-especialista.component.html',
  styleUrl: './register-especialista.component.css'
})
export class RegisterEspecialistaComponent implements OnInit{

  
 
  constructor(private fb: FormBuilder,
     private especialistaService: EspecialistaService, private auth: AuthService, private router: Router, 
     private imagenService: ImagenService,
     private spinner: NgxSpinnerService) { }

  /**
   * Para resetear el formulario.
   */   
  ngOnInit(): void {
    console.log('En register especialista normal.');
    
  }

 
}
