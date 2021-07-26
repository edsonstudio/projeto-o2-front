import { Localidade } from './localidade';

export class Usuario {
  id: string;
  name: string;
  phoneNumber: string;
  dataNascimento: Date;
  genero: string;
  email: string;
  password: string;
  confirmPassword: string;
  dadosProfissionais: DadosProfissionais;
}

export class DadosProfissionais {
  id: string;
  profissao: string;
  numeroRegistro: number;
  areaAtuacao: number;
  deslocamentoMaximo: string;
  userId: string;
  localidade: Localidade;
}
