import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { ComponentsModule } from "../../../components/components.module";
import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
    declarations: [HomePage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        ComponentsModule //aqui
    ],
})
export class HomePageModule {}
