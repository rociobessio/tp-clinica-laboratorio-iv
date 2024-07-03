import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../../interfaces/paciente.interface';
import { PacienteService } from '../../../services/paciente.service';
import { Router } from '@angular/router';
import { FormPacienteComponent } from '../../../components/forms/form-paciente/form-paciente.component';
import { DatoDinamico, HistoriaClinica } from '../../../interfaces/historiaClinica.interface';
import { Especialista } from '../../../interfaces/especialista.interface';
import { HistoriaClinicaService } from '../../../services/historia-clinica.service';
import { ChangeDetectorRef } from '@angular/core';
import { EspecialistaService } from '../../../services/especialista.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})export class PacientesComponent implements OnInit {
  ////////////////////////////////////// ATRIBUTOS //////////////////////////////////////
  public pacientes!: Paciente[];
  showFormComponent = false;
  isRegistrationSuccessful = false;
  public historialClinico: HistoriaClinica[] = [];
  public especialistas: Especialista[] = [];
  showPacientes = true; // Nueva bandera para controlar la visibilidad de los pacientes

  ////////////////////////////////////// CTOR & ONINIT //////////////////////////////////////
  constructor(
    private pacientesService: PacienteService,
    private router: Router,
    private historialClinicoService: HistoriaClinicaService,
    private cdr: ChangeDetectorRef, 
    private especialistasService: EspecialistaService
  ) {}

  ngOnInit(): void {
    this.pacientesService.traer().subscribe(pacientes => this.pacientes = pacientes);
    this.especialistasService.traer().subscribe(especialistas => this.especialistas = especialistas);
  }

  ////////////////////////////////////// FUNCIONES //////////////////////////////////////
  onAddPacienteAdmin(){
    this.showFormComponent = !this.showFormComponent;
  }

  onRegistrationSuccess(success: boolean) {
    if (success) {
      this.isRegistrationSuccessful = true;
    }
  }

  sacarKey(datos: DatoDinamico) {
    return Object.keys(datos)[0];
  }

  getEspecialista(email: string): string {
    for (const esp of this.especialistas) {
      if (esp.email === email) {
        return `${esp.nombre} ${esp.apellido}`;
      }
    }
    return '';
  }

  onGetHistorial(paciente: Paciente) {
    this.historialClinicoService.traerHistorialClinicoPorID(paciente.idDoc)
      .subscribe(historial => { 
        if (historial.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'Sin Historial',
            text: 'Este paciente no tiene historial clínico cargado.',
          });
        } else {
          this.historialClinico = historial;
          this.showPacientes = false;//-->Ocultar los pacientes cuando se muestra el historial
        }
        this.cdr.detectChanges();//-->Forzar la detección de cambios
      });
  }
  

  onReset() {
    this.historialClinico = [];
    this.showPacientes = true; // Mostrar los pacientes cuando se cierra el historial
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  getPaciente(email: string) {
    for (const pac of this.pacientes) {
      if (pac.email === email) {
        return `${pac.nombre} ${pac.apellido}`;
      }
    }
    return '';
  }
}
