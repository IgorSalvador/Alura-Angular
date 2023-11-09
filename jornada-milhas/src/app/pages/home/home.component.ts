import { Component, OnInit } from '@angular/core';
import { Depoimento } from 'src/app/core/interfaces/depoimento';
import { Promocao } from 'src/app/core/interfaces/promocao';
import { DepoimentoService } from 'src/app/core/services/depoimento.service';
import { PromocaoService } from 'src/app/core/services/promocao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  promocoes: Promocao[] = [];
  depoimentos: Depoimento[] = [];

  constructor(private _promocaoService: PromocaoService, private _depoimentoService: DepoimentoService) {

  }
  ngOnInit(): void {
    this._promocaoService.Get().subscribe(value => {
      this.promocoes = value;
    });
    this._depoimentoService.Get().subscribe(value => {
      this.depoimentos = value;
    });
  }
}
