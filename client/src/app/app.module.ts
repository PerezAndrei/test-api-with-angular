import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import {MyComponent} from './my/my.component';
import {AddCarComponent} from './add-car/add-car.component';
import { UpdateCarComponent } from './update-car/update-car.component';
import { CarsService } from './cars.service';


@NgModule({
  declarations: [
    AppComponent,
    MyComponent,
    AddCarComponent,
    UpdateCarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CarsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
