import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { PublicacionProductoGetDTO } from 'src/app/modelo/publicacion-producto-get-dto';
import { ProductoService } from 'src/app/servicios/producto.service';
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
})
export class BusquedaComponent {
  textoBusqueda: string;
  // productos: ProductoGetDTO[];
  // filtro: ProductoGetDTO[];
  productos: PublicacionProductoGetDTO[] = [];
  filtro: PublicacionProductoGetDTO[];
  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) {
    this.textoBusqueda = '';

    this.productoService.listarTodasLasPublicacionesExcluyendo().subscribe({
      next: (data) => {
        this.productos = data.respuesta;
      },
      error: (error) => {
        console.log(error.error);
        console.log('Ocurrió un error al obtener las publicaciones');
      },
    });
    this.filtro = [];

    this.route.params.subscribe((params) => {
      this.textoBusqueda = params['texto'];
      this.filtro = this.productos.filter((p) =>
        p.productoGetDTO.nombre
          .toLowerCase()
          .includes(this.textoBusqueda.toLowerCase())
      );
    });
  }
}