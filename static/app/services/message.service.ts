import {Injectable} from "angular2/core";
import {messageList, userList} from "../classes/memoryDB"
import {User} from "../classes/User";
import {withObserver} from "../classes/Utils";


@Injectable()
export class MessageService{

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
