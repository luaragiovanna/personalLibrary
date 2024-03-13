import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/common/alert.service';
import Livro from 'src/app/model/entities/Livro';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  //contato!: Contato; //contato! => tem que declarar e inicializar
  livro: Livro;
  indice: number;
  nome: string;
  autor: string;
  genero: string;
  editora: string;
  anoPublicacao: Date;
  edicao: boolean = true;
  public imagem : any;
  public user: any;
  public  formLivro: FormGroup;

  constructor(private alertController: AlertController, 
    private router: Router, 
    private firebase: FirebaseService,
    private alertService: AlertService,
    private auth: AuthService,  private formBuilder: FormBuilder) {
      this.user = this.auth.getUserLogged();
      
      this.formLivro = this.formBuilder.group({
        nome: ['', [Validators.required]],
        autor: ['', [Validators.required]],
        genero: ['', [Validators.required]],
        editora: ['', [Validators.required]],
        anoPublicacao: ['', [Validators.required]],
      });
    }

  //possibilita carregar todos os dados na tela no q o usuario é redirecionado para essa tela 
  ngOnInit() {
    this.livro = history.state.livro;
    this.formLivro.patchValue({
      nome: this.livro.nome,
      autor: this.livro.autor,
      editora: this.livro.editora,
      genero: this.livro.genero,
      anoPublicacao: this.livro.anoPublicacao
    });
  }
  

  habilitar(){ //inverte os true/false
    if(this.edicao){
      this.edicao = false;
    }else{
      this.edicao = true;
    }
  }

  async editar(){
    if(this.nome && this.autor && this.editora && this.anoPublicacao && this.genero){
      //await this.alertService.simpleLoader();
      let novo: Livro = new Livro(this.nome, this.autor, this.genero, this.editora, this.anoPublicacao);
      novo.id = this.livro.id;
      novo.uid = this.user.uid;
      if(this.imagem){
        this.firebase.uploadImage(this.imagem,novo);
        await this.alertService.dismissLoader();
      }else{
        this.firebase.update(novo, this.livro.id); //poderia ser novo.id tambem
      }
      await this.alertService.dismissLoader();
      this.router.navigate(["/home"]);
    }else{
      await this.alertService.dismissLoader();
      this.presentAlert('ERRO', 'Campos Obrigatórios');
    }
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

  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  excluir(){
    this.presentConfirmAlert("Biblioteca Pessoal", "Atenção", "Você deseja realmente excluir esse livro?")
  }

  excluirContato(){ //mudar para excluirLivro
    this.firebase.delete(this.livro);
    this.alertService.dismissLoader();
    this.router.navigate(['/home']);
  }

  async presentConfirmAlert(titulo : string, subtitulo: string, msg : string){
      const alert = await this.alertController.create({
        header: titulo,
        subHeader: subtitulo,
        message: msg,
        buttons: [
          {text: 'Cancelar',
          role: 'cancelar',
          handler: ()=>{console.log("cancelou")}},
          {
          text: 'Confirmar',
          role: 'confirmar',
          handler:(acao) =>{
            this.excluirContato();
            this.alertService.dismissLoader();
          }
          }
        ],
      })
      await alert.present();
  }
   

}