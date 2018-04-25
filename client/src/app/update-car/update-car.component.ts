import { Component, EventEmitter, Output, ViewChild, ElementRef, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CarsService } from "../cars.service"
import { Car } from "../car.model"

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {
  
  check = false;
  type: string;
  model: string;
  year: number;
  id: number;
  car = <Car>{};

  @Output() onUpdateCar = new EventEmitter();
  @ViewChild("closeModalBtn") closeModalBtn: ElementRef;

  ngOnInit() {
  }

  constructor(private carsService: CarsService){

  }

  public submitForm(form: NgForm){
      console.log(form.valid);
      if(!form.valid){
          this.check = true;
      }
      else{
          this.updateCar(form.value);
      }
  }

  private closeModal(){
      this.closeModalBtn.nativeElement.click();
  }

  private updateCar(car: Car){
    car.id = this.car.id;
      this.carsService.updateCar(car).subscribe(result => {
          this.onUpdateCar.emit();
          this.closeModal();
      });
  }

}
