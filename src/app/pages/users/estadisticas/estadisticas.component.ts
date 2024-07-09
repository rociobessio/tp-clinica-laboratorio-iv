import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { AuthService } from '../../../services/auth.service';
import 'chartjs-adapter-date-fns';


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements AfterViewInit {
  @ViewChild('scatterChart') scatterChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart') pieChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart') barChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineChart') lineChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineChart2') lineChart2!: ElementRef<HTMLCanvasElement>;
  @ViewChild('card') card!: ElementRef;

  ingresosData: any[] = [];
  scatterChartInstance: any;
  logs: any[] = [];
  turnos: any[] = [];
  conteoEspecialidades: any = {};
  conteoTurnosPorDia: any = {};
  coloresPorUsuario: { [usuario: string]: string } = {};
  conteoTurnosSolicitadoPorMedicoEnUnLapso: any = {};
  conteoTurnosFinalizadoPorMedicoEnUnLapso: any = {};
  lineChartInstance: any;
  lineChartInstance2: any;

  form = this.formBuilder.group({
    fechaInicio: [null, []],
    fechaFin: [null, []],
  });

  form2 = this.formBuilder.group({
    fechaInicio: [null, []],
    fechaFin: [null, []],
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  async ngAfterViewInit() {
    this.logs = await this.authService.getLogs();
    console.log(this.logs);

    this.logs = this.logs.sort((a: any, b: any) => {
      const dateA = new Date(a.data.loginTime).getTime();
      const dateB = new Date(b.data.loginTime).getTime();
      return dateB - dateA;
    });

    this.onFormatearLogs();
    this.renderScatterChart();
  }

  private onFormatearLogs() {
    this.logs.forEach((log: any) => {
      const fecha = new Date(log.data.loginTime);
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1;
      const año = fecha.getFullYear();

      const fechaFormateada = `${dia}-${mes}-${año}`;
      const horas = fecha.getHours().toString().padStart(2, '0');
      const minutos = fecha.getMinutes().toString().padStart(2, '0');
      const horario = `${horas}hs`;
      const horarioDetalle = `${horas}:${minutos}`;

      const usuario = log.data.email;
      const color = this.coloresPorUsuario[usuario] || this.getColorBasedOnTime();

      let formateado = {
        usuario: log.data.email,
        dia: fechaFormateada.toString(),
        horario: horario,
        horarioDetalle: horarioDetalle,
        color: color
      };

      this.coloresPorUsuario[usuario] = color;
      this.ingresosData.push(formateado);
    });
  }

  private getColorBasedOnTime(): string {
    const time = new Date().getTime();
    const variation = Math.floor(Math.random() * 1000);
    const color = `#${((time + variation) & 0xFFFFFF).toString(16).toUpperCase()}`;

    return color;
  }

  private renderScatterChart() {
    const ctx = this.scatterChart.nativeElement.getContext('2d');
    if (ctx) {
      this.scatterChartInstance = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Ingresos de usuarios',
            data: this.ingresosData.map(data => ({ x: data.dia, y: data.horarioDetalle })),
            backgroundColor: this.ingresosData.map(data => data.color),
          }],
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day'
              },
              title: {
                display: true,
                text: 'Día'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Hora'
              }
            }
          }
        }
      });
    }
  }
}
