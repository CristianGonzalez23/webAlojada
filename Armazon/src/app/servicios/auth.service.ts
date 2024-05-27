import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioDTO } from '../modelo/usuario-dto';
import { Observable } from 'rxjs';
import { SesionDTO } from '../modelo/sesion-dto';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { TokenDTO } from '../modelo/token-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private authURL = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) {}

  public registrar(usuario: UsuarioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/registro`, usuario);
  }

  public login(sesion: SesionDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/login`, sesion);
  }

  //public refresh(token: TokenDTO): Observable<MensajeDTO> {
    public refresh(token: any): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/refresh`, token);
  }

  public solicitarCambioContrasena(email: string): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/solicitar?email=${encodeURIComponent(email)}`, null);
  }

  public cambiarContrasena(token:string, contrasena: string): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/confirmarCambio?token=${encodeURIComponent(token)}&contrasena=${encodeURIComponent(contrasena)}`, null);
  }
  
}
