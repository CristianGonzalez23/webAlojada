import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';
import { SesionService } from './sesion.service';

const TOKEN_KEY = 'AuthToken';
//prueba
const REFRESH_TOKEN_KEY = 'RefreshAuthToken';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private router: Router, private sesionService: SesionService) {}

  public setToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  ////////prueba//////////////7
  public setRefreshToken(refreshToken: string) {
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  public getRefreshToken(): string | null {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }

  ///////////////////////

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public login(token: string) {
    this.setToken(token);
    this.sesionService.updateSession(true);
    this.router.navigate(["/"]);
  }

  public logout() {
    
    window.sessionStorage.clear();
    this.sesionService.updateSession(false);
    this.router.navigate(["/login"]);
  }

  private decodePayload(token: string): any {
    const payload = token!.split('.')[1];
    const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
    const values = JSON.parse(payloadDecoded);
    return values;
  }

  public getEmail(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.sub;
    }
    return '';
  }

  public getRole(): string[] {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.roles;
    }
    return [];
  }
}
