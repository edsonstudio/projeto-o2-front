import { Usuario } from '../models/usuario';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { CepConsulta } from '../models/localidade';
import { Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";

@Injectable()
export class AuthService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  consultarCep(cep: string): Observable<CepConsulta> {
    return this.http
      .get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json/`)
      .pipe(catchError(super.serviceError))
  }

  obterTodos(): Observable<Usuario[]> {
    return this.http
      .get<Usuario[]>(this.UrlServiceV1 + "usuarios")
      .pipe(catchError(super.serviceError));
  }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http
      .post(this.UrlServiceV1 + "registrar", usuario, this.ObterHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

  login(usuario: Usuario): Observable<Usuario> {
    return this.http
      .post(this.UrlServiceV1 + "login", usuario, this.ObterHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

}
