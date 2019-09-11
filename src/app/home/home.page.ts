import { Component } from '@angular/core';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { DataServiceService } from '../data-service.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage {
    products: any;
    selectedProduct: any;
    productFound: boolean = false;

    constructor(
        private barcodeScanner: BarcodeScanner,
        private toast: Toast,
        public dataService: DataServiceService
    ) {
        console.log('Calling  constructor !!');
        this.dataService.getListDetails().subscribe(response => {
            //console.log(' response in cons : ' + response);
            console.log(' 11111111111 ' + JSON.stringify(response));
            console.log(
                'if cond result' +
                    JSON.stringify(response.find(product => product.plu === '01234567898'))
            );
            this.products = response;
        });
    }

    scan() {
        this.selectedProduct = {};
        console.log('Scanning product !!');
        this.barcodeScanner.scan().then(
            barcodeData => {
                console.log('barcode data : ' + barcodeData.text);
                //this.toast.show(`Selected barcode ` + barcodeData.text, '5000', 'center');
                this.selectedProduct = this.products.find(
                    product => product.plu === barcodeData.text
                );
                // this.toast.show(`Selected product ` + this.selectedProduct.name, '5000', 'center');
                if (this.selectedProduct !== undefined) {
                    this.productFound = true;
                } else {
                    this.productFound = false;
                    this.toast.show(`Product not found`, '5000', 'center').subscribe(toast => {
                        console.log(toast);
                    });
                }
            },
            err => {
                console.log('Err occurred : ' + err);
                this.toast.show(err, '5000', 'center').subscribe(toast => {
                    console.log(toast);
                });
            }
        );
    }
}
