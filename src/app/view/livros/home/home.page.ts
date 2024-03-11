import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import Livro from 'src/app/model/entities/Livro';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('mySearchbar') searchbar: IonSearchbar;
  lista_livros: Livro[] = [];
  public user: any; 
  isLoading: boolean = false;
  hasSearched: boolean = false;
  query: any;
  model: any = {
    icon: 'ban-outline',
    title: 'Nenhum livro encontrado'
  };

  constructor(private firebase: FirebaseService, private router: Router, private auth: AuthService) {
    this.isLoading = true;
    this.hasSearched = false;
    this.user = this.auth.getUserLogged();

    this.firebase.read(this.user.uid).subscribe(res => {
      this.lista_livros = res.map(livro => ({
        id: livro.payload.doc.id,
        ...livro.payload.doc.data() as any
      } as Livro));
      this.isLoading = false;
    });
  }

  irParaCadastrar() {
    this.router.navigate(['/cadastrar']);
  }

  // Método para lidar com a edição do livro
  editarLivro(livro: Livro) {
    this.router.navigateByUrl("/detalhar", { state: { livro: livro } });
  }

  logout() {
    this.auth.signOut().then((res) => {
      this.router.navigate(["signin"]);
    })
  }

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      // Colocar lista de livros
      this.lista_livros;
      this.isLoading = false;
    }, 3000); // Da um delay de 3 milissegundos
  }

  // Método para filtrar livros
  filtrarlivros(event: any) {
    this.isLoading = true;
    const query = event.detail.value;
  
    if (query) {
      console.log('Query:', query);
      this.firebase.read(this.user.uid).subscribe(res => {
        this.lista_livros = res.map(livro => ({
          id: livro.payload.doc.id,
          ...livro.payload.doc.data() as any
        } as Livro)).filter(livro =>
          livro.nome.toLowerCase().includes(query.toLowerCase())
        );
        console.log('Livros filtrados:', this.lista_livros);
        this.isLoading = false;
      });
    } else {
      // Se o campo de busca estiver vazio, recarrega todos os livros
      this.firebase.read(this.user.uid).subscribe(res => {
        this.lista_livros = res.map(livro => ({
          id: livro.payload.doc.id,
          ...livro.payload.doc.data() as any
        } as Livro));
        console.log('Livros filtrados (sem busca):', this.lista_livros);
        this.isLoading = false;
      });
    }
  }
  
  
  
  // Método chamado quando a busca é alterada
  onSearchChange(event: any) {
    this.hasSearched = true;
    this.query = event.detail.value.toLowerCase();
    if (this.query.length > 0) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    }
  }

  // Método chamado quando o usuário deseja voltar da busca
  returnSearch() {
    this.hasSearched = false;
    this.searchbar.value = null;
  }
}
