import { eventList } from '../classes/memoryDB';
import { Injectable } from 'angular2/core';
import { Event } from '../classes/Event'
import { withObserver } from '../classes/Utils';
import {User} from "../classes/User";
import {Info} from "../classes/Info";


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

    getIsFollower (id){
        var isFollower = false;
        var followers = eventList[id].followers;
        for (let i = 0; i < followers.length; i++) {
            if (Info.userLogged.equals(followers[i])) {
                isFollower = true;
            }
        }
        return withObserver(isFollower);
    }
    
    unFollow (id){
        
        for(let i = 0; i < eventList[id].followers.length; i++){
            if(eventList[id].followers[i].equals(Info.userLogged)){
                eventList[id].followers.splice(i, 1);
            }
        }
        console.log(eventList[id].followers);
    }
    
    follow (id){
        eventList[id].followers.push(Info.userLogged);
    }
    
    getIsCreator(id){
        var isCreator = false;
        if (eventList[id].creator.equals(Info.userLogged)){
            isCreator = true;
        }
        return withObserver (isCreator);
    }
}
