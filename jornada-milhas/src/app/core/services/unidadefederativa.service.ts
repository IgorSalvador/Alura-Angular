import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UnidadeFederativa } from '../interfaces/unidadefederativa';

@Injectable({
  providedIn: 'root',
})
export class UnidadefederativaService {
  private apiUrl: string = environment.apiUrl;
  private cache$?: Observable<UnidadeFederativa[]>;

  constructor(private http: HttpClient) {}

  Get(): Observable<UnidadeFederativa[]> {
    if (!this.cache$) {
      this.cache$ = this.RequestEstados().pipe(shareReplay(1));
    }

    return this.cache$;
  }

  private RequestEstados(): Observable<UnidadeFederativa[]> {
    return this.http.get<UnidadeFederativa[]>(`${this.apiUrl}/estados`);
  }
}
