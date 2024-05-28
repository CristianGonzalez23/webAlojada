import { DetalleCompraDTO } from './detalle-compra-dto';
import { PublicacionProductoGetDTO } from './publicacion-producto-get-dto';

export class CompraDTO {
  metodoPago: string = "";
  codigoUsuario: number = 0;
  detalleCompraDTO: DetalleCompraDTO[] = [];

  constructor(
    metodoPago: string,
    codigoUsuario: number,
    detalleCompraDTO: DetalleCompraDTO[]
  ) {
    this.metodoPago = metodoPago;
    this.codigoUsuario = codigoUsuario;
    this.detalleCompraDTO = detalleCompraDTO;
  }
}
