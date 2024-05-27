import { Component } from '@angular/core';
import { CompraGetDTO } from 'src/app/modelo/compra-get-dto';
import { CompraService } from 'src/app/servicios/compra.service';
import { DetalleCompraService } from 'src/app/servicios/detalle-compra.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css']
})
export class ListaComprasComponent {
 // publicacionProductos: PublicacionProductoGetDTO[];
 // seleccionados: PublicacionProductoGetDTO[];
  compras: CompraGetDTO[];
  textoBtnEliminar: string;
  correo: string | null = "";
  codigoProducto: number = 0;
  miCodigoVendedor: number = 0;
  codigoPublicacion: number =0;

  constructor(
    private compraService: CompraService,
    private detalleCompraService: DetalleCompraService,
    private tokenService: TokenService,
    private usuarioService: UsuarioService
  ) {
    this.compras = [];
    this.textoBtnEliminar = "";
  }

  ngOnInit(): void {
    this.obtenerCompras();
  }

  obtenerCompras(): void {
    this.correo = this.tokenService.getEmail();
    if (this.correo) {
      this.usuarioService.obtenerID(this.correo).subscribe({
        next: (data) => {
          this.miCodigoVendedor = data.respuesta;
          console.log("mi codigo es: "+this.miCodigoVendedor)
          this.detalleCompraService.listarMisCompras(this.miCodigoVendedor).subscribe({
            next: (data) => {
              this.compras = data.respuesta;
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

}
