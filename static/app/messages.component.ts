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
    )

    this.receivedOption = true;
    this.updateMessages();
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




}
