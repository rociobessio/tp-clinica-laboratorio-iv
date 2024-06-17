import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../../interfaces/paciente.interface';
import { AuthService } from '../../../services/auth.service';
import { PacienteService } from '../../../services/paciente.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent implements OnInit{
  public paciente! : Paciente;
  
  constructor(private auth : AuthService, private pacienteService : PacienteService) {}

  /**
   * Corroboro el usuario
   * logueado efectivamente
   * sea un paciente.
   */
  ngOnInit(): void {
    this.auth.getUserLogged()
      .subscribe((user) =>{
        this.auth.esPaciente(user?.email!)
          .subscribe((pac) =>{
            if(pac){
              this.paciente = pac as Paciente;//-->Paso al paciente.
            }
          });
      });
  }
}
