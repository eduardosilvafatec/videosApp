import { GeneroService } from './../services/genero.service';
import { AlertController, ToastController } from '@ionic/angular';
import { DadosService } from './../services/dados.service';
import { ISerieApi, IListaSeries } from './../models/ISerie.model';
import { IListaFilmes } from './../models/IFilmeAPI.model';
import { SerieService } from './../services/serie.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  titulo: string = 'Séries';

  listaSeries: IListaSeries;

  generos: string[] = [];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public dadosService: DadosService,
    public serieService: SerieService,
    public generoService: GeneroService,
    public route: Router
    ) {}

  buscarSeries(evento: any) {
    // console.log(evento.target.value);
    const busca = evento.target.value;
    if (busca && busca.trim() !== '') {
      this.serieService.buscarSeries(busca).subscribe(dados => {
        console.log(dados);
        this.listaSeries = dados;
      });
    }
  }

  exibirSerie(serie: ISerieApi) {
    this.dadosService.guardarDados('serie', serie);
    this.route.navigateByUrl('/dados-serie');
  }

  ngOnInit() {
    this.generoService.buscarGeneros().subscribe(dados => {
      // console.log('Generos: ', dados.genres);
      dados.genres.forEach(genero => {
        this.generos[genero.id] = genero.name;
      })
    });

    this.dadosService.guardarDados('generos', this.generos);
  }

}
