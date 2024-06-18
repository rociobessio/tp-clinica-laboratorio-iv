import { Injectable } from '@angular/core';
import { Firestore, doc, onSnapshot, setDoc } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Turno } from '../interfaces/turno.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private turnosRef = collection(this.firestore,'turnos');

  constructor(private firestore : Firestore) { }

  /**
   * Me permitira guardar un turno
   * nuevo en la coleccion de firestore.
   * @param nuevoTurno El nuevo turno
   * a guardar.
   * @returns 
   */
  addTurno(
    nuevoTurno: Turno
  )
  :void{
    if(nuevoTurno === null) return;
    const docs = doc(this.turnosRef);
    nuevoTurno.id = docs.id;
    setDoc(docs, nuevoTurno);
  }

  /**
   * Me permitira modificar
   * un turno ya generado.
   * @param turno el turno que 
   * se modificara.
   * @returns 
   */
  updateTurno(
    turno : Turno
  ):void{
    if(turno === null) return;
    const docs = doc(this.turnosRef, turno.id);
    setDoc(docs, { estado: turno.estado, reseña: turno.resenia, calificacion: turno.calificacion, encuesta: turno.encuesta});
  }

  /**
   * Me permitira traerme todos los turnos
   * generados.
   * @returns Un observable con todos los
   * turnos.
   */
  traerTurnos(): Observable<Turno[]> {
    return new Observable<Turno[]>((observer) => {
      onSnapshot(this.turnosRef, (snap) => {
        const turnos: Turno[] = [];
        snap.docChanges().forEach(x => {
          const data = x.doc.data() as Turno;
          turnos.push(data);
        });
        observer.next(turnos);
      });
    });
  }
}
