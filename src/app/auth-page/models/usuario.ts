import { Localidade } from './localidade';

export interface Usuario {
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
  numeroRegistro: string;
  areaAtuacao: number;
  deslocamentoMaximo: string;
  userId: string;
  localidade: Localidade;
}
