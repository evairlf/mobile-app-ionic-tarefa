import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonContent } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { format } from 'url';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  lat;
  lng;
  @ViewChild('IonContent', { static: true }) content: IonContent
  paramData: any;
  msgList: any;
  userName: any;
  user_input: string = "";
  User: string = "Me";
  toUser: string = "HealthBot";
  start_typing: any;
  loader: boolean;
  clickedImage: any = null;
  mensagem: boolean = true;
  vare : string = "Denúncias";
  constructor(public activRoute: ActivatedRoute, private geo: Geolocation, private camera: Camera) {
    this.activRoute.params.subscribe((params) => {
      // console.log(params)
      
      this.paramData = params
      this.userName = params.name
    });
    this.msgList = [
      {
        userId: "Me",
        userName: "Me",
        userAvatar: "../../../assets/chat/hUopdv01.png",
        time: Date(),
        message: "Olá, aqui voce pode fazer sua denuncia sem ser identificado",
        id: 0
      }
    ];
  }

  ngOnInit() {
  }
  sendMsg() {
    if (this.user_input !== '') {
      this.msgList.push({
        userId: this.toUser,
        userName: this.toUser,
        userAvatar: this.paramData.image ? this.paramData.image : "../../../assets/chat/Anonimo.png",
        time: Date(),
        message: this.user_input,
        id: this.msgList.length + 1
      })
      this.user_input = "";
      this.scrollDown()
      setTimeout(() => {
        this.senderSends()
      }, 10000000);

    }
  }
  senderSends() {
    this.loader = true;
    setTimeout(() => {
      this.msgList.push({
        userId: this.User,
        userName: this.User,
        userAvatar: "../../../assets/chat/Anonimo.png",
        time: Date(),
        message: "Muito obrigado pela sua denuncia, Iremos investigar"
      });
      this.loader = false;
      this.scrollDown()
    }, 2000)
    this.scrollDown()
  }
  scrollDown() {
    setTimeout(() => {
      this.content.scrollToBottom(50)
    }, 50);
  }

  userTyping(event: any) {
    // console.log(event);
    this.start_typing = event.target.value;
    this.scrollDown()
  }

  whereIam(){
    this.geo.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: true
    }).then((res)=>{
      this.lat = res.coords.latitude;
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
     this.sendMsg();
    }, (err) => {
     // Handle error
     alert('sem camera no pc');
    });
  }
  
}

