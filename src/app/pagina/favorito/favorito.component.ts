import { Component } from '@angular/core';
import { DetalleCompraDTO } from 'src/app/modelo/detalle-compra-dto';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { FavoritoService } from 'src/app/servicios/favorito.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { PublicacionProductoDTO } from 'src/app/modelo/publicacion-producto-dto';
import { PublicacionProductoGetDTO } from 'src/app/modelo/publicacion-producto-get-dto';
@Component({
  selector: 'app-favorito',
  templateUrl: './favorito.component.html',
  styleUrls: ['./favorito.component.css'],
})
export class FavoritoComponent {
  productos: PublicacionProductoGetDTO[];
  valorTotal: number;
  correo: string | null = "";
  codigoProducto: number = 0;
  miCodigo: number = 0;
  codigoPublicacion: number =0;
  
  constructor(
    private favoritoService: FavoritoService,
    private productoService: ProductoService,
    private tokenService: TokenService,
    private usuarioService: UsuarioService
  ) {
    this.productos = [];
    this.valorTotal = 0;
  }

  ngOnInit(): void {
    this.obtenerFavoritos();
  }

  obtenerFavoritos(): void {
    this.correo = this.tokenService.getEmail();
    if (this.correo) {
      this.usuarioService.obtenerID(this.correo).subscribe({
        next: (data) => {
          this.miCodigo = data.respuesta;
          console.log("mi codigo es: "+this.miCodigo)
          this.productoService.listarMisPublicacionesFavoritas(this.miCodigo).subscribe({
            next: (data) => {
            
              this.productos = data.respuesta;
              console.log("publ favoritas "+JSON.stringify(this.productos)  )
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
  eliminarFavorito(item: PublicacionProductoGetDTO): void {
    const index = this.productos.indexOf(item);
    if (index !== -1) {
      this.productos}
    }
  }
