import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError, switchMap } from 'rxjs/operators';

import { TokenService } from '../servicios/token.service';
import { AuthService } from '../servicios/auth.service';

const AUTHORIZATION = 'Authorization';
const BEARER = 'Bearer ';

@Injectable()
export class UsuarioInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isApiUrl = req.url.includes('api/auth');
    if (!this.tokenService.isLogged() || isApiUrl) {
      return next.handle(req);
    }

    let initReq = req;
    let token = this.tokenService.getToken();
    initReq = this.addToken(req, token!);

    return next.handle(initReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handleUnauthorizedError(initReq, next);
        }
        return throwError(error);
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set(AUTHORIZATION, BEARER + token),
    });
  }

  private handleUnauthorizedError(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken(); // Obtener el token actual
    const refreshToken = this.tokenService.getRefreshToken(); // Obtener el refresh token actual

    // Realizar la llamada al método refresh() del AuthService y obtener un nuevo token
    return this.authService.refresh(token).pipe(
      switchMap((response) => {
        // Actualizar el token y refresh token en el TokenService
        this.tokenService.setToken(response.respuesta);
        this.tokenService.setRefreshToken(response.respuesta);

        // Clonar la solicitud original y agregar el nuevo token
        const newReq = req.clone({
          headers: req.headers.set(AUTHORIZATION, BEARER + response.respuesta),
        });

        // Volver a enviar la solicitud con el nuevo token
        return next.handle(newReq);
      })
    );
  }
}
