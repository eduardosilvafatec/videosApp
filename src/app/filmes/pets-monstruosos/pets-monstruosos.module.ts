import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetsMonstruososPageRoutingModule } from './pets-monstruosos-routing.module';

import { PetsMonstruososPage } from './pets-monstruosos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetsMonstruososPageRoutingModule
  ],
  declarations: [PetsMonstruososPage]
})
export class PetsMonstruososPageModule {}
