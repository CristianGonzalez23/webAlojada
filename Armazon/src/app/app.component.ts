import { Component, OnInit } from '@angular/core';
import { TokenService } from './servicios/token.service';
import { Router } from '@angular/router';
import { SesionService } from './servicios/sesion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Armazon';
  isLogged = false;
  email: string = '';

  constructor(private tokenService: TokenService, private router:Router, private sesionService: SesionService) {}
 
  ngOnInit(): void {

    
    const objeto = this;
    this.sesionService.currentMessage.subscribe({
    next: data => {
    objeto.actualizarSesion(data);
    }
    });
    this.actualizarSesion(this.tokenService.isLogged());
    }
    private actualizarSesion(estado: boolean) {
    this.isLogged = estado;
    if (estado) {
    this.email = this.tokenService.getEmail();
    }else{
      this.email="";
    }
    

    this.isLogged = this.tokenService.isLogged();

    if(this.isLogged){

      this.email = this.tokenService.getEmail();
      
    }

  }
  public logout() {
    this.tokenService.logout();
  }

  

  public iraBusqueda(valor: string) {
    if (valor) {
      this.router.navigate(['/busqueda', valor]);
    }
  }

  isModerator(): boolean {
    const roles = this.tokenService.getRole();
    return roles.includes('MODERADOR');
  }

}
