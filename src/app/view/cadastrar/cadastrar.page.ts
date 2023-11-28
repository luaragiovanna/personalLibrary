import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LivroService } from 'src/app/model/services/livro.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import Livro from 'src/app/model/entities/Livro';

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

  constructor(private firebase: FirebaseService, private alertController: AlertController, private router : Router) { }

  cadastrar(){
    if(this.nome && this.autor && this.editora && this.anoPublicacao && this.genero){
      let novo: Livro = new Livro(this.nome, this.autor, this.genero, this.editora, this.anoPublicacao);
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo);
      }else{
        this.firebase.create(novo);
      }
      this.presentAlert("Sucesso", "Contato Salvo!");
      this.router.navigate(["/home"]);
    }else{
     this.presentAlert("Erro", "Campos Obrigatórios!");
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
