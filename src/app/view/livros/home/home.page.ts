import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { AlertController } from '@ionic/angular';
import Livro from 'src/app/model/entities/Livro';
import { LivroService } from 'src/app/model/services/livro.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public nome: string;
  public autor: string;
  public genero: string;
  public editora: string;
  public anoPublicacao: number;
  public user: any; 
  public lista_livros : Livro[] = [];
  books : any[] = [];
  isLoading: boolean = false;
  model: any = {
    icon: 'ban-outline',
    title: 'Nenhum livro encontrado'
  };
  query: any;
  hasSearched: boolean = false;
  

  constructor(private firebase : FirebaseService, private router : Router, private auth : AuthService){
    this.isLoading = true;
    this.hasSearched = false;
    this.user = this.auth.getUserLogged()
      console.log(this.auth.getUserLogged())
    this.firebase.read(this.user.uid).subscribe(res => { //pega os dados do firebase e armazena no id do livro da home
      this.lista_livros = res.map(livro =>{
        return{
          id: livro.payload.doc.id,//anexa esse conteúdo a um id
          ... livro.payload.doc.data() as any //tudo q a gente insere -> data, telefone
        }as Livro
      })
    })
  }

  irParaCadastrar(){
    this.router.navigate(['/cadastrar']);
  }

  /*editar(livro: Livro){
    this.router.navigateByUrl("/detalhar", {state : {livro:livro}});//passa o objeto inteiro, n mais só o parametro
    //console.log(index);
  }*/

  logout(){
    this.auth.signOut().then((res)=>{
      this.router.navigate(["signin"]);
    })
  }

  ngOnInit() {
    this.isLoading = true;
    setTimeout(()=>{
      //colocar lista de livros
      this.lista_livros;
      
      this.isLoading = false;
    },3000); //da um delay de 3 milisegundos
    
  }

  filtrarlivros(query: any) {
    if (query) {
      this.lista_livros = this.lista_livros.filter(livro =>
        livro.nome.toLowerCase().includes(query)
      );
    } else {
      // Se o campo de busca estiver vazio, exibir todas as músicas novamente
      this.firebase.read(this.user.uid)
        .subscribe(res => {
          this.lista_livros = res.map(livro => ({
            id: livro.payload.doc.id,
            ...livro.payload.doc.data() as any
          } as Livro));
        });
    }
  }

  // async onSearchChange(event: any){
  //   this.hasSearched = true;
  //   this.query = (event.target as HTMLInputElement).value;
  //   this.books = [];
  //   if(this.query.length > 0){
  //     this.isLoading = true;
  //     setTimeout(async()=>{
  //       this.books = await this.lista_livros.filter((element: any) => {
  //         return element.nome.includes(this.query);
  //       })
  //       console.log(this.books);
  //       this.isLoading = false;
  //     }, 3000);
  //   }
  // }

  // returnSearch(){
  //   this.hasSearched = false;
  // }
}
