/**
 * Service of MiausicBox messages users for petitions to Api Rest
 * @class MessageService
 */
import { messageList, userList } from "../classes/memoryDB" // <--- FixMe: To Be Removed

import { Message } from "../classes/Message";
import { Info } from "../classes/Info";
import { User } from "../classes/User";

import { Injectable } from "angular2/core";
import {Http, Response, Headers, RequestOptions} from "angular2/http";

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
    setRead(id){
        let body = "";

        let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        let options = new RequestOptions({headers});

        return this.http.put('/message/setRead/' + id , body, options);
    }

    sendMessage(userName:string, subject: string, day:Date, message: string){
        let body = '{' +
            '"subject":"' + subject + '",' +
            '"date":"' + day + '",' +
            '"message":"' + message + '"' +
            '}';

        let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        let options = new RequestOptions({headers});

        return this.http.post('/message/sendMesFrom/' + Info.userId + '/to/' + userName, body, options);
    }
    
    deleteMessage(message: Message){
        let body = ""

        let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        let options = new RequestOptions({headers});

        return this.http.post('/message/deleteMessage/' + message.id , body, options);
    }

    /* Deserialize Methods */
    deserializeAllMessages(response:Response) {
        console.log("deserealizeAllMessages > Response:");
        console.log(response);
        let result = [];
        response.json().map(
            obj => {
                let mes:Message = obj;
                //noinspection TypeScriptValidateTypes
                mes.date = new Date(obj.date);
                mes.destiny = new User(0, obj.destiny.userName,"",obj.destiny.completeName,obj.destiny.email,"",false,"","","","",obj.destiny.image,[],[],[],[]); // <-- FixMe: ID
                mes.sender = new User(0, obj.sender.userName,"",obj.sender.completeName,obj.sender.email,"",false,"","","","",obj.sender.image,[],[],[],[]); // <-- FixMe: ID
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
        //noinspection TypeScriptValidateTypes
        mes.date = new Date(body.date);
        mes.destiny = new User(0, body.destiny.userName,"",body.destiny.completeName,body.destiny.email,"",false,"","","","","",[],[],[],[]); // <-- FixMe: ID
        mes.sender = new User(0, body.sender.userName,"",body.sender.completeName,body.sender.email,"",false,"","","","","",[],[],[],[]); // <-- FixMe: ID
        var total = {"msgId":body.id,"message":mes};
        return total;
    }

}
