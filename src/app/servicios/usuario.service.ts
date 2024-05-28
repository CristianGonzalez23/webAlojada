import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../modelo/usuario-dto';
import { MensajeDTO } from '../modelo/mensaje-dto';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private userUrl = 'http://localhost:8081/api/usuario';
  constructor(private http: HttpClient) {}

  public obtener(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/obtener/${codigo}`);
  }

  public obtenerID(token: String): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/obtenerID/${token}`);
  }

  public eliminar(codigo: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.userUrl}/eliminar/${codigo}`);
  }

  public actualizar(
    codigo: number,
    usuario: UsuarioDTO
  ): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(
      `${this.userUrl}/actualizar/${codigo}`,
      usuario
    );
  }
}