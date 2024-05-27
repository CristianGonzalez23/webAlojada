import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { ComentarioDTO } from 'src/app/modelo/comentario-dto';
import { ComentarioGetDTO } from 'src/app/modelo/comentario-get-dto';
import { ProductoDTO } from 'src/app/modelo/producto-dto';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { PublicacionProductoDTO } from 'src/app/modelo/publicacion-producto-dto';
import { PublicacionProductoGetDTO } from 'src/app/modelo/publicacion-producto-get-dto';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-creacion-producto',
  templateUrl: './creacion-producto.component.html',
  styleUrls: ['./creacion-producto.component.css'],
})
export class CreacionProductoComponent implements OnInit {
  archivos!: FileList;
  producto: PublicacionProductoDTO;
  objetoProducto: PublicacionProductoGetDTO | undefined;
  esEdicion: boolean = false;
  codigoProducto: number;
  correo: String | null = '';
  /*
  categorias: string[] = [];
  categoriasSeleccionadas: string[] = [];
  categoriaSeleccionada: string | null = null;
*/
  categorias: any[] = [];
  categoriasSeleccionadas: any[] = [];
  categoriaSeleccionada: any | null = null;

  ciudades: any[] = [];
  ciudadesSeleccionadas: any[] = [];
  ciudadSeleccionada: any | null = null;
  alerta!: Alerta;
  mostrarActualizarDatos: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private imagenService: ImagenService,
    private categoriaService: CategoriaService,
    private ciudadService: CiudadService,
    private usuarioService: UsuarioService,
    private tokenService: TokenService
  ) {
    this.codigoProducto = this.route.snapshot.params['codigo'];
    this.producto = new PublicacionProductoDTO();
  }

  ngOnInit(): void {
    this.obtenerCiudades();
    this.obtenerCat();

    this.route.params.subscribe((params) => {
      //     promedioEstrellas: number = 0;
      // fechaLimite: Date = new Date();
      // precio: number = 0;
      // disponibilidad: number = 0;
      // descripcion: string = '';
      // codigoVendedor: number = 0;
      // codigoProducto: number = 0;
      // productoDTO: ProductoDTO = new ProductoDTO('nombrecito', [''], [''], ['']);
      // comentarioDTO: ComentarioDTO[] = [];
      this.codigoProducto = params['codigo'];
      console.log('cod producto es' + this.codigoProducto);
      if (this.codigoProducto != null) {
        this.productoService.obtenerPublicacion(this.codigoProducto).subscribe({
          next: (data) => {
            this.objetoProducto = data.respuesta;
            console.log(
              'objeto obtenido es' + JSON.stringify(this.objetoProducto)
            );
            if (this.objetoProducto != null) {
              this.producto.codigoPublicacion = this.objetoProducto.codigo;
              this.producto.promedioEstrellas =
                this.objetoProducto.promedioEstrellas;
              this.producto.fechaLimite = this.objetoProducto.fechaLimite;
              this.producto.precio = this.objetoProducto.precio;
              this.producto.disponibilidad = this.objetoProducto.disponibilidad;
              this.producto.descripcion = this.objetoProducto.descripcion;
              this.producto.codigoVendedor = this.objetoProducto.codigoVendedor;
              this.producto.codigoProducto = this.objetoProducto.codigoProducto;
              this.producto.productoDTO = this.objetoProducto.productoGetDTO;
              this.producto.comentarioDTO =
                this.objetoProducto.comentarioGetDTO;
              this.esEdicion = true;
              this.mostrarActualizarDatos = true;
            }
          },
          error: (error) => {
            console.log(error.error);
          },
        });
      }
    });
  }

  obtenerCat(): void {
    this.categoriaService.listar().subscribe({
      next: (data) => {
        this.categorias = data.respuesta;
      },
      error: (error) => {
        console.log(error.error);
        console.log('pailas, paso algo');
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
      },
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      console.log(this.archivos);
    }
  }

  agregarCategoria() {
    if (
      this.producto.productoDTO.categorias &&
      !this.categoriasSeleccionadas.includes(
        this.producto.productoDTO.categorias
      )
    ) {
      this.categoriasSeleccionadas.push(this.producto.productoDTO.categorias);
      console.log(this.producto.productoDTO.categorias);
    }
  }

  eliminarCategoria(categoria: string) {
    const index = this.categoriasSeleccionadas.indexOf(categoria);
    if (index !== -1) {
      this.categoriasSeleccionadas.splice(index, 1);
    }
  }

  agregarCiudad() {
    if (
      this.producto.productoDTO.ciudades &&
      !this.ciudadesSeleccionadas.includes(this.producto.productoDTO.ciudades)
    ) {
      this.ciudadesSeleccionadas.push(this.producto.productoDTO.ciudades);
      console.log(this.producto.productoDTO.ciudades);
    }
  }

  eliminarCiudad(ciudad: string) {
    const index = this.ciudadesSeleccionadas.indexOf(ciudad);
    if (index !== -1) {
      this.ciudadesSeleccionadas.splice(index, 1);
    }
  }

  public crearProducto() {
    console.log(
      'el producto de la publicacion es:' +
        JSON.stringify(this.producto) +
        'y producto es ' +
        JSON.stringify(this.producto.productoDTO)
    );
    if (this.producto.productoDTO.imagenes.length > 0) {
      this.correo = this.tokenService.getEmail();
      this.producto.productoDTO.categorias = this.categoriasSeleccionadas;
      this.producto.productoDTO.ciudades = this.ciudadesSeleccionadas; // Asignar el arreglo de categorías seleccionadas
      // console.log(
      //   'El producto de la publicación es:' +
      //   JSON.stringify(this.producto.productoDTO)
      // );
      if (this.correo) {
        this.usuarioService.obtenerID(this.correo).subscribe({
          next: (data) => {
            this.producto.codigoVendedor = data.respuesta;
            ////
            const objeto = this;
            if (this.producto.codigoProducto > 0) {
              this.actualizarDatos();
            } else {
              console.log(
                'el codigo del venedor es' + this.producto.codigoVendedor
              );

              this.productoService
                .crearPublicacionProducto(this.producto)
                .subscribe({
                  next: (data) => {
                    objeto.alerta = new Alerta(data.respuesta, 'success');
                  },
                  error: (error) => {
                    objeto.alerta = new Alerta(error.error.respuesta, 'danger');
                  },
                });
            }
            ////
          },
          error: (error) => {
            console.log(error.error);
          },
        });
      } else {
        console.log('El valor de correo es null');
      }
    } else {
      console.log('Debe seleccionar al menos una imagen y subirla');
    }
  }

  public actualizarDatos() {
    const objeto = this;
    // Lógica para actualizar los datos
    this.producto.productoDTO.categorias = this.categoriasSeleccionadas;
    this.producto.productoDTO.ciudades = this.ciudadesSeleccionadas;

    console.log('Actualizar datos');
    this.productoService
      .actualizarPublicacionProducto(
        this.producto.codigoProducto,
        this.producto
      )
      .subscribe({
        next: (data) => {
          objeto.alerta = new Alerta(data.respuesta, 'success');
        },
        error: (error) => {
          objeto.alerta = new Alerta(error.error.respuesta, 'danger');
        },
      });
  }

  public subirImagenes() {
    if (this.archivos != null && this.archivos.length > 0) {
      const objeto = this.producto;
      const formData = new FormData();
      formData.append('file', this.archivos[0]);

      console.log('el file de la imagen es:' + JSON.stringify(formData));
      console.log(
        'el codigo de la publicacion es ' + this.producto.codigoPublicacion
      );
      this.imagenService
        .subir(formData, this.producto.codigoPublicacion)
        .subscribe({
          next: (data) => {
            objeto.productoDTO.imagenes.push(data.respuesta.url);

            // Aquí puedes manejar la respuesta del backend si es necesario
          },
          error: (error) => {
            console.log(error.error);
          },
        });
    } else {
      console.log('Debe seleccionar al menos una imagen y subirla');
    }
  }
}
