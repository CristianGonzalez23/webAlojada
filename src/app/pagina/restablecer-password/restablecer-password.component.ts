import { HttpClient } from '@angular/common/http';
import { Component, Injectable, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Alerta } from 'src/app/modelo/alerta';
import { EmailDTO } from 'src/app/modelo/email-dto';
import { SesionDTO } from 'src/app/modelo/sesion-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-restablecer-password',
  templateUrl: './restablecer-password.component.html',
  styleUrls: ['./restablecer-password.component.css']
})
export class RestablecerPasswordComponent {
  sesion: SesionDTO;
  alerta!: Alerta;

  @ViewChild('f') form!: NgForm; // Obtener una referencia al formulario

  constructor(private authService: AuthService, private tokenService: TokenService) {
    this.sesion = new SesionDTO('', '', '');
  }

  
  public cambiarContrasena(email:string) {

    const objeto = this;

    this.authService.solicitarCambioContrasena(email).subscribe({
      next: data =>{

        objeto.alerta = new Alerta(data.respuesta, 'success');

      },
      error: error =>{

        objeto.alerta = new Alerta(error.error.respuesta, "danger");

      },
    })
  }
  public cambiarContrasenaNew(token:string ,email:string) {

    const objeto = this;

    this.authService.cambiarContrasena(token,email).subscribe({
      next: data =>{

        objeto.alerta = new Alerta(data.respuesta, 'success');

      },
      error: error =>{

        objeto.alerta = new Alerta(error.error.respuesta, "danger");

      },
    })
  }
}
