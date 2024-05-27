import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ImagenService {
  private imgURL = 'http://localhost:8081/api/imagenes';
  constructor(private http: HttpClient) {}
  
  
  
  public subir(imagen: FormData, codigoPublicacion: number): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.imgURL}/upload/${codigoPublicacion}`, imagen);
  }
  
  
  
  public eliminar(id: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.imgURL}/eliminar/${id}`);
  }
}
