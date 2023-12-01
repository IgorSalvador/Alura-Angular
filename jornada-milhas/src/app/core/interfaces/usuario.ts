import { UnidadeFederativa } from "./unidadefederativa";

export interface PessoaUsuaria {
    nome: string;
    nascimento: string;
    cpf: string;
    telefone: string;
    cidade: string;
    email: string;
    senha: string;
    estado: UnidadeFederativa;
    genero: string;
}