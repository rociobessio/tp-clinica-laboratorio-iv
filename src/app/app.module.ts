import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { Enviroment } from '../env/env.enviroment';
import { provideHttpClient } from '@angular/common/http';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NotImageDirective } from './directives/not-image.directive';
import { BtnCircularEspDirective } from './directives/btn-circular-esp.directive';
import { BtnCuadradoEspecialidadDirective } from './directives/btn-cuadrado-especialidad.directive';
import { BorderFocusHorarioDirective } from './directives/border-focus-horario.directive';

@NgModule({
  declarations: [
    AppComponent,
    NotImageDirective,
    BtnCircularEspDirective,
    BtnCuadradoEspecialidadDirective,
    BorderFocusHorarioDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(Enviroment)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideHttpClient(),
    provideStorage(() => getStorage()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
