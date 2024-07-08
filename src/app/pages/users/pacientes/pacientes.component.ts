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
import { TurnoService } from '../../../services/turno.service';
import { Turno } from '../../../interfaces/turno.interface';


import { ExcelService } from '../../../services/excel.service';
import * as XLSX from 'XLSX';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent implements OnInit {
  ////////////////////////////////////// ATRIBUTOS //////////////////////////////////////
  public pacientes!: Paciente[];
  showFormComponent = false;
  isRegistrationSuccessful = false;
  public historialClinico: HistoriaClinica[] = [];
  public especialistas: Especialista[] = [];
  
  showPacientes = true; //-->Nueva bandera para controlar la visibilidad de los pacientes
  mostrarHistorial: boolean = false;//-->Para mostrar una tabla o la otra

  public turnosPacientes: Turno[] = [];
  public pacienteSelect: Paciente | null = null;
  public emailPaciente!: string; 
  public especialista!: Especialista;
  ////////////////////////////////////// CTOR & ONINIT //////////////////////////////////////
  constructor(
    private pacientesService: PacienteService,
    private router: Router,
    private historialClinicoService: HistoriaClinicaService,
    private cdr: ChangeDetectorRef, 
    private especialistasService: EspecialistaService,
    private turnosService : TurnoService,
    private excelService : ExcelService
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

  setPaciente(
    paciente : Paciente
  ) : void{
    // this.isLoading = true;
    setTimeout(() => { 
        this.pacienteSelect = paciente;
        this.emailPaciente = paciente.email;
        console.log('paciente seleccionado: ', this.pacienteSelect);
        // this.isLoading = false;
        this.showPacientes = false;//-->Ocultar los pacientes cuando se seleccione un pac
    }, 1000);
  }

  onGetHistorial(paciente: Paciente) {
    this.mostrarHistorial = true;
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

  onVerTurnos(
    paciente : Paciente
  ):void{
    this.mostrarHistorial = false;
    this.turnosService.getTurnosByEmailPaciente(paciente.email)
      .subscribe(turnos =>{
        if(turnos.length === 0){
          Swal.fire({
            icon: 'info',
            title: 'Sin turnos.',
            text: 'Este paciente no tiene turnos generados.',
          });
        }
        else{
          this.turnosPacientes = turnos;
          console.log(this.turnosPacientes);
          
          this.showPacientes =false;
        }
        this.cdr.detectChanges();//-->Forzar la detección de cambios
      });
  }

  /**
   * Me permitira descargar
   * los turnos del paciente.
   */
  onDescargarTurnosExcel() {
    console.log('On descargar excel');
    
    const nombreFile = this.pacienteSelect?.nombre + '_' + this.pacienteSelect?.apellido + '.xlsx';
    let data = document.getElementById("tabla-turnos");
    if (data) {
      console.log('encuentra data');
      
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, nombreFile);
    }
  }
  

  onReset() {
    this.historialClinico = [];
    this.turnosPacientes = [];
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
