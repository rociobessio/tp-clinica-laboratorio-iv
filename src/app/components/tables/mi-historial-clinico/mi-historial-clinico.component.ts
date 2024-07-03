import { Component, Input, OnInit } from '@angular/core';
import { DatoDinamico, HistoriaClinica } from '../../../interfaces/historiaClinica.interface';
import { HistoriaClinicaService } from '../../../services/historia-clinica.service';
import { Paciente } from '../../../interfaces/paciente.interface';
import { Especialista } from '../../../interfaces/especialista.interface';
import { AuthService } from '../../../services/auth.service';
import { PacienteService } from '../../../services/paciente.service';
import { EspecialistaService } from '../../../services/especialista.service';
import Swal from 'sweetalert2';

//--->PDF:
import jsPDF from 'jspdf';



@Component({
  selector: 'app-mi-historial-clinico',
  templateUrl: './mi-historial-clinico.component.html',
  styleUrl: './mi-historial-clinico.component.css'
})
export class MiHistorialClinicoComponent implements OnInit {
////////////////////////////////////////////// ATRIBUTOS //////////////////////////////////////////////
  @Input() paciente! : Paciente;//-->El paciente.
  public historialClinico: HistoriaClinica[] = [];
  public especialistas : Especialista[] = [];

////////////////////////////////////////////// CTOR & ONINIT //////////////////////////////////////////////
  constructor(private historiaClinicaService : HistoriaClinicaService,
    private authService : AuthService, private pacienteService : PacienteService,
    private especialistaService : EspecialistaService) { }

  /**
   * En el Oninit verifico
   * que el usuario recibido sea
   * un paciente loggueado y me
   * traigo su historial clinico
   * por ID. Ademas traigo a los especialistas.
   */
  ngOnInit(): void {
    this.authService.getUserLogged()
      .subscribe((usuario) => {
        this.authService.esPaciente(usuario?.email!)
          .subscribe((paciente) => {
            if (paciente) {
              this.paciente = paciente;
              console.log('Paciente encontrado: ', this.paciente); // Log para verificar el paciente
              this.historiaClinicaService.traerHistorialClinicoPorID(this.paciente.idDoc)
                .subscribe((historiales) => {
                  this.historialClinico = historiales;
                  console.log('Historial: ', historiales); // Log para verificar los historiales
                }, (error) => {
                  console.error('Error al traer historiales: ', error); // Log para errores
                });
            }
          });
      });
    this.especialistaService.traer().subscribe(data => this.especialistas = data);
  }

////////////////////////////////////////////// METODOS //////////////////////////////////////////////
  getEspecialista(email: string): string {

    for (const esp of this.especialistas) {
      if (esp.email === email) {
        return `${esp.nombre} ${esp.apellido}`;
      }
    }
    return '';
  }

  /**
   * Me permitira obtener la key
   * del dato dinamico.
   * @param dato el dato dinamico
   * @returns retorna la key del dato
   */
  sacarKey(
    dato : DatoDinamico
  ){
    return Object.keys(dato)[0];
  }
////////////////////////////////////////////// GENERAR PDF //////////////////////////////////////////////
  onGenerarPdfHistorial(){
    
    //-->Que el historial clinico tenga algo cargado.
    if(this.historialClinico){
      let date = new Date(Date.now());
      //-->Para los margenes del PDF
      const margins = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      };

      const doc = new jsPDF();
      const imgWidth = 30;
      const imgHeight = 30;
      //---> Posición X del texto al lado de la imagen
      const textX = margins.left + imgWidth + 10;

      //--> Para el Header:
      doc.addImage(
        'assets/icons/logo-pagina.png', 
        'PNG', 
        margins.left, 
        margins.top, 
        imgWidth, 
        imgHeight
      );
      doc.setFontSize(22);
      doc.setFont('Times');
      doc.text(
        'Clinica Online', 
        textX, 
        margins.top + imgHeight / 2 + 6
      );//--> Centrar verticalmente el texto con la imagen

      //-->El subtitulo:
      const newSubtitulo = margins.top + imgHeight + 20;
      doc.setFontSize(18);
      doc.text(
        `Informe del Paciente ${this.paciente.nombre} ${this.paciente.apellido} 
        \n Fecha: ${date.toLocaleDateString()}`,
        margins.left,
        newSubtitulo
      );

      // //-->Voy a formatear los Historiales Clinicos
      const historiales = this.formatearHistoriales();
      let y = newSubtitulo + 30; // Posición inicial para el contenid

      for (const h of historiales) {
        y = this.addHistorialToPDF(doc, h, margins.left, y);
        y += 10; // Añadir un margen entre los historiales
      }

      //-->Guardar el jsPDF
      doc.save(`historia-clinica-${this.paciente.nombre}-${this.paciente.apellido}.pdf`);      
    }
    else{
      Swal.fire({
        title: 'No es posible descargar.',
        text: 'Aún no tiene un historial clinico generado.',
        icon: 'error',
        background: 'antiquewhite' //-->Color de fondo
      });
    }
  }

  private formatearHistoriales(){
    const historialesFomateados = [];
    for (const his of this.historialClinico) {
      historialesFomateados.push(this.historiaToPDF(his));
    }
    return historialesFomateados;
  }

  private historiaToPDF(
    historial: HistoriaClinica
  ): string[] {
    const pdf = [
      `Especialista: ${this.getEspecialista(historial.emailEspecialista)}`,
      `Altura: ${historial.altura}`,
      `Peso: ${historial.peso}`,
      `Temperatura: ${historial.temperatura}`,
      `Presion: ${historial.presion}`
    ];
  
    for (const dato of historial.datos) {
      const key = this.sacarKey(dato);
      pdf.push(`${key}: ${dato[key]}`);
    }
  
    return pdf;
  }
  

  private addHistorialToPDF(
    doc: jsPDF, 
    historial: string[], 
    x: number, 
    y: number
  ): number {
    historial.forEach((line, index) => {
      if (index === 0) {
        //-->Configurar fuente para la primera línea (especialista)
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
      } else {
        // Configurar fuente para las demás líneas
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(14);
      }
      doc.text(line, x, y);
      y += 10;//->Distancia entre líneas
    });
    return y;
  }
}
