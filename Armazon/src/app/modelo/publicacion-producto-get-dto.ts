import { ComentarioGetDTO } from './comentario-get-dto';
import { ProductoDTO } from './producto-dto';
import { ProductoGetDTO } from './producto-get-dto';

export class PublicacionProductoGetDTO {
  codigo: number = 0;
  promedioEstrellas: number = 0;
  fechaLimite: Date = new Date();
  precio: number = 0;
  disponibilidad: number = 0;
  descripcion: string = '';
  codigoVendedor: number = 0;
  codigoProducto: number = 0;
  estado: string = '';
  productoGetDTO: ProductoGetDTO = new ProductoGetDTO('', [''], [''], [], ['']);
  comentarioGetDTO: ComentarioGetDTO[] = [];

  constructor(
    codigo: number,
    promedioEstrellas: number,
    fechaLimite: Date,
    precio: number,
    disponibilidad: number,
    descripcion: string,
    codigoVendedor: number,
    codigoProducto: number,
    estado: string,
    productoGetDTO: ProductoGetDTO,
    comentarioGetDTO: ComentarioGetDTO[]
  ) {
    this.codigo = codigo;
    this.promedioEstrellas = promedioEstrellas;
    this.fechaLimite = fechaLimite;
    this.precio = precio;
    this.disponibilidad = disponibilidad;
    this.descripcion = descripcion;
    this.codigoVendedor = codigoVendedor;
    this.codigoProducto = codigoProducto;
    this.estado = estado;
    this.productoGetDTO= productoGetDTO;
    this.comentarioGetDTO = comentarioGetDTO;
  }
}
