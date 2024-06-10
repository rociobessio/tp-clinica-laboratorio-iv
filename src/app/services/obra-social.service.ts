import { Injectable } from '@angular/core';
import { Firestore, collection, onSnapshot, query } from '@angular/fire/firestore';
import { ObraSocial } from '../interfaces/obraSocial.interface';

@Injectable({
  providedIn: 'root'
})
export class ObraSocialService {
  constructor(private firestore : Firestore) { }

  /**
   * Me permitira obtener las 
   * obras sociales.
   * @param listaObras 
   * @returns 
   */
  obtenerObrasSociales(listaObras: ObraSocial[]) {
    const q = query(collection(this.firestore, 'obrasSociales'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Clear the array to avoid duplication
      listaObras.length = 0;
      snapshot.forEach((doc) => {
        listaObras.push(doc.data() as ObraSocial);
      });
    });
    return unsubscribe;
  }
}
