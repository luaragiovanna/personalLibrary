import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({ //possibilita injetar e utilizar em outras classes
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController,
    private loadingController: LoadingController) { }

  async presentAlert(subHeader : string, message : string) {
    const alert = await this.alertController.create({
      header: 'Biblioteca Pessoal',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  simpleLoader(){
    this.loadingController.create({
      message: 'Carregando...' 
    }).then((response) => {
      response.present();
    })
  }

  dismissLoader(){ //Quando termina de carregar os dados
    this.loadingController.dismiss().then((response) =>{
      console.log('Loader Fechado', response);
    })
  }

}