import { Injectable } from '@angular/core';

@Injectable({

  providedIn: 'root'

})

export class CarritoService {

  productos: number[];

  constructor() {
    this.productos = [];
  }

  public agregar(codigo: number){

    if (!this.productoYaAgregado(codigo)) {
      this.productos.push(codigo);
    }

  }

  public quitar(codigo: number){

    let indice = this.productos.indexOf(codigo);
    this.productos.splice(indice, 1);

  }

  public listar(): number[]{

    return this.productos;

  }

  private productoYaAgregado(codigo: number): boolean {
    return this.productos.includes(codigo);
  }

}

