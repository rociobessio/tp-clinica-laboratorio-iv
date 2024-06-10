import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { ImagenService } from './imagen.service';
import { Paciente } from '../interfaces/paciente.interface';

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
}
