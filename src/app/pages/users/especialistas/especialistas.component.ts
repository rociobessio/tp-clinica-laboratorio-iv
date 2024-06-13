import { Component, OnInit } from '@angular/core';
import { Especialista } from '../../../interfaces/especialista.interface';
import { Especialidad } from '../../../interfaces/especialida.interface';
import { EspecialidadService } from '../../../services/especialidad.service';
import { EspecialistaService } from '../../../services/especialista.service';
import { databaseInstance$ } from '@angular/fire/database';

@Component({
  selector: 'app-especialistas',
  templateUrl: './especialistas.component.html',
  styleUrl: './especialistas.component.css'
})
export class EspecialistasComponent implements OnInit{
  public especialistas!: Especialista[];//-->Para traer especialistas
  public especialidades!: Especialidad[];//-->Para traer pacientes
  showFormComponent = false;
  isRegistrationSuccessful = false;
  
  constructor(private especialistaService : EspecialistaService, private especialidadService : EspecialidadService){}
  
  /**
   * EN el onInit
   * cargo los arrays de espcialistas
   * y especialidades.
   */
  ngOnInit(): void {
    this.especialistaService.traer().subscribe(data => this.especialistas = data);
    this.especialidadService.traer().subscribe(data => this.especialidades = data);
  }

  /**
   * Me permitira habilitar o no
   * a un especialista.
   * @param esp El Especialista
   */
  onActivarEspecialista(
    esp: Especialista
  ){
    console.log(esp);
    esp.active = !esp.active;//-->Cambio el estado
    for (const especialidad of esp.especialidad) {
      if (!this.containsNewEspecialidad(especialidad)) {//-->Si no esta la agrego
        this.especialidadService.agregarEspecialidad({ nombre: especialidad, img: '' });
      }
    }

    //--> Hago update del especialista
    this.especialistaService.updateEspecialista(esp);
    //--> Vuelvo a traer a los especialistas
    this.especialistaService.traer().subscribe(data => this.especialistas = data);
  }

  /**
   * Corroboro que la especialidad
   * del especialista se encuentre
   * dentro del array de especcialidades
   * @param esp 
   * @returns 
   */
  containsNewEspecialidad(
    esp: string
  ) {
    for (const especialidad of this.especialidades) {
      if (esp === especialidad.nombre) {
        return true;
      }
    }
    return false;
  }

  onRegistrationSuccess(success: boolean) {
    if (success) {
      this.isRegistrationSuccessful = true;
      // window.location.reload();//-->Recargo la pagina
    }
  }

  onAddEspecialistaAdmin(){
    this.showFormComponent = !this.showFormComponent;
  }
}
