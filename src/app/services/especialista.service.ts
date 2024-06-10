import { Injectable } from '@angular/core';
import { Especialista } from '../interfaces/especialista.interface';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {
  private dataRef = collection(this.firestore, 'especialistas');

  constructor(private firestore: Firestore) { }

  /**
   * Me permitira guardar un nuevo
   * especialista en firestore.
   * @param nuevoEspecialista Especialista a agregar
   * @returns 
   */
  addEspecialista(
    nuevoEspecialista: Especialista
  ):Promise<any>{
    if(nuevoEspecialista === null) return Promise.reject();
    const docs = doc(this.dataRef);
    nuevoEspecialista.idDoc = docs.id;
    return setDoc(docs, nuevoEspecialista);
  }
}
