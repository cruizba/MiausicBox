import {Injectable} from "angular2/core";
import {messageList, userList} from "../classes/memoryDB"
import {Message} from "../classes/Message";
import {Info} from "../classes/Info";
import {Http, Response} from "angular2/http";
import {User} from "../classes/User";


@Injectable()
export class MessageService{

    constructor(private http:Http) {}

    setRead(id, message){
        for(let i = 0; i < messageList.length; i++){
            if(message.equals(messageList[i])){
                messageList[i].read = true;
            }
        }
        console.log("Changed");
    }

    getSendedMessagesById(id){
        let url = "/artist/" + id + "/sendedMessages";
        return this.http.get(url).map(
            response => this.deserializeAllMessages(response)
        );
    }

    getReceivedMessages(id){
        let url = "/artist/" + id + "/receivedMessages";
        return this.http.get(url).map(
            response => this.deserializeAllMessages(response)
        );
    }

    getNumNonRead(id){
        let url = "/artist/" + id + "/numNoRead"
        return this.http.get(url).map(
            response => response.json()
        )
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

    // Desserialization methods
    deserializeAllMessages(response:Response) {
        console.log("deserealizeAllMessages > Response:");
        console.log(response);
        let result = [];
        response.json().map(
            obj => {
                let mes:Message = obj;
                mes.date = new Date(obj.date);
                mes.destiny = new User(obj.destiny.userName,"",obj.destiny.completeName,obj.destiny.email,"",false,"","","","",[],[],[],[]);
                mes.sender = new User(obj.sender.userName,"",obj.sender.completeName,obj.sender.email,"",false,"","","","",[],[],[],[]);
                var total = {"msgId":obj.id,"message":mes};
                result.push(total);
            }
        );
        console.log("deserealizeAllMessages > Result:");
        console.log(result);
        return result;
    }

    deserializeMessage(response:Response){
        let body = response.json();
        let mes:Message = body;
        mes.date = new Date(body.date);
        mes.destiny = new User(body.destiny.userName,"",body.destiny.completeName,body.destiny.email,"",false,"","","","",[],[],[],[]);
        mes.sender = new User(body.sender.userName,"",body.sender.completeName,body.sender.email,"",false,"","","","",[],[],[],[]);
        var total = {"msgId":body.id,"message":mes};
        return total;
    }

}
