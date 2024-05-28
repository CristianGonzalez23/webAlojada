import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { LoginComponent } from './pagina/login/login.component';
import { CreacionProductoComponent } from './pagina/creacion-producto/creacion-producto.component'
import { GestionProductosComponent } from './pagina/gestion-productos/gestion-productos.component';
import { BusquedaComponent } from './pagina/busqueda/busqueda.component';
import { DetalleProductoComponent } from './pagina/detalle-producto/detalle-producto.component';
import { AlertaComponent } from './pagina/alerta/alerta.component';
import { CarritoComponent } from './pagina/carrito/carrito.component';

import { FavoritoComponent } from './pagina/favorito/favorito.component';
import { ProductoComponent } from './pagina/producto/producto.component';
import { RevisarProductosComponent } from './pagina/revisar-productos/revisar-productos.component';
import { UsuarioInterceptor } from './interceptor/usuario.interceptor';
import { ProductosComponent } from './pagina/productos-en-venta/productos-en-venta.component';
import { RestablecerPasswordComponent } from './pagina/restablecer-password/restablecer-password.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    CreacionProductoComponent,
    FavoritoComponent,
    ProductoComponent,
    DetalleProductoComponent,
    CarritoComponent,
    BusquedaComponent,
    AlertaComponent,
    GestionProductosComponent,
    RevisarProductosComponent,
    ProductosComponent,
    RestablecerPasswordComponent
 
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: UsuarioInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
