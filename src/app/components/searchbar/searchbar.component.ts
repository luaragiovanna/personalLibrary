import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent  implements OnInit {
  @Output() searchChange = new EventEmitter<string>(); //evento de saída, 
  //emite eventos "searchChange" que podem ser ouvidos e respondidos pelos outros componentes

  buscar(event: any) {
    const busca = event.target.value.trim().toLowerCase(); //trim => tira espacamento,junta as palavras
    this.searchChange.emit(busca); //emite a "busca" como parte do evento searchChange
  }

  constructor() { }

  ngOnInit() {}

}
