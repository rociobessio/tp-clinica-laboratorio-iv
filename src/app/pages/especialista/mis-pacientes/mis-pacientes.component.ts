import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatoDinamico, HistoriaClinica } from '../../../interfaces/historiaClinica.interface';
import { Paciente } from '../../../interfaces/paciente.interface';
import { PacienteService } from '../../../services/paciente.service';
import { HistoriaClinicaService } from '../../../services/historia-clinica.service';
import { AuthService } from '../../../services/auth.service';
import { Turno } from '../../../interfaces/turno.interface';
import { TurnoService } from '../../../services/turno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-pacientes',
  templateUrl: './mis-pacientes.component.html',
  styleUrl: './mis-pacientes.component.css'
})
export class MisPacientesComponent implements OnInit{
////////////////////////////////// ATRIBUTOS //////////////////////////////////
  public historiaClinica : HistoriaClinica[] = [];
  public especialistaEmail!: string;
  public pacientes : Paciente[] =[];
  public todosHistorialesClinicos: HistoriaClinica[] =[];
  public paciente!: Paciente;
  public turnos: Turno[] = [];
////////////////////////////////// CTOR & ONINIT //////////////////////////////////
  constructor(private pacienteService : PacienteService, private historiaClinicaService : HistoriaClinicaService,
    private authService : AuthService,private cdr: ChangeDetectorRef, private turnosService : TurnoService) {}

    ngOnInit(): void {
      this.authService.getUserLogged()
        .subscribe(user => {
          this.especialistaEmail = user?.email!;
          this.pacienteService.traer()
            .subscribe(pacientes => {
              for (const paciente of pacientes) {
                this.historiaClinicaService.traerHistorialClinicoPorID(paciente.idDoc)
                  .subscribe(historiales => {
                    for (const historial of historiales) {
                      if (historial.emailEspecialista === this.especialistaEmail) {
                        this.todosHistorialesClinicos.push(historial);
  
                        if (!this.pacientes.some(p => p.email === paciente.email)) {
                          this.pacientes.push(paciente);
                          this.cdr.detectChanges();
                        }
                      }
                    }
                  });
  
                this.turnosService.getTurnosByEmailPaciente(paciente.email)
                  .subscribe((turnos) => {
                    for (const turno of turnos) {
                      if (turno.emailEspecialista === this.especialistaEmail) {
                        this.turnos.push(turno);
                      }
                    }
                    this.cdr.detectChanges();
                  });
              }
            });
        });
    }
////////////////////////////////// METODOS //////////////////////////////////
  /**
   * Para obtener al paciente.
   * @param email el email 
   * del paciente
   * @returns 
   */
  getPaciente(email: string){
    for (const pac of this.pacientes) {
      if (pac.email === email) {
        return `${pac.nombre} ${pac.apellido}`
        // this.paciente = pac;
      }
    }
    return '';
  }
  

  /**
   * Para sacar la key
   * del dato dinamico.
   * @param datos 
   * @returns 
   */
  sacarKey(datos: DatoDinamico) {
    return Object.keys(datos)[0]
  }

  /**
   * Obtengo el historial
   * del paciente.
   * @param paciente el paciente
   */
  onGetHistorial(paciente: Paciente): void {
    this.historiaClinica = this.todosHistorialesClinicos.filter(his => his.emailPaciente === paciente.email);
    this.cdr.detectChanges();
  }

  getReseniaByEmailAndEspecialidad(email: string, especialidad: string): string {
    const turno = this.turnos.find(t => t.emailPaciente === email && t.especialidad === especialidad && t.resenia !== '');
    return turno ? turno.resenia : '';
  }

  getTurno(emailPaciente: string, especialidad: string): Turno | undefined {
    return this.turnos.find(t => t.emailPaciente === emailPaciente && t.especialidad === especialidad && t.resenia !== '');
  }

  /**
   * Elimino el contenido
   * del array de historias
   * clinicas.
   */
  onReset() {
    this.historiaClinica = [];
    this.cdr.detectChanges();
  }
  onVerResenia(turno?: Turno): void {
    if (turno && turno.resenia) {
      Swal.fire({
        title: 'Información de la reseña.',
        text: turno.resenia,
        icon: 'info',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: 'darkslategray',
        background: 'antiquewhite'
      });
    } else {
      Swal.fire({
        title: "No se ha escrito una reseña todavía.",
        icon: "info",
        confirmButtonText: 'Cerrar',
        confirmButtonColor: 'darkslategray',
        background: 'antiquewhite'
      });
    }
  }
}  
