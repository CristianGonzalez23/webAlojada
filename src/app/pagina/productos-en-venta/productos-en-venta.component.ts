import { Component, OnInit } from '@angular/core';
import { PublicacionProductoGetDTO } from 'src/app/modelo/publicacion-producto-get-dto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { CiudadService } from 'src/app/servicios/ciudad.service';

@Component({
  selector: 'app-productos-en-venta',
  templateUrl: './productos-en-venta.component.html',
  styleUrls: ['./productos-en-venta.component.css']
})
export class ProductosComponent implements OnInit {
  productos: PublicacionProductoGetDTO[] = [];
  categorias: any[] = [];
  ciudades: any[] = [];

  constructor(private productoService: ProductoService, private categoriaService: CategoriaService, private ciudadService: CiudadService) {}

  ngOnInit() {
    this.obtenerProductos();
    this.obtenerCat();
    this.obtenerCiudades()
  }

  obtenerProductos(): void {
    this.productoService.listarTodasLasPublicacionesExcluyendo().subscribe({
      next: (data) => {
        this.productos = data.respuesta;
      },
      error: (error) => {
        console.log(error.error);
        console.log('Ocurrió un error al obtener las publicaciones');
      },
    });
  }

  obtenerCat(): void {
    this.categoriaService.listar().subscribe({
      next: (data) => {
        this.categorias = data.respuesta;
      },
      error: (error) => {
        console.log(error.error);
        console.log('Ocurrió un error al obtener las categorías');
      },
    });
  }

  obtenerCiudades(): void {
    this.ciudadService.listar().subscribe({
      next: (data) => {
        this.ciudades = data.respuesta;
      },
      error: (error) => {
        console.log(error.error);
        console.log('Ocurrió un error al obtener las ciudades');
      },
    });
  }

  listarPublicacionesCategoria(categoria: any): void {
    this.productoService.listarPublicacionesCategoria(categoria).subscribe({
      next: (data) => {
        this.productos = data.respuesta;
      },
      error: (error) => {
        console.log(error.error);
        console.log('Ocurrió un error al obtener las publicaciones de la categoría');
      },
    });
  }

  onCategoriaSeleccionada(categoria: any): void {
    if (categoria) {
      this.listarPublicacionesCategoria(categoria);
    } else {
      this.obtenerProductos(); // Vuelve a cargar todas las publicaciones
    }

  } 

  listarPublicacionesCiudad(ciudad: any): void {
    this.productoService.listarPublicacionesCiudad(ciudad).subscribe({
      next: (data) => {
        this.productos = data.respuesta;
      },
      error: (error) => {
        console.log(error.error);
        console.log('Ocurrió un error al obtener las publicaciones de la ciudad');
      },
    });
  }

  onCiudadSeleccionada(ciudad: any): void {
    if (ciudad) {
      this.listarPublicacionesCiudad(ciudad);
    } else {
      this.obtenerProductos(); // Vuelve a cargar todas las publicaciones
    }

  } 

}