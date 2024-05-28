import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { DetalleCompraDTO } from 'src/app/modelo/detalle-compra-dto';
import { PublicacionProductoGetDTO } from 'src/app/modelo/publicacion-producto-get-dto';
import { ProductoDTO } from 'src/app/modelo/producto-dto';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { ComentarioDTO } from 'src/app/modelo/comentario-dto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ComentarioService } from 'src/app/servicios/comentario.service';
import { Alerta } from 'src/app/modelo/alerta';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { FavoritoService } from 'src/app/servicios/favorito.service';
import { PublicacionProductoDTO } from 'src/app/modelo/publicacion-producto-dto';
import { ComentarioGetDTO } from 'src/app/modelo/comentario-get-dto';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css'],
})
export class DetalleProductoComponent implements OnInit {
  //cambios comentario +
  alerta!: Alerta;
  // comentarioTexto: string = '';
  comentarios: ComentarioDTO[] = [];
  valoracionSeleccionada: number = 0;
  comentario: ComentarioDTO;
  correo: String | null = '';

  //fin cambios comentario

  codigoProducto: number = 0;
  publicacion: PublicacionProductoGetDTO;
  detalleCompra!: DetalleCompraDTO;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private favoritoService: FavoritoService,

    //cambios para comentario !!!
    private comentarioService: ComentarioService,
    private tokenService: TokenService,
    private usuarioService: UsuarioService ///
  ) {
    this.publicacion = new PublicacionProductoGetDTO(0,0,new Date,0,0,"",0,0,"",new ProductoGetDTO("",[],[],[],[]), []);//productoService.obtener(1);
    this.comentario = new ComentarioDTO('', 0, 0, 0);
  }

  ngOnInit(): void {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    this.codigoProducto = codigo ? parseInt(codigo) : 0;
    this.productoService.obtenerPublicacion(this.codigoProducto).subscribe({
      next: (data) => {
        this.publicacion = data.respuesta;
        this.obtenerComentarios(); // Llama al método para obtener los comentarios después de obtener la publicación
      },
      error: (error) => {
        console.log(error.error);
        console.log('Ocurrió un error al obtener la publicacion');
      },
    });
  }

  public agregarCarrito() {
    this.carritoService.agregar(this.codigoProducto);
  }

  quitarCarrito(): void {
    this.carritoService.quitar(this.codigoProducto);
  }

  //---------- nuevo metodo----------

  getStarClass(starNumber: number): string {
    const roundedStars = Math.round(starNumber);
    const starsArray = [];

    if (starNumber <= this.publicacion.promedioEstrellas) {
      return 'filled-star';
    } else {
      return 'empty-star';
    }
    return '';
  }

  seleccionarEstrella(cantidadEstrellas: number): void {
    this.valoracionSeleccionada = cantidadEstrellas;
    this.comentario.estrellas = this.valoracionSeleccionada;
  }

  getStarsArray(starNumber: number): number[] {
    const roundedStars = Math.round(starNumber);
    return Array(roundedStars).fill(0);
  }

  // -------------fin------------

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  //--------------------------------------envio comentario y borrar comentario +
  enviarComentario() {
    this.correo = this.tokenService.getEmail();

    if (this.correo) {
      this.usuarioService.obtenerID(this.correo).subscribe({
        next: (data) => {
          this.comentario.texto = this.comentario.texto; // Asignar el valor del comentario al campo 'texto'
          this.comentario.estrellas = this.valoracionSeleccionada; // Asignar la valoración seleccionada
          this.comentario.codigoUsuario = data.respuesta;
          this.comentario.codigoPublicacionProducto = this.publicacion.codigo;
          console.log(
            'el codigo de usuario es ' +
              this.comentario.codigoUsuario +
              ' y el de publi es ' +
              this.comentario.codigoPublicacionProducto
          );

          const objeto = this;
          this.comentarioService.crearComentario(this.comentario).subscribe({
            next: (data) => {
              objeto.alerta = new Alerta(data.respuesta, 'success');
              location.reload(); // Refrescar la página
            },
            error: (error) => {
              objeto.alerta = new Alerta(error.error.respuesta, 'danger');
            },
          });

          //this.obtenerComentarios();
        },
        error: (error) => {
          console.log(error.error);
        },
      });
    } else {
      console.log('El valor de correo es null');
    }
  }

  borrarComentario() {
    // Aquí puedes realizar acciones con el comentario, como enviarlo al servidor
    console.log('Comentario enviado:', this.comentario.texto);

    // Puedes restablecer el texto del comentario después de enviarlo
    this.comentario.texto = '';
  }

  obtenerComentarios() {
    // Lógica para obtener los comentarios, por ejemplo, desde una API
    // y asignarlos a la lista comentarios
    this.comentarioService.listarComentarios(this.publicacion.codigo);
    console.log(
      'los comentarios son:' +
        JSON.stringify(
          this.comentarioService.listarComentarios(this.publicacion.codigo)
        )
    );
  }
  //fin envio comentario
  // Agrega el método listarFavoritos en tu componente
  agregarPublicacionFavorita() {
    this.favoritoService.agregarPublicacionFavorita(this.publicacion.codigoVendedor,this.codigoProducto);
    
  }
  eliminarPublicacionFavorita() {
    this.favoritoService.eliminarPublicacionFavorita(this.publicacion.codigoVendedor,this.codigoProducto);
    
  }

  

}
