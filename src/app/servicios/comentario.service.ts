import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { ComentarioDTO } from '../modelo/comentario-dto';
@Injectable({
  providedIn: 'root'
})

export class ComentarioService {
  private comURL = "http://localhost:8081/api/comentario";
  constructor(private http: HttpClient) { }

  public crearComentario(
    comentario: ComentarioDTO
  ): Observable<MensajeDTO> {
    console.log("comentario: "+ JSON.stringify(comentario))
    return this.http.post<MensajeDTO>(`${this.comURL}/crear`, comentario);
  }

    public listarComentarios(codigoPublicacion: number): Observable<MensajeDTO> {
      return this.http.get<MensajeDTO>(`${this.comURL}/listarComentarios/${codigoPublicacion}`);
   }
}


