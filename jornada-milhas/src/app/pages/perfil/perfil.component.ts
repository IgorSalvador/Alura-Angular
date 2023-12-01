import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PessoaUsuaria } from 'src/app/core/interfaces/usuario';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  titulo = 'Olá';
  textoBotao = 'ATUALIZAR';
  perfilComponent = true;

  token = '';
  nome = '';
  cadastro!: PessoaUsuaria;
  form!: FormGroup<any> | null;

  constructor(
    private tokenService: TokenService,
    private cadastroService: CadastroService,
    private formularioService: FormularioService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.retornarToken();
    this.cadastroService.getCadastro().subscribe((cadastro) => {
      this.cadastro = cadastro;
      this.nome = this.cadastro.nome;
      this.carregarFormulario();
    });
  }

  carregarFormulario() {
    this.formularioService.getCadastro();

    this.form?.patchValue({
      nome: this.cadastro.nome,
      nascimento: this.cadastro.nascimento,
      cpf: this.cadastro.cpf,
      telefone: this.cadastro.telefone,
      email: this.cadastro.email,
      senha: this.cadastro.senha,
      cidade: this.cadastro.cidade,
      estado: this.cadastro.estado,
      genero: this.cadastro.genero,
    });
  }

  deslogar() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  atualizar() {
    const dadosAtualizados = {
      nome: this.form?.get('nome')?.value,
      nascimento: this.form?.get('nascimento')?.value,
      cpf: this.form?.get('cpf')?.value,
      telefone: this.form?.get('telefone')?.value,
      email: this.form?.get('email')?.value,
      senha: this.form?.get('senha')?.value,
      cidade: this.form?.get('cidade')?.value,
      estado: this.form?.get('estado')?.value,
      genero: this.form?.get('genero')?.value,
    };

    this.cadastroService.editCadastro(dadosAtualizados).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
}
