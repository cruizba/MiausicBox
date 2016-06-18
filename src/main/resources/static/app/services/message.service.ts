/**
 * Service of MiausicBox messages users for petitions to Api Rest
 * @class MessageService
 */
import { messageList, userList } from "../classes/memoryDB" // <--- FixMe: To Be Removed

import { Message } from "../classes/Message";
import { Info } from "../classes/Info";
import { User } from "../classes/User";

import { Injectable } from "angular2/core";
import { Http, Response } from "angular2/http";

@Injectable()
export class MessageService{

    /* Constructor */
    constructor(private http:Http) {}

    /* Http GETs */
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

    /* Http POSTs */
    setRead(id, message){
        // TODO
        for(let i = 0; i < messageList.length; i++){
            if(message.equals(messageList[i])){
                messageList[i].read = true;
            }
        }
        console.log("Changed");
    }

    sendMessage(userName:string, subject: string, day:Date, message: string){
        // TODO
        for(let i = 0; i < userList.length; i++){
            if(userName == userList[i].userName){
                messageList.push(new Message(0, Info.userLogged, userList[i], subject, message, day, false)); // <-- FixMe: ID
                console.log("Mensaje enviado");
                break;
            }
        }
    }
    
    deleteMessage(message: Message){
        // TODO
        for(let i = 0; i < messageList.length; i++){
            if(message.equals(messageList[i])){
                messageList.splice(i, 1);
                break;
            }
        }
    }

    /* Deserialize Methods */
    deserializeAllMessages(response:Response) {
        console.log("deserealizeAllMessages > Response:");
        console.log(response);
        let result = [];
        response.json().map(
            obj => {
                let mes:Message = obj;
                mes.date = new Date(obj.date);
                mes.destiny = new User(0, obj.destiny.userName,"",obj.destiny.completeName,obj.destiny.email,"",false,"","","","",[],[],[],[]); // <-- FixMe: ID
                mes.sender = new User(0, obj.sender.userName,"",obj.sender.completeName,obj.sender.email,"",false,"","","","",[],[],[],[]); // <-- FixMe: ID
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
        mes.destiny = new User(0, body.destiny.userName,"",body.destiny.completeName,body.destiny.email,"",false,"","","","",[],[],[],[]); // <-- FixMe: ID
        mes.sender = new User(0, body.sender.userName,"",body.sender.completeName,body.sender.email,"",false,"","","","",[],[],[],[]); // <-- FixMe: ID
        var total = {"msgId":body.id,"message":mes};
        return total;
    }

}
