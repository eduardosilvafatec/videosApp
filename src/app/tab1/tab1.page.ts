import { IGenero } from './../models/IGenero.model';
import { GeneroService } from './../services/genero.service';
import { IListaFilmes, IFilmeApi } from './../models/IFilmeAPI.model';
import { FilmeService } from './../services/filme.service';
import { DadosService } from './../services/dados.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { IFilme } from '../models/IFilme.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  titulo: string = 'Filmes';

  listaVideos: IFilme[] = [
    {
      nome: 'Mortal Kombat',
      lancamento: '15/04/2021',
      duracao: '1h 50m',
      classificacao: 76,
      cartaz:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/w8BVC3qrCWCiTHRz4Rft12dtQF0.jpg',
      generos: ['Ação', 'Fantasia', 'Aventura'],
      pagina: '/mortal-kombat',
    },
    {
      nome: 'Pets Monstruosos',
      lancamento: '02/04/2021',
      duracao: '6m',
      classificacao: 77,
      cartaz:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/dkokENeY5Ka30BFgWAqk14mbnGs.jpg',
      generos: ['Animação', 'Comédia', 'Aventura'],
      pagina: '/pets-monstruosos',
    },
    {
      nome: 'The Good Doctor: O Bom Doutor',
      lancamento: '01/01/2021',
      duracao: '43m',
      classificacao: 86,
      cartaz:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jtLB7xJKcbekmOYkb5NZditBsgk.jpg',
      generos: ['Drama'],
      pagina: '/good-doctor',
    },
    {
      nome: 'Fear the Walking Dead',
      lancamento: '01/01/2015',
      duracao: '43m',
      classificacao: 76,
      cartaz:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tbgPaIEZa9BuKKESdyapOn0CZh6.jpg',
      generos: ['Ação', 'Aventura', 'Drama'],
    },
    {
      nome: 'Expresso do Amanhã',
      lancamento: '30/07/2015',
      duracao: '2h 6m',
      classificacao: 69,
      cartaz:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9rtJNrpDuxHJiRormrY5S3GXwEu.jpg',
      generos: ['Ação', 'Ficção Científica', 'Drama'],
    },
  ];

  listaFilmes: IListaFilmes;

  generos: string[] = [];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public dadosService: DadosService,
    public filmeService: FilmeService,
    public generoService: GeneroService,
    public route: Router
  ) {}

  buscarFilmes(evento: any) {
    // console.log(evento.target.value);
    const busca = evento.target.value;
    if (busca && busca.trim() !== '') {
      this.filmeService.buscarFilmes(busca).subscribe(dados => {
        console.log(dados);
        this.listaFilmes = dados;
      });
    }
  }

  exibirFilme(filme: IFilmeApi) {
    this.dadosService.guardarDados('filme', filme);
    this.route.navigateByUrl('/dados-filme');
  }

  async exibirAlertaFavorito() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta!',
      message: 'Deseja realmente favoritar o filme?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          // cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'SIM, favoritar!',
          handler: () => {
            // console.log('Confirm Okay');
            this.apresentarToast();
          },
        },
      ],
    });

    await alert.present();
  }

  async apresentarToast() {
    const toast = await this.toastController.create({
      message: 'Filme adicionado aos favoritos.',
      duration: 2000,
      color: 'success',
      position: 'bottom',
    });
    toast.present();
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
