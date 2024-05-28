import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { CompraDTO } from '../modelo/compra-dto';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private compraURL = "http://localhost:8081/api/compra";
  constructor(private http: HttpClient) { }

    public realizarCompra(compra: CompraDTO): Observable<MensajeDTO> {
      return this.http.post<MensajeDTO>(`${this.compraURL}/crear`, compra);
   }

  
}
