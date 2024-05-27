export class ProductoDTO {
    nombre: string = "";
    imagenes: string[] = [];
    categorias: string[] = [];
    ciudades: string[] = [];

    constructor(nombre: string, imagenes: string[], categorias: string[], ciudades: string[]) {
        this.nombre = nombre;
        this.imagenes = imagenes;
        this.categorias = categorias;
        this.ciudades = ciudades;
      }
}
