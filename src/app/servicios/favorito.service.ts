import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { ProductoService } from './producto.service';
@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  
  
  public agregar(codigo: number){

    if (!this.productoYaAgregado(codigo)) {
      this.productos.push(codigo);
    }

  }
  public eliminar(codigo: number){

    if (!this.productoYaAgregado(codigo)) {
      this.productos.splice(codigo);
    }

  }

  productos: number[];
  private comURL = "http://localhost:8081/api/favorito";
 
  constructor(
    private http: HttpClient,
    private productoService: ProductoService 
  ) {
    this.productos = [];
  }

  public agregarPublicacionFavorita(idUsuario:number, idPublicacion:number): Observable<MensajeDTO>{

    return this.http.get<MensajeDTO>(`${this.comURL}/agregar/${idUsuario}/${idPublicacion}`);
  }

  public eliminarPublicacionFavorita(idUsuario:number, idPublicacion:number): Observable<MensajeDTO>{

    return this.http.get<MensajeDTO>(`${this.comURL}/eliminar/${idUsuario}/${idPublicacion}`);
  }
  /*
  public listarFavoritos(): number[] {
    const favoritosProductos = this.productoService.listarMisPublicacionesFavoritas(); // Llama al método del ProductoService
    // Realiza otras operaciones con los favoritos obtenidos

    return this.productos; // Retorna los favoritos actuales
  }
*/
  
  public quitar(codigo: number){

    let indice = this.productos.indexOf(codigo);
    this.productos.splice(indice, 1);

  }

  private productoYaAgregado(codigo: number): boolean {
    return this.productos.includes(codigo);
  }
}
