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

  constructor(private authService : AuthService,private jornadaService : JornadaService) {}

  ngOnInit(): void {
    this.authService.getUserLogged()
      .subscribe((res) => {
        if (res) {
          this.email = res!.email as string;
          this.jornadaService.traerJornada(this.email).subscribe(jornada => {
            this.jornada = jornada
          });
        }
      });
  }
  
  changeSelect(sel: string) {
    this.selected = sel;
  }
}
