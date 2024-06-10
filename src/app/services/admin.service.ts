import { Injectable } from '@angular/core';
import { Admin } from '../interfaces/admin.interface';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private dataRef = collection(this.firestore, 'admins');

  constructor(private firestore: Firestore) { }

  /**
   * Me permiitra agregar a la
   * coleccion de firestore un nuevo
   * administador.
   * @param nuevoAdmin El nuevo 
   * admin a guardar.
   * @returns 
   */
  addAdmin(
    nuevoAdmin: Admin
  )
  :Promise<any>{
    if(nuevoAdmin === null) return Promise.reject();
    const docs = doc(this.dataRef);
    nuevoAdmin.idDoc = docs.id;
    return setDoc(docs, nuevoAdmin);
  }
}
