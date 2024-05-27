export class DetalleCompraGetDTO {
  unidades: number = 0;
  precio: number = 0;
  codigoPublicacionProducto: number;
  codigoCompra: number = 0;
  total: number = 0;
  metodoPago: string = '';
  fecha: Date = new Date();
  usuario: number = 0;
  nombreUsuario: string = '';

  constructor(unidades: number,precio:number, codigoPublicacionProducto: number, codigoCompra:number, total:number, metodoPago:string,
    fecha: Date, usuario:number, nombreUsuario: string) {
    this.unidades = unidades;
    this.codigoPublicacionProducto = codigoPublicacionProducto;
    this.precio = precio;
    this.codigoCompra = codigoCompra;
    this.total = total;
    this.metodoPago = metodoPago;
    this.fecha = fecha;
    this.usuario = usuario;
    this.nombreUsuario = nombreUsuario;
  }
  
}
