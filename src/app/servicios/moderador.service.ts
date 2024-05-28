import { Injectable } from '@angular/core';
import { ProductoModeradorDTO } from '../modelo/producto-moderador-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';

@Injectable({
  providedIn: 'root'
})
export class ModeradorService {

  private publiUrl = 'http://localhost:8081/api/moderador';

  constructor(private http: HttpClient) { }

  public autorizacionPublicacion(productoModeradorDTO:ProductoModeradorDTO ): Observable<MensajeDTO> {
    
    return this.http.put<MensajeDTO>(`${this.publiUrl}/autorizacionPublicacion`, productoModeradorDTO);
  }

}
