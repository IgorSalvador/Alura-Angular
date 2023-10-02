import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  url_API = "https://viacep.com.br/ws/";

  constructor(private _http: HttpClient) { }

  getConsultaCep(cep: string){
    return this._http.get(`${this.url_API}${cep}/json/`);
  }
}
