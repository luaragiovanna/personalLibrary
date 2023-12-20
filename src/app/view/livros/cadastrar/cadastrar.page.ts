import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LivroService } from 'src/app/model/services/livro.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import Livro from 'src/app/model/entities/Livro';
import { AuthService } from 'src/app/model/services/auth.service';
import { AlertService } from 'src/app/common/alert.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  public nome: string;
  public autor: string;
  public genero: string;
  public editora: string;
  public anoPublicacao: number;
  public lista_livros : Livro[] = [];
  public imagem : any;
  public user: any;

  constructor(private firebase: FirebaseService, 
    private alertController: AlertController, 
    private router : Router,
    private auth : AuthService,
    private alertService : AlertService)  {
      this.user = this.auth.getUserLogged(); 
    }

  //criar submit

  async cadastrar() {
    try {
      if (this.nome && this.autor && this.editora && this.anoPublicacao && this.genero) {
        //await this.alertService.simpleLoader();
        let novo: Livro = new Livro(this.nome, this.autor, this.genero, this.editora, this.anoPublicacao);
        novo.uid = this.user.uid;
        if (this.imagem) {
          await this.firebase.uploadImage(this.imagem, novo);
        } else {
          await this.firebase.create(novo);
        }
        await this.alertService.dismissLoader();
        this.presentAlert("Sucesso", "Livro Salvo!");
        this.router.navigate(["/home"]);
      } else {
        await this.alertService.dismissLoader();
        this.presentAlert("Erro", "Campos Obrigatórios!");
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      await this.alertService.dismissLoader(); // Certifique-se de ocultar o loader em caso de erro
      this.presentAlert("Erro", "Erro ao salvar o livro.");
    }
  }
  

  uploadFile(imagem: any) {
    this.imagem = imagem.files
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Biblioteca Pessoal',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present(); //só finaliza a ação quando o botão é clicado
  }
  ngOnInit() {
  }

}
