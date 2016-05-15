import { Component, Input, OnInit } from 'angular2/core';
import {Router, ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import { AppComponent } from './app.component';
import {Info} from "./classes/Info";
import {Message} from "./classes/Message";
import {MessageService} from "./services/message.service";


@Component({
  selector: 'messages',
  templateUrl: 'templates/mensajes.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [MessageService]
})

export class MessagesComponent {

  receivedOption: boolean;
  id: string;
  receivedMessages;
  sendedMessages;
  nonReadMessages:number;

  messagesShowed = [];

  actualMessage;
  actualUserMessage;

  constructor(private _routeParams: RouteParams, private _messageService: MessageService){

  }

  ngOnInit(){
    this.id = this._routeParams.get('id');

    this.updateData();
    this._messageService.getNumNonRead(this.id).subscribe(
          (num => this.nonReadMessages = num),
          (error => alert("Error non read messages"))
      );

    this.receivedOption = true;
    this.updateMessages();



    $("#receivedButton").click();
  }

  updateMessages(){
    if (this.receivedOption){
      this.messagesShowed = this.receivedMessages;
    }
    else{
      this.messagesShowed = this.sendedMessages;
    }
  }

  clickReceived(){
    this.receivedOption = true;
    this.updateMessages();
  }

  clickSended(){
    this.receivedOption = false;
    this.updateMessages();
  }

  clickOnMessage(mes){
    this.actualMessage = mes;
    this.actualUserMessage = mes.message.sender.userName;
    console.log(this.actualUserMessage);
    if(!mes.message.read && mes.message.destiny.equals(Info.userLogged)){
        this.nonReadMessages--;
        this._messageService.setRead(this.id, mes.message);
        //Don't substract if you are de receptor
    }
  }



  sendMessage(userName:string,subject:string ,message:string){
    this._messageService.sendMessage(userName, subject, new Date, message);
    this.updateData();
    this.updateMessages()
  }

  deleteMessage(){
    this._messageService.deleteMessage(this.actualMessage.message);
    this.updateData();
    this.updateMessages()
  }

  updateData(){
    this._messageService.getSendedMessagesById(this.id).subscribe(
        (sendedMessages => this.sendedMessages = sendedMessages),
        (error => alert("error sended messages"))
    );

    this._messageService.getReceivedMessages(this.id).subscribe(
        (receivedMessages => this.receivedMessages = receivedMessages),
        (error => alert("error received messages"))
    );
  }


}
