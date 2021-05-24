import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetsMonstruososPage } from './pets-monstruosos.page';

const routes: Routes = [
  {
    path: '',
    component: PetsMonstruososPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsMonstruososPageRoutingModule {}
