import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage {
  lat: any;
  lng: any;
  constructor( private geo: Geolocation) { }

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


}
