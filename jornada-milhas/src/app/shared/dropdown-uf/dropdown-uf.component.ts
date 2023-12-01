import { UnidadeFederativa } from '../../core/interfaces/unidadefederativa';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { UnidadefederativaService } from 'src/app/core/services/unidadefederativa.service';

@Component({
  selector: 'app-dropdown-uf',
  templateUrl: './dropdown-uf.component.html',
  styleUrls: ['./dropdown-uf.component.scss']
})
export class DropdownUfComponent implements OnInit {
  @Input() label: string = '';
  @Input() iconePrefixo: string = '';
  @Input() placeholder: string = '';
  @Input() control!: FormControl;

  unidadesFederativas: UnidadeFederativa[] = [];

  filteredOptions$?: Observable<UnidadeFederativa[]>;


  constructor(
    private unidadeFederativaService: UnidadefederativaService) {

  }

  ngOnInit(): void {
    this.unidadeFederativaService.Get()
      .subscribe(dados => {
        this.unidadesFederativas = dados
      })
    this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filtrarUfs(value))
    )
  }

  displayFn(estado: UnidadeFederativa): string {
    return estado && estado.nome ? estado.nome : '';
  }

  filtrarUfs(value: string | UnidadeFederativa): UnidadeFederativa[] {
    const nameUf = typeof value === 'string' ? value : value?.nome;
    const valorFiltrado = nameUf?.toLowerCase();
    const result = this.unidadesFederativas.filter(
      estado => estado.nome.toLowerCase().includes(valorFiltrado)
    )
    return result
  }
}
