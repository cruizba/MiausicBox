/**
 * Service of MiausicBox events for petitions to Api Rest
 * @class EventService
 */
import { eventList } from '../classes/memoryDB'; // <--- FixMe: To Be Removed

import { Event } from '../classes/Event'
import { User } from "../classes/User";
import { Info } from "../classes/Info";

import { Injectable } from 'angular2/core';

import { Http, Response, Headers, RequestOptions } from "angular2/http";
import { withObserver, emptyEvent, toInstance, emptyUser, emptyBand } from '../classes/Utils';
import {Band} from "../classes/Band";
import 'rxjs/Rx';se

@Injectable()
export class EventService {

  /* Constructor */
  constructor(private http: Http){}

  /* Http GETs */
  getAllEvents (){
    var url = "/events";
    return this.http.get(url).map(
      result => this.deserializeAllEvents(result.json())
    )
  }
    
  getEventByID (id){
    let url = "/event/" + id;
    console.log("Hacemos peticion a" + url);
    return this.http.get(url).map(
      result => this.deserializeEvent(result.json())
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
      result => this.deserializeAllEvents(result.json())
    )
  }

  getEventsByBandName (name:String){
    let url = "/events/bandName:" + name;
    return this.http.get(url).map(
      result => this.deserializeAllEvents(result.json())
    )
  }

  /* Http POSTs */
  getIsFollower (id){
    // TODO
    /*
    var isFollower = false;
    var followers = eventList[id].followers;
    for (let i = 0; i < followers.length; i++) {
        if (Info.userLogged.equals(followers[i])) {
            isFollower = true;
        }
    }
    return withObserver(isFollower);*/
  }
    
  unFollow (id){
    // TODO
    /*
    for(let i = 0; i < eventList[id].followers.length; i++){
        if(eventList[id].followers[i].equals(Info.userLogged)){
            eventList[id].followers.splice(i, 1);
        }
    }
    console.log(eventList[id].followers);*/
  }

  follow (id){
    // TODO
    /*
    eventList[id].followers.push(Info.userLogged);
    */
  }

  getEventsByUserId(id){
    let url = "/events/userId:" + id;
    return this.http.get(url).map(
        result => this.deserializeAllEvents(result.json())
    )
  }

  addNewEvent(name, date, direction, description){
    let body = '{ "name": "' + name +
        '", "date": "' + date +
        '", "direction": "' + direction +
        '", "description": "' + description +
        '"}';

    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});

    return this.http.post('/newEvent/' + Info.userId , body, options);
  }



  /* Deserialize Methods (Event List) */
  deserializeAllEvents (json) {
    /* parse each band in json */
    let events:Event[] = [];
    json.map(
      obj => {
        let event:Event = this.deserializeBasicEvent(obj);
        events.push(event);
      }
    );
    return events;
  }

  deserializeBasicEvent(json) {
    let event:Event = toInstance(emptyEvent(), json);
    //noinspection TypeScriptValidateTypes
    event.date = new Date(json.date);
    event.bands = this.deserializeBasicBands(json.bands);
    return event;
  }

  deserializeBasicBands (json) {
    /* parse each band in json */
    let bands:Band[] = [];
    json.map(
      obj => {
        bands.push(toInstance(emptyBand(),obj));
      }
    );
    return bands;
  }



  /* Deserialize Methods (Event) */
  deserializeEvent(json) {
    let event:Event = toInstance(emptyEvent(), json);
    //noinspection TypeScriptValidateTypes
    event.date = new Date(json.date);
    event.creator = toInstance(emptyUser(), json);
    event.followers = this.deserializeUsers(json.followers);
    event.bands = this.deserializeBands(json.bands);
    return event;
  }

  deserializeBands (json) {
    /* parse each band in json */
    let bands:Band[] = [];
    json.map(
      obj => {
        let band:Band = toInstance(emptyBand(), obj);
        band.members = this.deserializeUsers(obj.members);
        bands.push(band);
      }
    );
    return bands;
  }

  deserializeUsers(json){
    /* parse a list of users in json */
    let users:User[] = [];
    json.map(
      obj => {
        users.push(toInstance(emptyUser(), obj));
      }
    );
    return users;
  }

}
