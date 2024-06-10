import { Component, OnInit } from '@angular/core';

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
