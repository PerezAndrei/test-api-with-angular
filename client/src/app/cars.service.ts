import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';

import { Car } from './car.model'

@Injectable()
export class CarsService {

    public carList: Car[] = [];
    private route: string = "http://localhost:17782/api/cars";

    constructor(private http: Http){

    }

    getCars(){
        return this.http.get(this.route)
        .map((data: Response) => data.json());
    }

    createCar(car: Car){
        return this.http.post(this.route, car);
    }

    updateCar(car: Car){
        return this.http.put(this.route, car);
    }

    deleteCar(id: number){
        return this.http.delete(`${this.route}/${id}`);
    }
}