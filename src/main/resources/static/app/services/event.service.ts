import {eventList, userList} from '../classes/memoryDB';
import { Injectable } from 'angular2/core';
import { Event } from '../classes/Event'
import { withObserver } from '../classes/Utils';
import {User} from "../classes/User";
import {Info} from "../classes/Info";

import {Http, Response} from "angular2/http";


@Injectable()
export class EventService {

    constructor(private http: Http){}

    getAllEvent (){
        var url = "/events";
        return (this.http.get(url).map(
            result => this.deserializeAllEvents(result)
        ))
    }

    deserializeAllEvents (response:Response) {
        console.log("Aca tienes los eventos");
        console.log("Response ->");
        console.log(response);
        let result = []
        response.json().map(
            obj => {
//              var event = {"eventId":obj.id, "eventObj": obj}
                result.push(obj)
            }
        )
        console.log("Result ->");
        console.log(result);
        return result;
    }
    
    getEventByID (id){
        let url = "/event/" + id;
        return this.http.get(url).map(
            result => result.json()
        )
    }

    getNumberOfFollowers(id){
        // TODO
        return withObserver (eventList[id].followers.length);
    }
    
    getFollowers (id){
        // TODO
        var result = [];
        var users:User[] = eventList[id].followers;
        for(let i = 0; i < users.length; i++){
            result.push({"id":i, "user":users[i]});
        }
        return withObserver(result);
    }

    getEventsByName (name:String){
        let url = "/events/name:" + name;
        return this.http.get(url).map(
            result => result.json()
        )
    }

    getEventsByBandName (name:String){
        let url = "/events/bandName:" + name;
        return this.http.get(url).map(
            result => result.json()
        )
    }

    getIsFollower (id){
        // TODO
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
        // TODO
        for(let i = 0; i < eventList[id].followers.length; i++){
            if(eventList[id].followers[i].equals(Info.userLogged)){
                eventList[id].followers.splice(i, 1);
            }
        }
        console.log(eventList[id].followers);
    }
    
    follow (id){
        // TODO
        eventList[id].followers.push(Info.userLogged);
    }

    getEventsByUserId(id){
        let url = "/events/userId:" + id;
        return this.http.get(url).map(
            result => result.json()
        )
    }
    
    addNewEvent(name, date, direction, description){
        // TODO
        var user = Info.userLogged;
        var newEvent = new Event (name, date, user, description, [], direction, [user]);
        user.events.push(null);
        eventList.push(null);
    }

}
