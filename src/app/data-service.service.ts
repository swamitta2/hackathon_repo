import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DataServiceService {
    constructor(public http: Http) {}

    getListDetails() {
        return this.http.get('../assets/data/products.json').pipe(map(res => res.json()));
    }
}
