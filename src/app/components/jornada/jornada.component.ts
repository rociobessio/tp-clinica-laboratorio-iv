import { Component, OnInit } from '@angular/core';
import { Jornada } from '../../interfaces/jornada.interface';
import { AuthService } from '../../services/auth.service';
import { JornadaService } from '../../services/jornada.service';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrl: './jornada.component.css'
})
export class JornadaComponent implements OnInit{
  public email!: string;
  public jornada!: Jornada;
  public selected: string = 'lunes';
  public isLoading: boolean = false;//-->Para mostrar el spinner

  constructor(private authService : AuthService,private jornadaService : JornadaService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.getUserLogged()
      .subscribe((res) => {
        if (res) {
          this.email = res!.email as string;
          this.jornadaService.traerJornada(this.email).subscribe(jornada => {
            this.jornada = jornada
          });
        }
        this.isLoading=false;
      });
  }
  
  changeSelect(sel: string) {
    this.selected = sel;
  }
}
