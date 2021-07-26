// ---------------Angular---------------
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// ---------------Services---------------
import { AuthService } from './services/auth.service';

// ---------------Components---------------
import { AuthPageComponent } from './auth-page.component';

// ---------------Validation modules---------------
import { NgBrazil } from 'ng-brazil'
import { CustomFormsModule } from 'ng2-validation'

// ---------------Angular Material---------------
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';

// ---------------Componentes de terceiros---------------
import { TextMaskModule } from 'angular2-text-mask';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AuthPageComponent,
    CadastroComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgBrazil,
    TextMaskModule,
    CustomFormsModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatStepperModule,
    MatCheckboxModule
  ],
  exports: [
    AuthPageComponent
  ],
  providers: [
    AuthService
  ]

})
export class AuthPageModule {}
