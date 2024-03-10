import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingBookComponent } from './loading-book/loading-book.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { IonicModule } from '@ionic/angular';
import { BookComponent } from './book/book.component';
import { SearchbarComponent } from './searchbar/searchbar.component';



@NgModule({
  declarations: [LoadingBookComponent,EmptyScreenComponent, BookComponent, SearchbarComponent],
  imports: [
    CommonModule,
    IonicModule //aqui
  ],
  exports: [LoadingBookComponent, EmptyScreenComponent, BookComponent, SearchbarComponent],
})
export class ComponentsModule { }
