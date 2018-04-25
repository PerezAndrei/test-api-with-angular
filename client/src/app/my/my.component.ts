import {Component, Input, ViewChild, ElementRef, OnInit} from '@angular/core';
import { AddCarComponent } from '../add-car/add-car.component';
import { UpdateCarComponent } from "../update-car/update-car.component"
import { CarsService } from '../cars.service';
import {Car} from '../car.model'

@Component({
    selector: 'app-my',
    templateUrl: './my.component.html'
})

export class MyComponent implements OnInit {
    @ViewChild(AddCarComponent) addComponent: AddCarComponent;
    @ViewChild(UpdateCarComponent) updateComponent: UpdateCarComponent;

    cars: Car[] = [];

    constructor(private carsService: CarsService){

    }

    ngOnInit(){
        this.getCars();
    }

    delCar(event) {
        let target = event.target || event.srcElement || event.currentTarget;
        let carIdAttr = target.attributes.carid;
        let carId: number = parseInt(carIdAttr.nodeValue);
        this.removeCarById(carId);
    }
    
    updateCarList(){
        this.getCars();
    }

    openAddModal(){
        this.addComponent.check = false;
        this.addComponent.type = null;
        this.addComponent.model = null;
        this.addComponent.year = null;
    }

    openUpdateModal(event){
        let target = event.target || event.srcElement || event.currentTarget;
        let carAttrs = target.attributes;
        let car = <Car>{id: carAttrs.carid.nodeValue,
            year: carAttrs.caryear.nodeValue,
            type: carAttrs.cartype.nodeValue,
            model: carAttrs.carmodel.nodeValue
        };
        this.updateComponent.car = car;
    }

    private removeCarById(id: number){
        this.carsService.deleteCar(id).subscribe(result => {
            this.getCars();
        });
    }

    private getCars(){
        this.carsService.getCars().subscribe((result: Car[]) => {
            this.cars = result;
        });
    }
}