import { Component } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
//import { Toast } from '@ionic-native/toast/ngx';
import { HttpApiService } from '../http-api.service';
import { AppModelService } from '../app-model.service';

@Component({
    selector: 'app-processimage',
    templateUrl: 'processimage.page.html',
    styleUrls: ['processimage.page.scss']
})
export class ProcessImage {
    products: any;
    imageDescription: any;
    found: boolean = false;
    apikey: String = 'AIzaSyCd9SNJY2Y_DP-XwKKilOal5Zia_G0MFtE';
    current_image = '../../assets/images/happy.jpg';

    constructor(
        private camera: Camera,
        public httpApiService: HttpApiService,
        public appModelService: AppModelService
    ) {
        console.log('Calling  constructor !!');
    }

    captureImage() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        console.log('Calling capture image');
        this.camera.getPicture(options).then(
            imageData => {
                console.log('image data :' + imageData);
                // imageData is either a base64 encoded string or a file URI
                // If it's base64 (DATA_URL):
                let base64Image = 'data:image/jpeg;base64,' + imageData;
                this.current_image = base64Image;
                console.log('Current_image : ' + this.current_image);
                //var file_contents = JSON.stringify(vision_api_json);
                let body = {
                    "image" : base64Image
                }
                var url =
                    'http://localhost:3000/identifyIngredient';

                this.httpApiService.postImage(url, body).subscribe((res: any) => {
                    if (res.hasOwnProperty('type') && res.type.toLowerCase() === 'error') {
                        console.log(
                            'API throwing an error, please check request object or network connection.'
                        );
                    } else {
                        console.log('res ==>', res);
                        alert('Got response from Google API');
                        this.found = true;
                        this.imageDescription = res;
                        //this.appModelService.imageAnalysisReport = res;
                        //this.router.navigate(['/img-details'], { skipLocationChange: true });
                    }
                });
            },
            err => {
                console.log('err :' + err);
            }
        );
    }
}
