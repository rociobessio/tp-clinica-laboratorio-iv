import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { checkAdminGuard } from '../../guards/check-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: { animation: '* <=> *' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
