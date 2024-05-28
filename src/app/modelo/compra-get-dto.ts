import { DetalleCompraDTO } from "./detalle-compra-dto";

export class CompraGetDTO {
  total: number = 0;
  metodoPago: string = "";
  codigoUsuario: number = 0;
  detalleCompra: DetalleCompraDTO[] = [];

  constructor(
    metodoPago: string,
    codigoUsuario: number,
    detalleCompra: DetalleCompraDTO[]
  ) {
    this.metodoPago = metodoPago;
    this.codigoUsuario = codigoUsuario;
    this.detalleCompra = detalleCompra;
  }
}
