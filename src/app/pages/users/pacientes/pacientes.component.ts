import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../../interfaces/paciente.interface';
import { PacienteService } from '../../../services/paciente.service';
import { Router } from '@angular/router';
import { FormPacienteComponent } from '../../../components/forms/form-paciente/form-paciente.component';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent implements OnInit {
  public pacientes!: Paciente[];
  showFormComponent = false;
  isRegistrationSuccessful = false;

  constructor(private pacientesService: PacienteService,private router : Router) {}

  ngOnInit(): void {
    this.pacientesService.traer().subscribe(pacientes => this.pacientes = pacientes);
    console.log('en paciente');
  }
  
  /**
   * Para controlar el manejo
   * del boton de dar alta.
   */
  onAddPacienteAdmin(){
    this.showFormComponent = !this.showFormComponent;
  }

  /**
   * Si se dio de alta correctamente
   * se ocultara el formulario
   * y se reinicia la pagina.
   * @param success 
   */
  onRegistrationSuccess(success: boolean) {
    if (success) {
      this.isRegistrationSuccessful = true;
      window.location.reload();//-->Recargo la pagina
    }
  }

}
