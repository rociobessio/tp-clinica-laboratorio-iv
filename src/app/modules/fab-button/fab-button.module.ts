import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavButtonComponent } from '../../components/fav-button/fav-button.component';



@NgModule({
  declarations: [
    FavButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[FavButtonComponent]
})
export class FabButtonModule { }
