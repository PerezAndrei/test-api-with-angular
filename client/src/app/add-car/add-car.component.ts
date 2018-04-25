import { Component, EventEmitter, Output, ViewChild, ElementRef, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CarsService } from "../cars.service"
import { Car } from "../car.model"

@Component({
    selector: 'app-add-car',
    templateUrl: './add-car.component.html',
    styleUrls: ['./add-car.component.css']
})

export class AddCarComponent implements OnInit {

    check = false;
    type: string;
    model: string;
    year: number;

    @Output() onAddCar = new EventEmitter();
    @ViewChild("closeModalBtn") closeModalBtn: ElementRef;

    constructor(private carsService: CarsService){

    }

    public submitForm(form: NgForm){
        console.log(form.valid);
        if(!form.valid){
            this.check = true;
        }
        else{
            this.createCar(form.value);
            
        }
        
    }

    private closeModal(){
        this.closeModalBtn.nativeElement.click();
    }

    private createCar(car: Car){
        this.carsService.createCar(car).subscribe(result => {
            this.onAddCar.emit();
            this.closeModal();
        });
    }


    ngOnInit(){
    }
}