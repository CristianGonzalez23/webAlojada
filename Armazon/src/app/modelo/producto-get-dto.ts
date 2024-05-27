export class ProductoGetDTO {
  nombre: string = '';
  categorias: string[] = [];
  imagenes: string[] = [];
  codigoPublicacionProductos: number[] = [];
  ciudades: string[] = [];

  constructor(
    nombre: string,
    categorias: string[],
    imagenes: string[],
    codigoPublicacionProductos: number[],
    ciudades: string[]
  ) {
    this.nombre = nombre;
    this.categorias = categorias;
    this.imagenes = imagenes;
    this.codigoPublicacionProductos = codigoPublicacionProductos;
    this.ciudades = ciudades;
  }
}
