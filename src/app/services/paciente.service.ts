import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, onSnapshot, query, setDoc } from '@angular/fire/firestore';
import { ImagenService } from './imagen.service';
import { Paciente } from '../interfaces/paciente.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private dataRef = collection(this.firestore, 'pacientes');
  constructor(private firestore: Firestore, private imgService: ImagenService) { }

  addPaciente(
    nuevoPaciente: Paciente
  )
  :Promise<any>{
    if(nuevoPaciente === null) return Promise.reject();
    const docs = doc(this.dataRef);
    nuevoPaciente.idDoc = docs.id;
    return setDoc(docs, nuevoPaciente);
  }

  /**
   * Me permitira traerme
   * a los pacientes desde
   * firestore.
   * @returns 
   */
  traer()
  : Observable<Paciente[]> {
    const q = query(collection(this.firestore,'pacientes'));
    return new Observable<Paciente[]>((observer) => {
      onSnapshot(q, (snapshot) => {
        const pacientes: Paciente[] = [];
        snapshot.docChanges().forEach((change) =>{
          const one = change.doc.data() as Paciente;
          pacientes.push(one);
        });
        observer.next(pacientes);
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
