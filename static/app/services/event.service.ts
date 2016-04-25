import { eventList } from '../classes/memoryDB';
import { Injectable } from 'angular2/core';
import { Event } from '../classes/Event'
import { withObserver } from '../classes/Utils';
import {User} from "../classes/User";


@Injectable()
export class EventService {

    getAllEvent (){
        var result = [];
        for (let i = 0; i < eventList.length; i++){
            result.push({"eventID":i, "eventObj": eventList[i]});
        }

        return withObserver (result);
    }
    
    getEventByID (id){
        return withObserver (eventList[id]);
    }

    getNumberOfFollowers(id){
        return withObserver (eventList[id].followers.length);
    }
    
    getFollowers (id){
        var result = [];
        var users:User[] = eventList[id].followers;
        for(let i = 0; i < users.length; i++){
            result.push({"id":i, "user":users[i]});
        }


        return withObserver(result);
    }

    getEventsByName (name:String){
        var events = [];
        for (let i = 0; i < eventList.length; i++){
            if (eventList[i].name == name){
                events.push({'id':i, 'eventObj':eventList[i]});
            }
        }
        return withObserver(events);
    }

    getEventsByBandName (name:String){
        var result = [];

        for (let i = 0; i < eventList.length; i++){
            var list = eventList[i].bands;
            for(let j = 0; j < list.length; j++){
                if(name == list[j].groupName){
                    result.push({"id": i, "eventObj":eventList[i]});
                }
            }
        }
        return withObserver(result);
    }
}
