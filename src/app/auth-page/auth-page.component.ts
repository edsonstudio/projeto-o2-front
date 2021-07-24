import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControlName, FormControl } from '@angular/forms';
import { ValidationMessages, GenericValidator, DisplayMessage } from './generic-form-validation';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';
import { fromEvent, merge, Observable } from 'rxjs';
import { Usuario } from './models/usuario';
@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  hide = true;

  usuario: Usuario;

  validationMessages: ValidationMessages;
	genericValidator: GenericValidator;
	displayMessage: DisplayMessage = {};
  formResult: string = '';
	MASKS = MASKS;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isEditable = true;
  isLinear = false;

  mudancasNaoSalvas: boolean;

  constructor(private _formBuilder: FormBuilder) {

    this.validationMessages = {
			nome: {
				required: 'O nome é requerido',
				minlength: 'O nome precisa ter no mínimo 2 caracteres',
				maxlength: 'O nome precisa ter no máximo 150 caracteres'
			},
			telefone: {
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
			senha: {
				required: 'Informe a senha',
				rangeLength: 'A senha deve possuir entre 6 e 100 caracteres'
			},
			senhaConfirm: {
				required: 'Informe a senha novamente',
				rangeLength: 'A senha deve possuir entre 6 e 100 caracteres',
				equalTo: 'As senhas não conferem'
			}
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

    this.secondFormGroup = this._formBuilder.group({
      profissao: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      cep: ['', Validators.required]
    });
  }

  ngOnInit() {
    let password = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
		let passwordConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(password)]);

    this.firstFormGroup = this._formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      telefone: ['', [Validators.required, NgBrazilValidators.telefone]],
      dataNascimento: ['', Validators.required],
      genero: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: password,
      senhaConfirm: passwordConfirm
    });

  }

  ngAfterViewInit(): void {
		let controlBlurs: Observable<any>[] = this.formInputElements
		.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

		merge(...controlBlurs).subscribe(() => {
			this.displayMessage = this.genericValidator.processarMensagens(this.firstFormGroup);
			this.mudancasNaoSalvas = true;
		});
	}

  adicionarUsuario() {
		if (this.firstFormGroup.dirty && this.firstFormGroup.valid) {
			this.usuario = Object.assign({}, this.usuario, this.firstFormGroup.value);
			this.formResult = JSON.stringify(this.firstFormGroup.value);
			this.mudancasNaoSalvas = false;
		} else {
			this.formResult = "Não submeteu!!!"
		}
	}

}
