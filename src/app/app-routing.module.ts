import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'mortal-kombat',
    loadChildren: () => import('./filmes/mortal-kombat/mortal-kombat.module').then( m => m.MortalKombatPageModule)
  },
  {
    path: 'pets-monstruosos',
    loadChildren: () => import('./filmes/pets-monstruosos/pets-monstruosos.module').then( m => m.PetsMonstruososPageModule)
  },
  {
    path: 'good-doctor',
    loadChildren: () => import('./filmes/good-doctor/good-doctor.module').then( m => m.GoodDoctorPageModule)
  },  {
    path: 'dados-filme',
    loadChildren: () => import('./dados-filme/dados-filme.module').then( m => m.DadosFilmePageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
