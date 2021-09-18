import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage {
  lat: any;
  lng: any;
  clickedImage: any;
  constructor( private geo: Geolocation, private camera: Camera) { }

  ngOnInit() {
   
  }

  
  
  ionViewDidLoad(){
    this.geo.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: true
    }).then((res)=>{
      this.lat = res.coords.latitude
      this.lng = res.coords.longitude;
    }).catch((e)=>{
      console.log(e);
    })
  }
  
  whereIam(){
    this.geo.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: true
    }).then((res)=>{
      this.lat = res.coords.latitude
      this.lng = res.coords.longitude;
    }).catch((e)=>{
      console.log(e);
    })
  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.clickedImage = base64Image;
    }, (err) => {
     // Handle error
     alert('sem camera no pc');
    });
  }
    
}
