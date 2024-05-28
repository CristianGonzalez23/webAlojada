import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { SesionDTO } from 'src/app/modelo/sesion-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  sesion: SesionDTO;
  alerta!: Alerta;

  constructor(private authService:AuthService, private tokenService:TokenService) {
    this.sesion = new SesionDTO('', '', '');
  }

  public login() {

    const objeto = this;

    this.authService.login(this.sesion).subscribe({
      next: data =>{

        objeto.tokenService.login(data.respuesta.token);

      },
      error: error =>{

        objeto.alerta = new Alerta(error.error.respuesta, "danger");

      },
    })
  }

   

}
