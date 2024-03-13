import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalharPageRoutingModule } from './detalhar-routing.module';

import { ComponentsModule } from 'src/app/components/components.module';
import { DetalharPage } from './detalhar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalharPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetalharPage]
})
export class DetalharPageModule {}
