import { Component, OnInit } from '@angular/core';
import { PublicacionProductoGetDTO } from 'src/app/modelo/publicacion-producto-get-dto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ProductoModeradorDTO } from 'src/app/modelo/producto-moderador-dto';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ModeradorService } from 'src/app/servicios/moderador.service';
import { Alerta } from 'src/app/modelo/alerta';

@Component({
  selector: 'app-revisar-productos',
  templateUrl: './revisar-productos.component.html',
  styleUrls: ['./revisar-productos.component.css']
})
export class RevisarProductosComponent implements OnInit {
  productos: PublicacionProductoGetDTO[] = [];
  productoActual?: PublicacionProductoGetDTO;
  productoModerador?: ProductoModeradorDTO;
  imagenActual = 1;
  motivo: string = "";
  idAdmin: number = 0;
  correo: string = "";
  estado: string = "";
  codigo: number = 0;
  alerta!: Alerta;

  constructor(private productoService: ProductoService, private tokenService: TokenService,private usuarioService: UsuarioService,
    private moderadorService: ModeradorService) {}

  ngOnInit() {
    this.obtenerProductos();
    this.obtenerID();
  }

  obtenerID(): void {

    this.correo = this.tokenService.getEmail();

    if (this.correo) {
      this.usuarioService.obtenerID(this.correo).subscribe({
        next: (data) => {
          this.idAdmin = data.respuesta;
        },
        error: (error) => {
          console.log(error.error);
        },
      });
    }
  }

  obtenerProductos(): void {
    this.productoService.listarTodasLasPublicaciones().subscribe({
      next: (data) => {
        this.productos = data.respuesta;
        if (this.productos.length > 0) {
          this.mostrarProductoInicial();
        }
      },
      error: (error) => {
        console.log(error.error);
        console.log('Ocurrió un error al obtener las publicaciones');
      },
    });
  }

  mostrarProductoInicial(): void {
    this.productoActual = this.productos[0];
    
  }

  mostrarProductoAnterior(): void {
    if (this.imagenActual > 1) {
      this.imagenActual--;
    } else {
      const indiceProductoAnterior = this.productos.indexOf(this.productoActual!) - 1;
      if (indiceProductoAnterior >= 0) {
        this.productoActual = this.productos[indiceProductoAnterior];
        this.imagenActual = this.productoActual.productoGetDTO.imagenes.length;
      }
    }
  }

  mostrarProductoSiguiente(): void {
    if (this.imagenActual < this.productoActual!.productoGetDTO.imagenes.length) {
      this.imagenActual++;
    } else {
      const indiceProductoSiguiente = this.productos.indexOf(this.productoActual!) + 1;
      if (indiceProductoSiguiente < this.productos.length) {
        this.productoActual = this.productos[indiceProductoSiguiente];
        this.imagenActual = 1;
      }
    }
  }

  aprobarProducto(): void {
    const objeto = this;
    this.estado = "APROBADO";
    this.codigo = this.productoActual!.codigo;
    this.productoModerador = new ProductoModeradorDTO(
      this.motivo,
      this.idAdmin,
      this.estado,
      this.codigo
    );

    this.moderadorService.autorizacionPublicacion(this.productoModerador).subscribe({
      next: (data) => {
        objeto.alerta = new Alerta(data.respuesta, 'success');
      },
      error: (error) => {
        objeto.alerta = new Alerta(error.error.respuesta, 'danger');
      },
    });

    console.log('Producto aprobado:', this.productoModerador);

    this.obtenerProductos();
  }

  noAprobarProducto(): void {
    const objeto = this;
    this.estado = "NO_APROBADO";
    this.codigo = this.productoActual!.codigo;
    this.productoModerador = new ProductoModeradorDTO(
      this.motivo,
      this.idAdmin,
      this.estado,
      this.codigo
    );

    this.moderadorService.autorizacionPublicacion(this.productoModerador).subscribe({
      next: (data) => {
        objeto.alerta = new Alerta(data.respuesta, 'success');
      },
      error: (error) => {
        objeto.alerta = new Alerta(error.error.respuesta, 'danger');
      },
    });
    
    console.log('Producto no aprobado:', this.productoModerador);

    this.mostrarProductoAnterior();

  }
}
