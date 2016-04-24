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

  constructor(private _routeParams: RouteParams, private _messageService: MessageService){

  }

  ngOnInit(){
    this.id = this._routeParams.get('id');
    
    this._messageService.getSendedMessagesById(this.id).subscribe(
        (sendedMessages => this.sendedMessages = sendedMessages),
        (error => alert("error sended messages"))
    );

    this._messageService.getReceivedMessages(this.id).subscribe(
        (receivedMessages => this.receivedMessages = receivedMessages),
        (error => alert("error received messages"))
    );
    this._messageService.getNumNonRead(this.id).subscribe(
          (num => this.nonReadMessages = num),
          (error => alert("Error non read messages"))
      );

    this.receivedOption = true;
    this.updateMessages();

    if(this.messagesShowed.length > 0){
      this.actualMessage = this.messagesShowed[0];
    }

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
    if(!mes.message.read && mes.message.destiny.equals(Info.userLogged)){
        this.nonReadMessages--;
        this._messageService.setRead(this.id, mes.message);
        //Don't substract if you are de receptor
    }
  }

}
