import { Component, Input, OnInit } from '@angular/core';
import { Horario, Jornada } from '../../interfaces/jornada.interface';
import { HorarioAtencion, Turno } from '../../interfaces/turno.interface';
import { Especialista } from '../../interfaces/especialista.interface';
import { Especialidad } from '../../interfaces/especialida.interface';
import { AuthService } from '../../services/auth.service';
import { EspecialistaService } from '../../services/especialista.service';
import { JornadaService } from '../../services/jornada.service';
import { CronogramaService } from '../../services/cronograma.service';
import { EspecialidadService } from '../../services/especialidad.service';
import { TurnoService } from '../../services/turno.service';
import { Paciente } from '../../interfaces/paciente.interface';
import { PacienteService } from '../../services/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrl: './solicitar-turno.component.css'
})
export class SolicitarTurnoComponent implements OnInit{
///////////////////// ATRIBUTOS /////////////////////
@Input() public isAdministrador: boolean = false;//-->Para pasarle el rol,
public isLoading : boolean = false;

public jornadas!: Jornada[];
public turnosDisponibles: any[] | null = null;
public fechas!: any;

public turno!: Turno;
public horarios: Horario[] = [];
public turnosActuales!: Turno[];

public emailPaciente!: string; 
public pacientes: Paciente[] = [];
public pacienteSelect: Paciente | null = null;
public especialistas: Especialista[] = [];
public especialidades: Especialidad[] = [];
public especialistasDisponibles: Especialista[] = [];

public filtroSelect!: string;
public especialistaSelect: Especialista | null = null;
public especialidadSelect: string = "";
public diaSelect: HorarioAtencion | null = null;
public indexSelect: number = 0;
public diaNombreSelect!: string;

///////////////////// CONSTRUCTOR & OnInit /////////////////////
  constructor(private authService : AuthService, private especialistaService : EspecialistaService,
    private especialidadService : EspecialidadService, private jornadaService : JornadaService,
    private turnoService : TurnoService, private cronogramaService : CronogramaService,
    private pacienteService : PacienteService
  ) {}


  /**
   * En el OnInit me traigo
   * todos los datos.
   */
  ngOnInit(): void {
    // this.cronogramaService.generarJornadaInicial();//-->Genero por primera vez el cronograma
    this.pacienteService.traer().subscribe(data => this.pacientes = data);
    this.especialistaService.traer().subscribe(data => this.especialistas = data);
    this.especialidadService.traer().subscribe(data => this.especialidades = data);
    this.jornadaService.traerTodasLasJornadas().subscribe(resp =>{
      this.jornadas = resp;
      this.turnoService.traerTurnos().subscribe(data => {this.turnosActuales = data});
    });

    // console.log('pacientes:', this.pacientes);
    // console.log('especialistas: ', this.especialistas);
    // console.log('especialidades: ', this.especialidades);
    // console.log('jornadas: ', this.jornadas);
    // console.log('turnos: ', this.turnosActuales);

    //-->Si no es administrador asigo el email: del paciente
    if(!this.isAdministrador){
      this.authService.getUserLogged()
        .subscribe((user) =>{
          if(user)
            this.emailPaciente = user.email!;

          console.log('Ingresado como paciente: ', this.emailPaciente);
        });
    }
  }

///////////////////// METODOS /////////////////////

  /**
   * Me permitira obtener una especialidad.
   * @param especialidad La especialidad
   * seleccionada por el usuario.
   */
  setEspecialidad(
    especialidad : string
  ) : void{
    this.isLoading = true;
    setTimeout(() =>{
      this.especialidadSelect = especialidad;
      console.log('Especialidad seleccionada: ', this.especialidadSelect);
      this.filterEspecialistas(especialidad);
      this.isLoading = false;
    },1000);
  }

  /**
   * Me permitira filtrar
   * especialistas por especialidad.
   * @param especialidad 
   */
  filterEspecialistas(
    especialidad : string
  ) : void{
    this.especialistasDisponibles = [];
    for(const especialista of this.especialistas){
      if(especialista.especialidad.includes(especialidad)) this.especialistasDisponibles.push(especialista);
    }
  }

  /**
   * Si el administrador desea
   * asignar un turno podra hacerlo.
   * Este metodo obtiene al paciente
   * seleccionado.
   * @param paciente 
   */
  setPaciente(
    paciente : Paciente
  ) : void{
    this.isLoading = true;
    setTimeout(() => { 
        this.pacienteSelect = paciente;
        this.emailPaciente = paciente.email;
        console.log('paciente seleccionado: ', this.pacienteSelect);
        this.isLoading = false;
    }, 1000);
  }

  /**
   * Me permitira obtener
   * al especialista seleccionado.
   * @param esp El especialista
   * seleccionado
   */
  setEspecialista(
    esp : Especialista
  ) : void{
    setTimeout(() =>{
      this.especialistaSelect = esp;
      console.log('Especialista seleccionado: ', this.especialistaSelect);
      this.loadTurnos();
    },1000);
  }

  private loadTurnos() : void{
    this.horarios = [];
    this.turnosDisponibles = [];
    let fecha = new Date(Date.now());
    fecha.setDate(fecha.getDate() + 1);

    //--> De aca a 15 dias.
    for(let index = 0; index < 15; index++){
      let unDia: HorarioAtencion[] = [];
      
      if(index != 0) fecha.setDate(fecha.getDate() + 1);

      const dia = this.convertirDiaATexto(fecha.getDay());

      //-->Recorro las jornadas.
      for(const jornada of this.jornadas){
        //--> Que el especialista coincida su mail con la jornada seleccionada.
        if(this.especialistaSelect?.email === jornada.email){
          //-->Que no sea doming y sea un dia valido.
          if(dia !== 'domingo' && jornada.dias[dia].length > 0){
            //-->Recorro los horarios de la jornada
            for(const horarioJornada of jornada.dias[dia]){
              const disponible = this.existeHorarioEnTurnos(horarioJornada,fecha.toLocaleDateString());

              const horarioAtencion: HorarioAtencion = {
                horario: horarioJornada,
                especialistaEmail: jornada.email,
                disponible: disponible
              };
              unDia.push(horarioAtencion);
            }
          }
        }
      }

      this.fechas = {
        [`${fecha.toLocaleDateString()}`]: unDia,
        dia: dia
      };

      //-->Cargo
      this.turnosDisponibles.push(this.fechas);
    }
  }

   /**
  * Como para reiniciar.
  */
  onReset(){
    if (this.diaSelect) {
      this.diaSelect = null;
    }
    else if (this.especialistaSelect != null) {
      this.turnosDisponibles = null;
      this.especialistaSelect = null;
    }
    else if (this.especialidadSelect != '') {
      this.especialidadSelect = "";
    } else {
      this.pacienteSelect = null;
    }
  }

  /**
   * Me permitira generar un nuevo
   * turno y guardarlo en una coleccion.
   * @param fecha 
   * @param turno 
   */
  onGenerarTurno(
    fecha : string,
    turno : HorarioAtencion
  ) : void{
    this.turno = {
      horario: turno.horario,
      fecha: fecha,
      emailPaciente: this.emailPaciente,
      emailEspecialista: turno.especialistaEmail,
      especialidad: this.especialidadSelect,
      estado: 'pendiente',
      id: '',

      resenia: '',
      calificacion: '',
      encuesta: []
    };

    //-->Guardo el turno.
    this.turnoService.addTurno(this.turno);

    Swal.fire({
      title: 'Turno Generado',
      text: 'Se ha generado su turno, no olvide dejar una reseña.',
      icon: 'success',
    })
    .then(() => this.onReset());//-->Reseteo
  }

///////////////////// MANEJO DE FORMATOS DE FECHAS /////////////////////

  /**
   * Recibo un numeo
   * y lo paso a string.
   * @param dia numero de dia
   * @returns 
   */
  private convertirDiaATexto(dia: number): string {
    const semana = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    return semana[dia];
  }

  /**
   * Para controlar si el horario
   * existe en la fecha dada.
   * @param horario 
   * @param fecha 
   * @returns 
   */
  existeHorarioEnTurnos(horario: Horario, fecha: string): boolean {
    for (const turno of this.turnosActuales) {
      if (turno.horario.hora === horario.hora && turno.horario.nroConsultorio === horario.nroConsultorio && fecha === turno.fecha) {
        return false;
      }
    }
    return true;
  }

  getFechaTurno(select: HorarioAtencion, index: number, dia: string): void {
    console.log(dia);
    this.indexSelect = index;
    this.diaSelect = select;
    this.diaNombreSelect = dia;
  }

  getFecha(array: any[] | null, index: number): string {
    if(!array) return "";

    const dato = this.getKeyByIndex(array, index);
    const fecha = dato.split('/')
    return fecha[0] + '/' + fecha[1];
  }

///////////////////// ARRAYS/INDEX /////////////////////

  getElementFromArray(array: any[], index: number): any[] {
    // if (!array) {
    //   return [];
    // }
    // return array[index][this.getKeyByIndex(array, index)];
    return array[index][this.getKeyByIndex(array, index)];
  }
  
  getKeyByIndex(array: any[], index: number): string {
    return Object.keys(array[index])[0];
  }

  /**
   * Me permitira corroborar
   * si el array de turnos disponibles
   * se vacia.
   * @param array 
   * @returns 
   */
  checkIfArrayEmpty(array: any[] | null) : boolean{
    if(!array) return false;

    //-->Recorro el array
    for (let i = 0; i < array.length; i++) {
      if (this.getElementFromArray(array, i).length > 0) {
        return false;//-->Mientras siga tirando, lanzo false.
      }
    }
    return true;
  }
}
