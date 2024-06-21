import { Component, OnInit } from '@angular/core';
import { Especialista } from '../../../interfaces/especialista.interface';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { EspecialistaService } from '../../../services/especialista.service';
import { CurrentUserService } from '../../../services/current-user.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent implements OnInit{
  public especialista!: Especialista;

  constructor(private authService : AuthService,private router : Router,
    private especialistaService : EspecialistaService,private cUserService : CurrentUserService) {}

  
  /**
   * En el OnInit
   * traigo al especialista para
   * luego mostrar su informacion.
   */
  ngOnInit(): void {
    this.authService.getUserLogged().subscribe((user) =>{
      this.authService.esEspecialista(user?.email!)
        .subscribe((esp) =>{
          if(esp) this.especialista = esp as Especialista;

          console.log('Especialista ingresado: ', this.especialista);
        });
    });
  }

  /**
   * 
   * @param url donde va
   * @param accion la accion a realizar
   */
  goTo(url: string, accion: string): void {
    this.cUserService.accionHorarios = accion;
    this.router.navigateByUrl(url);
  }

}
