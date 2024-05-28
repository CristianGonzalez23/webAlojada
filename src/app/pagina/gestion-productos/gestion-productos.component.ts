import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PublicacionProductoGetDTO } from 'src/app/modelo/publicacion-producto-get-dto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {
  publicacionProductos: PublicacionProductoGetDTO[];
  seleccionados: PublicacionProductoGetDTO[];
  textoBtnEliminar: string;
  correo: string | null = "";
  codigoProducto: number = 0;
  miCodigoVendedor: number = 0;
  codigoPublicacion: number =0;

  constructor(
    private productoServicio: ProductoService,
    private tokenService: TokenService,
    private usuarioService: UsuarioService
  ) {
    this.publicacionProductos = [];
    this.seleccionados = [];
    this.textoBtnEliminar = "";
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.correo = this.tokenService.getEmail();
    if (this.correo) {
      this.usuarioService.obtenerID(this.correo).subscribe({
        next: (data) => {
          this.miCodigoVendedor = data.respuesta;
          console.log("mi codigo es: "+this.miCodigoVendedor)
          this.productoServicio.listarMisPublicaciones(this.miCodigoVendedor).subscribe({
            next: (data) => {
              this.publicacionProductos = data.respuesta;
            },
            error: (error) => {
              console.log(error.error);
            },
          });
        },
        error: (error) => {
          console.log(error.error);
        },
      });
    } else {
      console.log('El valor de correo es null');
    }

    
  }

  public seleccionar(publicacionProductos: PublicacionProductoGetDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(publicacionProductos);
    } else {
      this.seleccionados = this.seleccionados.filter(i => i !== publicacionProductos);
    }
    this.actualizarMensaje();
  }

  private actualizarMensaje() {
    const tam = this.seleccionados.length;
    if (tam !== 0) {
      if (tam === 1) {
        this.textoBtnEliminar = "1 elemento";
      } else {
        this.textoBtnEliminar = tam + " elementos";
      }
    } else {
      this.textoBtnEliminar = "";
    }
  }

  public borrarProductos() {
    //const codigosProductos = this.seleccionados.map(item => item.codigoProducto);
    //const eliminarProductos$ = codigosProductos.map(codigo => this.productoServicio.eliminar(codigo));

    //cambio para tomar codigo de publi en vez de producto
    const codigosPublicaciones = this.seleccionados.map(item => item.codigo);
    const eliminarPublicaciones$ = codigosPublicaciones.map(codigo => this.productoServicio.eliminarPublicacion(codigo));

    
    forkJoin(eliminarPublicaciones$).subscribe(
      () => {
        // Eliminar los productos seleccionados de la lista
        this.publicacionProductos = this.publicacionProductos.filter(item => !this.seleccionados.includes(item));
        // Limpiar la lista de seleccionados
        this.seleccionados = [];
        // Actualizar el mensaje
        this.actualizarMensaje();
      },
      error => {
        console.error('Error al eliminar productos:', error);
      }
    );
  }
}
