import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatoDinamico, HistoriaClinica } from '../../../interfaces/historiaClinica.interface';
import { Paciente } from '../../../interfaces/paciente.interface';
import { PacienteService } from '../../../services/paciente.service';
import { HistoriaClinicaService } from '../../../services/historia-clinica.service';
import { AuthService } from '../../../services/auth.service';

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
////////////////////////////////// CTOR & ONINIT //////////////////////////////////
  constructor(private pacienteService : PacienteService, private historiaClinicaService : HistoriaClinicaService,
    private authService : AuthService,private cdr: ChangeDetectorRef) {}

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
                        console.log('todos historiales: ', this.todosHistorialesClinicos);
  
                        // Verifico si el paciente ya está en la lista
                        if (!this.pacientes.some(p => p.email === paciente.email)) {
                          this.pacientes.push(paciente);
                          this.cdr.detectChanges(); // Fuerzo la detección de cambios
                        }
                        console.log(this.pacientes);
                      }
                    }
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
  onGetHistorial(paciente: Paciente) {
    for (const his of this.todosHistorialesClinicos) {
      if (his.emailPaciente === paciente.email) {
        this.historiaClinica.push(his);
      }
    }
    this.cdr.detectChanges();
    console.log('Historial paciente: ', this.historiaClinica);    
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
}
