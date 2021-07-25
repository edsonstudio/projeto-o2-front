import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { LocalStorageUtils } from './../utils/localstorage';
export abstract class BaseService {

  public LocalStorage = new LocalStorageUtils();
  protected UrlServiceV1: string = environment.apiUrlV1;

  protected ObterHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  protected ObterAuthHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.LocalStorage.obterTokenUsuario()}`
      })
    };
  }

  protected ExtractData(response: any) {
    return response.data || {};
  }

  protected ServiceError(response: Response | any) {
    let customError: string[] = [];

    if(response instanceof HttpErrorResponse) {

      if(response.statusText === "Unknown Error") {
        customError.push("Ocorreu um erro desconhecido");
      }
    }

    console.error(response);
    return throwError(response);
  }
}
