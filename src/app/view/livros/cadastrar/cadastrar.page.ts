import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import Livro from 'src/app/model/entities/Livro';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

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
  formLivro: FormGroup;

  constructor(private firebase: FirebaseService, 
    private router : Router,
    private auth : AuthService,
    private alertService : AlertService,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService)  {
      this.user = this.auth.getUserLogged(); 
      this.formLivro = new FormGroup({
        nome: new FormControl,
        autor: new FormControl,
        genero: new FormControl,
        editora: new FormControl,
        anoPublicacao: new FormControl
      })
    }

  //criar submit

  // cadastrar(){
  //   if(!(this.nome && this.autor && this.editora && this.anoPublicacao && this.genero)){
  //     this.alertService.presentAlert("Erro", "Campos Obrigatórios!");
  //     //this.nome || !this.episodios || !this.genero
  //     // if(this.formLivro.value['anoPublicacao'] <= 0){
  //     //   this.alertService.presentAlert("Erro", "O campo Ano de Publicação não pode ser negativo ou zero");   
  //     // }else{
  //     //   this.alertService.presentAlert("Erro", "Campos Obrigatórios!");
  //     // }
  //   } 
  //   else{
  //     this.alertService.simpleLoader();
  //     let novo : Livro = new Livro(this.formLivro.value['nome'], this.formLivro.value['autor'], this.formLivro.value['genero'], this.formLivro.value['editora'], this.formLivro.value['anoPublicacao']);
  //     novo.uid = this.user.uid;
  //     if(this.imagem){
  //        this.firebaseService.uploadImage(this.imagem, novo)
  //     }else{
  //       this.firebaseService.create(novo).then(() => {
  //         this.alertService.dismissLoader();
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //     }
  //     this.alertService.presentAlert("Sucesso", "Livro Cadastrado!");
  //     this.router.navigate(['/home']);
  //   }
  // }

  // async cadastrar() {
  //   try {
  //     if (this.nome && this.autor && this.editora && this.anoPublicacao && this.genero) {
  //       //await this.alertService.simpleLoader();
  //       let novo: Livro = new Livro(this.nome, this.autor, this.genero, this.editora, this.anoPublicacao);
  //       novo.uid = this.user.uid;
  //       if (this.imagem) {
  //         await this.firebase.uploadImage(this.imagem, novo);
  //       } else {
  //         await this.firebase.create(novo);
  //       }
  //       await this.alertService.dismissLoader();
  //       this.alertService.presentAlert("Sucesso", "Livro Salvo!");
  //       this.router.navigate(["/home"]);
  //     } else {
  //       await this.alertService.dismissLoader();
  //       this.alertService.presentAlert("Erro", "Campos Obrigatórios!");
  //     }
  //   } catch (error) {
  //     console.error('Erro ao cadastrar:', error);
  //     await this.alertService.dismissLoader(); // Certifique-se de ocultar o loader em caso de erro
  //     this.alertService.presentAlert("Erro", "Erro ao salvar o livro.");
  //   }
  // }

  async cadastrar() {
    try {
      const {nome, autor, editora, anoPublicacao, genero} = this.formLivro.value;
      if (nome && autor && editora && anoPublicacao && genero) {
        //await this.alertService.simpleLoader();
        let novo: Livro = new Livro(nome, autor, genero, editora, anoPublicacao);
        novo.uid = this.user.uid;
        if (this.imagem) {
          await this.firebase.uploadImage(this.imagem, novo);
        } else {
          await this.firebase.create(novo);
        }
        await this.alertService.dismissLoader();
        this.alertService.presentAlert("Sucesso", "Livro Salvo!");
        this.router.navigate(["/home"]);
      } else {
        await this.alertService.dismissLoader();
        this.alertService.presentAlert("Erro", "Campos Obrigatórios!");
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      await this.alertService.dismissLoader(); // Certifique-se de ocultar o loader em caso de erro
      this.alertService.presentAlert("Erro", "Erro ao salvar o livro.");
    }
  }
  
  submitForm() : boolean{
    if(!this.formLivro.valid){
      this.alertService.presentAlert("Erro", "Erro ao Preencher campo!!")
      return false;
    }else{
      this.alertService.simpleLoader();
      this.cadastrar();
      return true;
    }
  }
  
  get errorControl(){
    return this.formLivro.controls;
  }

  uploadFile(imagem: any) {
    this.imagem = imagem.files
  }
  ngOnInit() {
    this.formLivro = this.formBuilder.group({
      nome: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      editora: ['', [Validators.required]],
      anoPublicacao: ['', [Validators.required]/*,[Validators.min(0)], [Validators.pattern('^[0-9]+$')]*/]
    })
  }

}
