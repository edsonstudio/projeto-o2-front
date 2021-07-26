import { AfterViewInit, Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { Usuario } from '../models/usuario';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends FormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  hide = true;
  errors: any[] = [];
  usuario: Usuario;

  constructor(private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { super(); }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

}
