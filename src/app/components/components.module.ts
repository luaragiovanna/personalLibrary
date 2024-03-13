import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BookComponent } from './book/book.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { LoadingBookComponent } from './loading-book/loading-book.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SectionsComponent } from './sections/sections.component';



@NgModule({
  declarations: [LoadingBookComponent,EmptyScreenComponent, BookComponent, SearchbarComponent, SectionsComponent  ],
  imports: [
    CommonModule,
    IonicModule, 
    ReactiveFormsModule //aqui
  ],
  exports: [LoadingBookComponent, EmptyScreenComponent, BookComponent, SearchbarComponent, SectionsComponent ],
})
export class ComponentsModule { }
