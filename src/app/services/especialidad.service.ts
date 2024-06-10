import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot, query } from '@angular/fire/firestore';
import { Especialidad } from '../interfaces/especialida.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  constructor(private firestore : Firestore) { }

  /**
   * Me permitira guardar una lista de
   * especialidedas.
   * @param listaEspecialidades 
   * @returns 
   */
  obtenerEspecialidades(
    listaEspecialidades: Especialidad[]
  ) {
    const q = query(collection(this.firestore, 'especialidades'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Clear the array to avoid duplication
      listaEspecialidades.length = 0;
      snapshot.forEach((doc) => {
        listaEspecialidades.push(doc.data() as Especialidad);
      });
    });
    return unsubscribe;
  }

  /**
   * Me permitira guardar una nueva
   * especialidad.
   * @param nuevaEspecialidad La nueva especialidad
   * @returns 
   */
  agregarEspecialidad(
    nuevaEspecialidad: Especialidad
  )
  : void {
    if (!nuevaEspecialidad) return;
    const ref = collection(this.firestore, 'especialidades');
    addDoc(ref, nuevaEspecialidad);
  }

  traer(): Observable<Especialidad[]> {
    const q = query(collection(this.firestore,'especialidades'));
    return new Observable<Especialidad[]>((observer) => {
      onSnapshot(q, (snapshot) => {
        const especialidades: Especialidad[] = [];
        snapshot.docChanges().forEach((change) =>{
          const one = change.doc.data() as Especialidad;
          especialidades.push(one);
        });
        observer.next(especialidades);
      });
    });
  }
}
