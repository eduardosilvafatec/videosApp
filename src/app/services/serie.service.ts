import { IListaSeries } from './../models/ISerie.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  language = 'pt-BR';

  private apiURL = 'https://api.themoviedb.org/3/';
  private key = '?api_key=6c02122aaae9b6aaa8d319cbf5787b90';

  constructor(private http: HttpClient, public toastController: ToastController) { }

  buscarSeries(busca: string): Observable<IListaSeries>{
    const url = `${this.apiURL}search/tv${this.key}&language=${this.language}&query=${busca}`;

    return this.http.get<IListaSeries>(url).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirErro(erro))
    );
  }

  async exibirErro(erro) {
    const toast = await this.toastController.create({
      message: 'Erro ao consultar a API!',
      duration: 2000,
      color: 'danger',
      position: 'middle'
    });
    toast.present();
    return null;
  }
}
