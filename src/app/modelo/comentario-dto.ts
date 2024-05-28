export class ComentarioDTO {
  texto: string = '';
  estrellas: number = 0;
  codigoUsuario: number = 0;
  codigoPublicacionProducto: number = 0;

  constructor(
    texto: string,
    estrellas: number,
    codigoUsuario: number,
    codigoPublicacionProducto: number
  ) {
    this.texto = texto;
    this.estrellas = estrellas;
    this.codigoUsuario = codigoUsuario;
    this.codigoPublicacionProducto = codigoPublicacionProducto;
  }
}
