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

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrl: './solicitar-turno.component.css'
})
export class SolicitarTurnoComponent implements OnInit{
///////////////////// ATRIBUTOS /////////////////////
@Input() public rol: string = '';//-->Para pasarle el rol,

public jornade!: Jornada[];
public turnosDisponibles : any[] | null = null;
public fechas!: any;

public turno!: Turno;
public horarios: Horario[] = [];
public turnosActuales!: Turno[];

emailPaciente!: string;
public especialistas: Especialista[] = [];
public especialidades! : Especialidad;

public filtroSelect!: string;
public especialistaSelect!: Especialista | null;
public especialidadSelect!: string;
public diaSelect!: HorarioAtencion | null;
public indexSelect: number = 0;
public diaNombreSelect!: string;

///////////////////// CONSTRUCTOR & OnInit /////////////////////
  constructor(private authService : AuthService, private especialistaService : EspecialistaService,
    private especialidadService : EspecialidadService, private jornadaService : JornadaService,
    private turnoService : TurnoService, private cronogramaService : CronogramaService
  ) {}


  ngOnInit(): void {
    // this.cronogramaService.generarJornadaInicial();//-->Genero por primera vez el cronograma
  }
}
