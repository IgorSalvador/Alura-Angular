import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Promocao } from '../interfaces/promocao';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PromocaoService {
  private apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  Get(): Observable<Promocao[]> {
    return this._http.get<Promocao[]>(`${this.apiUrl}/promocoes`);
  }
}
