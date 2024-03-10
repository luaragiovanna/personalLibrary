import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-book',
  templateUrl: './loading-book.component.html',
  styleUrls: ['./loading-book.component.scss'],
})
export class LoadingBookComponent  implements OnInit {
  dummy= Array(10);
  constructor() { }

  ngOnInit() {}

}
