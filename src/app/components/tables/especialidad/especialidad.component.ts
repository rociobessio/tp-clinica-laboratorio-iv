import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Especialidad } from '../../../interfaces/especialida.interface';
import { EspecialidadService } from '../../../services/especialidad.service';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.css'
})
export class EspecialidadComponent implements OnInit{
  @Output() public especialidad = new EventEmitter<string>();
  @ViewChild('especialidadInput') especialidadInput!: ElementRef;
  public rowsClicked: number[] = [];
  public especialidades: Especialidad[] = [];
  public error: boolean = false;

  @Input() isAdmin: boolean = false;//--> Para controlar mostrar el btn

  constructor(private especialidadService: EspecialidadService) { }

  ngOnInit(): void {
    this.especialidadService.obtenerEspecialidades(this.especialidades);
    console.log('Array de especialidades: ', this.especialidades);
  }

  onClickRow(obra: any, idx: number) {
    if (this.rowsClicked.includes(idx)) {
      this.rowsClicked.splice(this.rowsClicked.indexOf(idx), 1);
    } else {
      this.rowsClicked.push(idx);
    }

    this.especialidad.emit(obra);
    console.log("rowClicked: " + this.rowsClicked);
  }

  quitarAcentos(texto: string): string {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  addEspecialidad() {
    const especialidad = this.especialidadInput.nativeElement.value;
    const nuevaEspecialidad = this.quitarAcentos(especialidad);
    this.error = false;
    const esp = { nombre: nuevaEspecialidad } as Especialidad;

    this.especialidades.forEach((e) => {
      if (e.nombre.toLowerCase() == esp.nombre.toLowerCase()) {
        this.error = true;
        return;
      }
    });

    if (!this.error) {
      this.especialidadService.agregarEspecialidad(esp);
      this.especialidadInput.nativeElement.value = '';
    }
  }
}
