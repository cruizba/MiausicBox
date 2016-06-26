/**
 * MiausicBox messages component.
 * @component MessagesComponent
 */
import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteParams } from 'angular2/router';
import { Info } from "./classes/Info";
import { Message } from "./classes/Message";
import { MessageService } from "./services/message.service";

@Component({
  selector: 'messages',
  templateUrl: 'templates/mensajes.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [MessageService]
})

export class MessagesComponent {

  receivedOption: boolean;
  id: string;
  receivedMessages:Message[];
  sendedMessages:Message[];
  nonReadMessages:number;

  messagesShowed = [];

  actualMessage;
  actualUserMessage;

  constructor(private _routeParams: RouteParams, private _messageService: MessageService){}

  ngOnInit(){
    this.id = this._routeParams.get('id');
    this.receivedOption = true;
    this.updateData();
    $("#receivedButton").click();
  }

  updateMessages(){
    if (this.receivedOption) {
      this.messagesShowed = this.receivedMessages;
    } else {
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
        this.id = mes.message.id;
        this._messageService.setRead(this.id).subscribe(
            response => {
              this.updateData();
            },
            error => console.log("Error al enviar")
        )
    }
  }

  sendMessage(userName:string,subject:string ,message:string){
    this._messageService.sendMessage(userName, subject, new Date, message).subscribe(
        response => {
          this.updateData();
          this.updateMessages();
        },
        error => alert('Error al enviar el mensaje')
    );
  }

  deleteMessage(){
    this._messageService.deleteMessage(this.actualMessage.message).subscribe(
        response => {
            this.updateData();
            this.updateMessages()
        },
        error => {
            alert('Error al borrar el mensaje');
            console.log(this.actualMessage.message);
        }
    );
  }

  updateData(){
    this._messageService.getSendedMessagesById(Info.userId).subscribe(
        sendedMessages => {
          this.sendedMessages = sendedMessages;
          this.updateMessages();
        },
        error => alert("error sended messages")
    );
    this._messageService.getNumNonRead(Info.userId).subscribe(
        num => this.nonReadMessages = num
    );
    this._messageService.getReceivedMessages(Info.userId).subscribe(
        receivedMessages => {
          this.receivedMessages = receivedMessages;
          this.updateMessages();
          console.log(this.receivedMessages);
        },
        error => alert("error received messages")
    );
  }

}
