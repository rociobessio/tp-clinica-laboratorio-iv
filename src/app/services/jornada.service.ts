import { Injectable } from '@angular/core';
import { Jornada } from '../interfaces/jornada.interface';
import { collection, onSnapshot } from 'firebase/firestore';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {
  public jornada!: Jornada;

  private especialisJorRef = collection(this.firestore, 'jornada-especialista');
  
  constructor(private firestore : Firestore) { }

  /**
   * Me permitira agregar una
   * nueva jornada a la coleccion
   * de firestore.
   * @param nuevaJornada 
   * @returns 
   */
  addJornada(
    nuevaJornada: Jornada
  )
  :void{
    if(nuevaJornada === null) return;
    const docs = doc(this.especialisJorRef);
    nuevaJornada.id = docs.id;
    setDoc(docs, nuevaJornada);
  }

  /**
   * Me permitira actualizar una
   * jornada mediante su id,
   * actualizando los dias.
   * @param jornada 
   * @returns 
   */
  updateJornada(
    jornada : Jornada
  ):void{
    if(jornada === null) return;
    const docs = doc(this.especialisJorRef, jornada.id);
    setDoc(docs, {dias: jornada.dias});
  }

  /**
   * Me permitira traer una jornada
   * de un especialista mediante
   * la coincidencia de emails.
   * @param email email del profesional
   * @returns 
   */
  traerJornada(
    email:string 
  ):Observable<Jornada>{
    return new Observable<Jornada>((obs) =>{
      onSnapshot(this.especialisJorRef, (snap) =>{
        let jornada!: Jornada;
        snap.docChanges().forEach(x =>{
          const data = x.doc.data() as Jornada;
          if(data.email === email)//-->Si coincide la jornada del especialista
          {
            jornada = data;
            return;
          }
        });
        obs.next(jornada);//-->Voy a la que sigue.
      });
    });
  }

  /**
   * Me permitira traerme TODAS
   * las jornadas, sin importar 
   * el especialista.
   * @returns 
   */
  traerTodasLasJornadas(
  ) : Observable<Jornada[]>{
    return new Observable<Jornada[]>((observer) => {
      onSnapshot(this.especialisJorRef, (snap) => {
        const jornadas: Jornada[] = [];
        snap.docChanges().forEach(x => {
          const data = x.doc.data() as Jornada;
          jornadas.push(data);
        });
        observer.next(jornadas);
      });
    });
  }
}
