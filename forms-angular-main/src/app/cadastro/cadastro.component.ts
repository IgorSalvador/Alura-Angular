import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConsultaCepService } from '../service/consulta-cep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private router: Router, private _consultaCep: ConsultaCepService) { }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm){
    if(form.valid){
      this.router.navigate(["./sucesso"]);
    }
      console.log(form);
  }

  consultaCEP(event: any, form: NgForm){
    const cep = event.target.value;

    if(cep !== ""){
      this._consultaCep.getConsultaCep(cep).subscribe(value => {
        this.populandoEndereco(value, form)
      })
    }
  }

  populandoEndereco(dados: any, form: NgForm){
    form.form.patchValue({
      endereco: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    })
  }
}
