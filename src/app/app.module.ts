import { BrowserModule } from '@angular/platform-browser'; //BASE
import { NgModule } from '@angular/core'; //BASE

import { HttpClientModule } from '@angular/common/http' // importando httpclientmodule para generar request al back-end
import { Routes, RouterModule} from '@angular/router' // importando modulos para el ruteo

import { AppRoutingModule } from './app-routing.module'; //BASE

/* Componentes del aplicativo */
import { AppComponent } from './app.component'; 
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

/* Import generado por Angular/Material */
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; 

/*   Imports de los modulos de objetos angular material   */
import { MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule } from '@angular/material';

//Creando rutas
const routes:Routes = [
  {path: '', redirectTo:'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NoopAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
