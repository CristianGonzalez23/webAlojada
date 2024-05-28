import { ComentarioDTO } from './comentario-dto';
import { ProductoDTO } from './producto-dto';
import { PublicacionProductoDTO } from './publicacion-producto-dto';
import { PublicacionProductoGetDTO } from './publicacion-producto-get-dto';

export class DetalleCompraDTO {
  unidades: number = 0;
  codigoPublicacionProducto: number;

  constructor(unidades: number, codigoPublicacionProducto: number) {
    this.unidades = unidades;
    this.codigoPublicacionProducto = codigoPublicacionProducto;
  }
}
