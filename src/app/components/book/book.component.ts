import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Livro from 'src/app/model/entities/Livro';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent  implements OnInit {
  @Input() book: Livro;

  constructor(private router : Router/*, private livro : Livro*/) {
    /*this.book.id = livro.id;
    this.book.uid = livro.uid;
    this.book.autor = livro.autor;
    this.book.genero = livro.genero;
    this.book.editora = livro.editora;
    this.book.anoPublicacao = livro.anoPublicacao;*/
  }

  ngOnInit() {}

  editar(livro: Livro){
    this.router.navigateByUrl("/detalhar", {state : {livro:livro}});//passa o objeto inteiro, n mais só o parametro
    //console.log(index);
  }

}
