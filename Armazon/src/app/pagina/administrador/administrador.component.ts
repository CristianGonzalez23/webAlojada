import { Component, OnInit } from '@angular/core';
import { PublicacionProductoGetDTO } from 'src/app/modelo/publicacion-producto-get-dto';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  publicacionesNoAprobadas: PublicacionProductoGetDTO[] = [];
  publicacionesNoRevisadas: PublicacionProductoGetDTO[] = [];
  publicacionesAprobadas: PublicacionProductoGetDTO[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.listarPublicaciones();
  }

  listarPublicaciones(): void {
    this.listarPublicacionesPorEstado('NO_APROBADO', this.publicacionesNoAprobadas);
    this.listarPublicacionesPorEstado('NO_REVISADO', this.publicacionesNoRevisadas);
    this.listarPublicacionesPorEstado('APROBADO', this.publicacionesAprobadas);
  }

  listarPublicacionesPorEstado(estado: string, listaPublicaciones: PublicacionProductoGetDTO[]): void {
    this.productoService.listarPublicacionEstado(estado).subscribe(
      (data) => {
        listaPublicaciones.length = 0; // Limpiar la lista existente
        listaPublicaciones.push(...data.respuesta); // Agregar los elementos recibidos
      },
      (error) => {
        console.log(`Error al obtener las publicaciones en estado "${estado}":`, error);
      }
    );
  }
}
