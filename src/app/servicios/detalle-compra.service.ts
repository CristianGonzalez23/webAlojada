import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleCompraService {
  private detalleURL = "http://localhost:8081/api/detallecompra"
  constructor(private http: HttpClient) { }
  public listarMisCompras(codigoUsuario: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.detalleURL}/listarMisCompras/${codigoUsuario}`
    );
  }
}
