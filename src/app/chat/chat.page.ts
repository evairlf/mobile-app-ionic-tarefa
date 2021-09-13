import { getLocaleTimeFormat } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { HomePage } from '../home/home.page';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild('IonContent', { static: true }) content: IonContent
  paramData: any;
  msgList: any;
  userName: any;
  user_input: string = "";
  User: string = "Me";
  toUser: string = "HealthBot";
  start_typing: any;
  loader: boolean;
  valor : any = HomePage.valor;

  constructor(public activRoute: ActivatedRoute) {
    this.activRoute.params.subscribe((params) => {
      // console.log(params)

      this.paramData = params
      this.userName = params.name
    });
    this.msgList = [
      {
        userId: "HealthBot",
        userName: "HealthBot",
        userAvatar: "../../../assets/chat/Anonimo.png",
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
      }, 500);

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
}

