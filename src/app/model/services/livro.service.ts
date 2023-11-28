import { Injectable } from '@angular/core';
import Livro from '../entities/Livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  public lista_livros : Livro[] = [];

  constructor() { 
    /*let c1 : Contato = new Contato("Carlos Eduardo", 910728123);
    let c2 : Contato = new Contato("Jotair", 909828123, "vsjsasa@gmail.com");
    let c3 : Contato = new Contato("Giovanne Galvão", 912348123, "vsjfggfda@gmail.com");
    let c4 : Contato = new Contato("Josiel", 910735223, "ja@gmail.com");
    this.lista_contatos.push(c1);
    this.lista_contatos.push(c2);
    this.lista_contatos.push(c3);
    this.lista_contatos.push(c4);*/
  }

  cadastrar(livro: Livro){
    this.lista_livros.push(livro);
  }

  obterTodos() : Livro[]{
    return this.lista_livros;
  }

  obterPorIndice(indice : number) : Livro{
    //pega o indice do vetor
    return this.lista_livros[indice];
  }

  editar(indice:number, livro: Livro){
    this.lista_livros[indice] = livro;
  }

  excluir(indice: number){
    this.lista_livros.splice(indice, 1); //retira os elementos do vetor daquele indice / tira o vetor da lista, sem precisar linkar o anterior com o proximo
  }
}
