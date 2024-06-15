import { Injectable } from '@angular/core';
import { Especialista } from '../interfaces/especialista.interface';
import { Firestore, collection, doc, onSnapshot, query, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getDocs, updateDoc } from 'firebase/firestore';

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

  traer(): Observable<Especialista[]> {
    const q = query(collection(this.firestore,'especialistas'));
    return new Observable<Especialista[]>((observer) => {
      onSnapshot(q, (snapshot) => {
        const especialistas: Especialista[] = [];
        snapshot.docChanges().forEach((change) =>{
          const one = change.doc.data() as Especialista;
          especialistas.push(one);
        });
        observer.next(especialistas);
      });
    });
  }

  /**
   * Me permitira modificar/updatear a un
   * especialista.
   * @param especialista el especialista
   * a updatear.
   */
  updateEspecialista(
    especialista : Especialista
  )
  : void{
    if (especialista === null) return;
    const docs = doc(this.dataRef,especialista.idDoc);
    updateDoc(docs, {active: especialista.active});
  }

  /**
   * Me permitira traerme un especialista
   * por su mail.
   * @param email el mail del
   * especialista
   * @returns 
   */
  obtenerEspPorMail(
    email: string
  ): Observable<Especialista | undefined> {
    return new Observable<Especialista | undefined>(obs => {
      this.traer()
        .subscribe(lista => {
          obs.next(lista.find(e => e.email === email));
          obs.complete();
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
