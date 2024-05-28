import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { CompraDTO } from 'src/app/modelo/compra-dto';
import { DetalleCompraDTO } from 'src/app/modelo/detalle-compra-dto';
import { DetalleCompraGetDTO } from 'src/app/modelo/detalle-compra-get-dto';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { PublicacionProductoGetDTO } from 'src/app/modelo/publicacion-producto-get-dto';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { CompraService } from 'src/app/servicios/compra.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  archivos!: FileList;

  usuario: UsuarioDTO = new UsuarioDTO("", "", "", "", "", "");
  metodoPago: string = '';
  productos: PublicacionProductoGetDTO[] = [];
  valorTotal: number = 0;
  alerta: Alerta | null = null;
  compra: CompraDTO = new CompraDTO("", 0, []);
  detalle: DetalleCompraDTO[] = [];
  producto: PublicacionProductoGetDTO;
  unidades: number=0;
  correo: string | null = null;
  detalleCompra: DetalleCompraDTO;
  metodoPagos:string[];

  constructor(
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private compraService: CompraService,
    private usuarioService: UsuarioService,
    private tokenService: TokenService
  ) {
    this.obtenerID();
    this.productos = [];
    this.detalle = [];
    this.valorTotal = 0;
    this.unidades=0;
    this.producto = new PublicacionProductoGetDTO(0,0,new Date,0,0,"",0,0,"",new ProductoGetDTO("",[],[],[],[]), []);//productoService.obtener(1);
    this.detalleCompra = new DetalleCompraDTO(0,0);
    this.metodoPagos=[];
    this.cargarMetodoPagos();

    const listaCodigos = this.carritoService.listar();

    if (listaCodigos.length > 0) {
      for (const cod of listaCodigos) {

        ///////////////
        this.productoService.obtenerPublicacion(cod).subscribe({
          next: (data) => {
            this.producto = data.respuesta;
            console.log("prodicto es "+JSON.stringify(this.producto))


              
              if (this.producto != null) {
                this.productos.push(this.producto);


                this.detalleCompra.unidades = 1;
                const detalleCompra = new DetalleCompraDTO(1, this.producto.codigo);
                detalleCompra.unidades = 1; // Establecer unidades en 1
                this.detalle.push(detalleCompra);
                this.valorTotal += this.producto.precio;
              }
          },
          error: (error) => {
            console.log(error.error);
            console.log('Ocurrió un error al obtener la publicacion');
          },
        });

      
      }
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      console.log(this.archivos);
    }
  }

  private cargarMetodoPagos(){
    this.metodoPagos.push('NEQUI');
    this.metodoPagos.push('VISA');
    this.metodoPagos.push('MASTERCARD');
    this.metodoPagos.push('DAVIPLATA');
    this.metodoPagos.push('CREDITO');
    }

  obtenerID(): void {
    this.correo = this.tokenService.getEmail();

    if (this.correo) {
      this.usuarioService.obtenerID(this.correo).subscribe({
        next: (data) => {
          const codigoUser = data.respuesta;
          this.usuarioService.obtener(codigoUser).subscribe({
            next: (data) => {
              this.usuario = data.respuesta;
            },
            error: (error) => {
              console.log(error);
            }
          });
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  calcularValor(precio: number, unidades: number): number {
    return precio * unidades;
  }

  eliminarProducto(item: PublicacionProductoGetDTO): void {
    const index = this.productos.indexOf(item);
    if (index !== -1) {
      this.productos.splice(index, 1);
      this.carritoService.quitar(item.codigo);
      this.valorTotal -= this.calcularValor(item.precio, 1);
      this.detalle = this.detalle.filter((detalle) => detalle.codigoPublicacionProducto !== item.codigo);
    }
  }

  calcularValorTotal(): number {
    let total = 0;

    for (const item of this.productos) {
      const detalle = this.detalle.find((detalle) => detalle.codigoPublicacionProducto === item.codigo);
      if (detalle) {
        total += this.calcularValor(item.precio, detalle.unidades);
      }
    }

    this.valorTotal = total;

    return total;
  }

  incrementarUnidades(item: PublicacionProductoGetDTO): void {
    const detalle = this.detalle.find((detalle) => detalle.codigoPublicacionProducto === item.codigo);
    if (detalle) {
      detalle.unidades++;
      this.calcularValorTotal();
    }
  }

  decrementarUnidades(item: PublicacionProductoGetDTO): void {
    const detalle = this.detalle.find((detalle) => detalle.codigoPublicacionProducto === item.codigo);
    if (detalle && detalle.unidades > 1) {
      detalle.unidades--;
      this.calcularValorTotal();
    }
  }

  realizarCompra(): void {
    if (this.correo) {
      this.usuarioService.obtenerID(this.correo).subscribe({
        next: (data) => {
          this.compra.codigoUsuario = data.respuesta;
          this.compra.metodoPago = this.metodoPago;
          console.log("metodo de pgo "+this.compra.metodoPago)

          this.compra.detalleCompraDTO = this.detalle;

          this.compraService.realizarCompra(this.compra).subscribe({
            next: (data) => {
              this.alerta = new Alerta(data.respuesta, 'success');
              location.reload();
            },
            error: (error) => {
              this.alerta = new Alerta(error.respuesta, 'danger');
            }
          });
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      console.log('El valor de correo es null');
    }
  }
}
