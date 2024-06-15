import { Injectable } from '@angular/core';
import { Admin } from '../interfaces/admin.interface';
import { Firestore, collection, doc, getDocs, onSnapshot, query, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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

  traer()
  : Observable<Admin[]> {
    const q = query(collection(this.firestore,'admins'));
    return new Observable<Admin[]>((observer) => {
      onSnapshot(q, (snapshot) => {
        const admins: Admin[] = [];
        snapshot.docChanges().forEach((change) =>{
          const one = change.doc.data() as Admin;
          admins.push(one);
        });
        observer.next(admins);
      });
    });
  }

  async obtener(ruta:string)
  {
    let array :any[]=[];
    const querySnapshot = await getDocs(collection(this.firestore,ruta));
    querySnapshot.forEach((doc) => {
      let data = {
        id : doc.id,
        data : doc.data()
      }
      array.push(data);
    });
    return array;
  }
}
