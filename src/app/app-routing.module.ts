import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => 
        import('./pages/welcome/welcome.module')
    .then((mod) => mod.WelcomeModule)
},
{
    path:'register-especialista',
    loadChildren:() => 
        import('./pages/log/register/register-especialista/register-especialista.module')
    .then((mod) => mod.RegisterEspecialistaModule)
},
{
    path:'register-paciente',
    loadChildren:() => 
        import('./pages/log/register/register-paciente/register-paciente.module')
    .then((mod) => mod.RegisterPacienteModule)
},
{
    path:'usuarios',
    loadChildren:() => 
        import('./pages/users/users.module')
    .then((mod) => mod.UsersModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
