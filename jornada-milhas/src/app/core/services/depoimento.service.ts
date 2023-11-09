import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Depoimento } from '../interfaces/depoimento';

@Injectable({
  providedIn: 'root',
})
export class DepoimentoService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  Get(): Observable<Depoimento[]> {
    return this.http.get<Depoimento[]>(`${this.apiUrl}/depoimentos`);
  }
}
