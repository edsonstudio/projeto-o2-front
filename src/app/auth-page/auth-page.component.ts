import { UserService } from './services/user.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControlName, FormControl } from '@angular/forms';
import { ValidationMessages, GenericValidator, DisplayMessage } from './generic-form-validation';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';
import { fromEvent, merge, Observable } from 'rxjs';
import { Usuario } from './models/usuario';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CepConsulta } from './models/localidade';
import { StringUtils } from '../utils/string-utils';
@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  hide = true;
  usuario: Usuario;

  validationMessages: ValidationMessages;
	genericValidator: GenericValidator;
	displayMessage: DisplayMessage = {};
  formResult: string = '';
	MASKS = MASKS;

  public usuarioForm: FormGroup;
  dadosProfissionais: FormGroup;
  localidade: FormGroup;

  isEditable = true;
  isLinear = false; //não esquecer de deixar como true

  mudancasNaoSalvas: boolean;
  errors: any[] = [];

  constructor(private _formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService) {

    this.validationMessages = {
			name: {
				required: 'O nome é requerido',
				minlength: 'O nome precisa ter no mínimo 2 caracteres',
				maxlength: 'O nome precisa ter no máximo 150 caracteres'
			},
			phoneNumber: {
				required: 'O telefone é requerido',
				minlength: 'O telefone precisa ter no mínimo 14 caracteres',
				maxlength: 'O telefone precisa ter no máximo 15 caracteres'
			},
			dataNascimento: {
				required: 'A data de nascimento é requerida'
			},
			genero: {
				required: 'O gênero é requerido',
				minlength: 'O gênero precisa ter no mínimo 2 caracteres',
				maxlength: 'O gênero precisa ter no máximo 25 caracteres'
			},
			email: {
				required: 'Informe o e-mail',
				email: 'E-mail inválido'
			},
			password: {
				required: 'Informe a senha',
				rangeLength: 'A senha deve possuir entre 6 e 100 caracteres'
			},
			confirmPassword: {
				required: 'Informe a senha novamente',
				rangeLength: 'A senha deve possuir entre 6 e 100 caracteres',
				equalTo: 'As senhas não conferem'
			},
      profissao: {
        required: 'Informe a sua profissão'
      },
      numeroRegistro: {
        required: 'Informe o seu número de registro'
      },
      areaAtuacao: {
        required: 'Informe a sua área de atuação'
      },
      deslocamentoMaximo: {
        required: 'Informe o seu deslocamento máximo'
      },
      logradouro: {
        required: 'Informe o Logradouro',
      },
      numero: {
        required: 'Informe o Número',
      },
      bairro: {
        required: 'Informe o Bairro',
      },
      cep: {
        required: 'Informe o CEP',
        cep: 'CEP em formato inválido'
      },
      cidade: {
        required: 'Informe a Cidade',
      },
      estado: {
        required: 'Informe o Estado',
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    let password = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
		let confirmPassword = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(password)]);

    this.usuarioForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      phoneNumber: ['', [Validators.required, NgBrazilValidators.telefone]],
      dataNascimento: ['', Validators.required],
      genero: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: password,
      confirmPassword: confirmPassword,

      dadosProfissionais: this._formBuilder.group({
        profissao: ['', Validators.required],
        numeroRegistro: ['', Validators.required],
        areaAtuacao: ['', Validators.required],
        deslocamentoMaximo: ['', Validators.required],

        localidade: this._formBuilder.group({
          logradouro: ['', [Validators.required]],
          numero: ['', [Validators.required]],
          complemento: [''],
          bairro: ['', [Validators.required]],
          cep: ['', [Validators.required, NgBrazilValidators.cep]],
          cidade: ['', [Validators.required]],
          estado: ['', [Validators.required]]})
      })
    });

  }

  ngAfterViewInit(): void {
		let controlBlurs: Observable<any>[] = this.formInputElements
		.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

		merge(...controlBlurs).subscribe(() => {
			this.displayMessage = this.genericValidator.processarMensagens(this.usuarioForm);
			this.mudancasNaoSalvas = true;
		});
	}

  buscarCep(cep: string) {
    cep = StringUtils.somenteNumeros(cep);
    if(cep.length < 8) return;

    this.userService.consultarCep(cep)
      .subscribe(
        cepRetorno => this.preencherEnderecoConsulta(cepRetorno),
        erro => this.errors.push(erro)
      );
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta) {
    this.usuarioForm.patchValue({
      dadosProfissionais: {

        localidade: {
          logradouro: cepConsulta.logradouro,
          bairro: cepConsulta.bairro,
          cep: cepConsulta.cep,
          cidade: cepConsulta.localidade,
          estado: cepConsulta.uf
        }
      }
    });
  }

  adicionarUsuario() {
		if (this.usuarioForm.dirty && this.usuarioForm.valid) {

			this.usuario = Object.assign({}, this.usuario, this.usuarioForm.value);
      this.formResult = JSON.stringify(this.usuarioForm.value);
      this.mudancasNaoSalvas = false;

      this.usuario.dadosProfissionais.localidade.cep = StringUtils.somenteNumeros(this.usuario.dadosProfissionais.localidade.cep);

      this.usuario.dadosProfissionais.areaAtuacao = parseInt(this.usuario.dadosProfissionais.areaAtuacao.toString());
      this.usuario.dadosProfissionais.numeroRegistro = parseInt(this.usuario.dadosProfissionais.numeroRegistro.toString());

      this.userService.registrarUsuario(this.usuario).subscribe(
        sucesso => { this.processarSucesso(sucesso) },
        falha => { this.processarSucesso(falha) }
      );

		} else {
			this.formResult = "Não submeteu!!!"
		}
	}

  processarSucesso(response: any) {
    this.usuarioForm.reset();
    this.errors = [];
    this.userService.LocalStorage.salvarDadosLocaisUsuario(response);

    let toastr = this.toastr.success('Cadastro efetuado com Sucesso.', 'Seja bem vindo :D');
    if(toastr) {
      toastr.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro !!!', 'Eita :O');
  }


}
