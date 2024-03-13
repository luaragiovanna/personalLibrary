import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarPageRoutingModule } from './cadastrar-routing.module';

import { ComponentsModule } from 'src/app/components/components.module';
import { CadastrarPage } from './cadastrar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarPageRoutingModule,
    ReactiveFormsModule, 
    ComponentsModule
  ],
  declarations: [CadastrarPage]
})
export class CadastrarPageModule {}
