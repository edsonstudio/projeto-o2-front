// ---------------Angular---------------
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ---------------Sub-modules---------------
import { AppRoutingModule } from './app-routing.module';
import { AuthPageModule } from './auth-page/auth-page.module';
import { NavegacaoModule } from './navegacao/navegacao.module';

// ---------------Services---------------

// ---------------Components---------------
import { AppComponent } from './app.component';

// ---------------Angular Material---------------

// ---------------Componentes de terceiros---------------
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    AuthPageModule,
    NavegacaoModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      progressAnimation: 'decreasing',
      progressBar: true,
      closeButton: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
