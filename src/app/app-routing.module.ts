import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { notloggedGuard } from './guards/notlogged.guard';
import { checkAdminGuard } from './guards/check-admin.guard';
import { checkPacienteGuard } from './guards/check-paciente.guard';
import { checkEspecialistaGuard } from './guards/check-especialista.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => 
        import('./pages/welcome/welcome.module')
    .then((mod) => mod.WelcomeModule),
    canActivate: [notloggedGuard]
    },
    {
        path:'login',
        loadChildren:() => 
            import('./pages/log/login/login.module')
        .then((mod) => mod.LoginModule),
        canActivate: [notloggedGuard]
    },
    {
        path:'register-especialista',
        loadChildren:() => 
            import('./pages/log/register/register-especialista/register-especialista.module')
        .then((mod) => mod.RegisterEspecialistaModule),
        canActivate: [notloggedGuard]
    },
    {
        path:'register-paciente',
        loadChildren:() => 
            import('./pages/log/register/register-paciente/register-paciente.module')
        .then((mod) => mod.RegisterPacienteModule),
        canActivate: [notloggedGuard]
    },
    {
        path:'usuarios',
        loadChildren:() => 
            import('./pages/users/users.module')
        .then((mod) => mod.UsersModule),
        canActivate: [checkAdminGuard]
    },
    {
        path:'especialista',
        loadChildren:() => 
            import('./pages/especialista/especialista.module')
        .then((mod) => mod.EspecialistaModule),
        canActivate: [checkEspecialistaGuard]
    },
    {
        path: 'paciente',
        loadChildren: () =>
            import('./pages/paciente/paciente.module')
        .then((pac) => pac.PacienteModule),
        // canActivate: [checkPacienteGuard]
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
