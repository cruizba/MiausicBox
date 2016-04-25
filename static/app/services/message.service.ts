import {Injectable} from "angular2/core";
import {messageList, userList} from "../classes/memoryDB"
import {User} from "../classes/User";
import {withObserver} from "../classes/Utils";
import {Message} from "../classes/Message";
import {Info} from "../classes/Info";


@Injectable()
export class MessageService{
    
    getNumNonRead(id){
        var num:number = 0;
        for(let i = 0; i < messageList.length; i++){
            var message = messageList[i];
            if(message.destiny.equals(userList[id]) && !message.read){
                num++;
            }
        }
        return withObserver(num);
    }

    setRead(id, message){
        for(let i = 0; i < messageList.length; i++){
            if(message.equals(messageList[i])){
                messageList[i].read = true;
            }
        }
        console.log("Changed");
    }

    getSendedMessagesById(id){
        var messages = [];
        for(let i=0; i< messageList.length; i++){
            var message = messageList[i];
            if(message.sender.equals(userList[id])) {
                messages.push({"id": userList.indexOf(message.destiny), "message": messageList[i]})
            }
        }
        return withObserver(messages);
    }

    getReceivedMessages(id){
        var messages = [];
        for(let i = 0; i< messageList.length; i++){
            var message = messageList[i];
            if(message.destiny.equals(userList[id])){
                messages.push({"id": userList.indexOf(message.destiny), "message": messageList[i]})
            }
        }
        return withObserver(messages);
    }

    sendMessage(userName:string, subject: string, day:Date, message: string){
        for(let i = 0; i < userList.length; i++){
            if(userName == userList[i].userName){
                messageList.push(new Message(Info.userLogged, userList[i], subject, message, day, false));
                console.log("Mensaje enviado");
                break;
            }
        }
    }
    
    deleteMessage(message: Message){
        for(let i = 0; i < messageList.length; i++){
            if(message.equals(messageList[i])){
                messageList.splice(i, 1);
                break;
            }
        }
    }

}
