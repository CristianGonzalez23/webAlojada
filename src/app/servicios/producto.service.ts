//import { ProductoGetDTO } from '../modelo/producto-get-dto';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ComentarioGetDTO } from '../modelo/comentario-get-dto';
import { ProductoGetDTO } from '../modelo/producto-get-dto';
import { PublicacionProductoGetDTO } from '../modelo/publicacion-producto-get-dto';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { PublicacionProductoDTO } from '../modelo/publicacion-producto-dto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private publiUrl = 'http://localhost:8081/api/publicacionproducto';

  productos: PublicacionProductoGetDTO[];
  categoria: any;
  productoAux: ProductoGetDTO = new ProductoGetDTO(
    'Prueba Producto',
    ['HOGAR'],
    ['algo.png'],
    [],
    ['ARMENIA']
  );

  constructor(private http: HttpClient) {
    this.productos = [];
    this.productos.push( 
    );
  }
  public listar(): PublicacionProductoGetDTO[] {
    return this.productos;
  }

  public obtener(codigo: number): PublicacionProductoGetDTO {
    // Busca la publicación correspondiente al código dado
    console.log('el codigo de la publicacion enviada desde form es ' + codigo);
  //  const publicacion = this.productos.find((p) => p.codigo == codigo);
    const publicacion= this.obtener(codigo);
    // Lanza un error si no se encuentra la publicación
    if (!publicacion) {
      throw new Error(
        `No se encontró una publicación con el código ${codigo}.`
      );
    }
    // Devuelve la publicación encontrada
    return publicacion;
  }

  public crearPublicacionProducto(
    publicacion: PublicacionProductoDTO
  ): Observable<MensajeDTO> {
    console.log(
      'desde producto service: cod producto ' + publicacion.codigoProducto
    );
    console.log(
      'desde producto service: cod publi ' + publicacion.codigoPublicacion
    );
    console.log(
      'desde producto service: cod vendedor ' + publicacion.codigoVendedor
    );

    return this.http.post<MensajeDTO>(`${this.publiUrl}/crear`, publicacion);
  }

  public obtenerPublicacion(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.publiUrl}/obtenerByCodigo/${codigo}`
    );
  }

  public eliminar(codigo: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(
      `${this.publiUrl}/eliminarAll/${codigo}`
    );
  }

  public eliminarPublicacion(codigo: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.publiUrl}/eliminar/${codigo}`);
  }

  public actualizarPublicacionProducto(
    codigoPublicacion: number,
    publicacionProductoDTO: PublicacionProductoDTO
  ): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(
      `${this.publiUrl}/actualizar/${codigoPublicacion}`,
      publicacionProductoDTO
    );
  }

  public listarPublicacionesCategoria(categoria: any): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.publiUrl}/listarPublicacionesCategoria/${categoria}`
    );
  }

  public listarPublicacionesCiudad(ciudad: any): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.publiUrl}/listarPublicacionesCategoria/${ciudad}`
    );
  }

  public listarPublicacionesPrecio(precio: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.publiUrl}/listarPublicacionesCategoria/${precio}`
    );
  }

  public listarTodasLasPublicaciones(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publiUrl}/listarPublicaciones`);
  }

  public listarTodasLasPublicacionesExcluyendo(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.publiUrl}/listarPublicacionesExcluyendo`
    );
  }

  public listarPublicacionEstado(estado: String): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.publiUrl}/listarPublicacionEstado/${estado}`
    );
  }

  public listarMisPublicaciones(codigoUsuario: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.publiUrl}/listarMisPublicaciones/${codigoUsuario}`
    );
  }

  public listarMisPublicacionesFavoritas(codigoUsuario: number): Observable<MensajeDTO>{

    return this.http.get<MensajeDTO>(
      `${this.publiUrl}/listarMisPublicacionesFavoritas/${codigoUsuario}`
    );
  }
  }

