import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppModelService {

  private imageReport: any;
  private imageName: any;

  constructor() { }

  set imageAnalysisReport(imageReport: any) {
    this.imageReport = imageReport;
  }
  get imageAnalysisReport() {
    return this.imageReport;
  }

  set imgName(imageName: any) {
    this.imageName = imageName;
  }

  get imgName() {
    return this.imageName;
  }
}
