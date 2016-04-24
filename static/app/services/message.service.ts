import {Injectable} from "angular2/core";
import {messageList, userList} from "../classes/memoryDB"
import {User} from "../classes/User";
import {withObserver} from "../classes/Utils";


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
        console.log(messages);
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
        console.log(messages);
        return withObserver(messages);
    }
}
