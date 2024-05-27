import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  private ciuURL = "http://localhost:8081/api/ciudades";
  constructor(private http: HttpClient) { }
    public listar(): Observable<MensajeDTO> {
      return this.http.get<MensajeDTO>(`${this.ciuURL}/listar`);
   }
}


