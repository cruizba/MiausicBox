/**
 * Service of MiausicBox events for petitions to Api Rest
 * @class EventService
 */
import { eventList } from '../classes/memoryDB'; // <--- FixMe: To Be Removed

import { Event } from '../classes/Event'
import { User } from "../classes/User";
import { Info } from "../classes/Info";

import { Injectable } from 'angular2/core';

import { Http, Headers, RequestOptions } from "angular2/http";
import { withObserver, emptyEvent, toInstance, emptyUser, emptyBand } from '../classes/Utils';
import {Band} from "../classes/Band";
import 'rxjs/Rx';

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
    let url = "/eventNumFollow/" + id

    return this.http.get(url).map(
        result => result.json()
    )
  }


    
  getFollowers (id){
    let url = "getFollowersEvent/" + id;
    return this.http.get(url).map(
        result => this.deserializeUsers(result.json())
    )
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

  getAllBands(id){
    let url = "/events/allBands"+id;
    return this.http.get(url).map(
        result => this.deserializeBands(result.json())
    )
  }

  getIsFollower (ev, id){
    let url = "/artist/" + id + "/isFollowerEvent/" + ev
    return this.http.get(url).map(
        result => result.json()
    )
  }

  getEventsByUserId(id){
    let url = "/events/userId:" + id;
    return this.http.get(url).map(
        result => this.deserializeAllEvents(result.json())
    )
  }

  /* Http POSTs */


    
  unFollowFollow (ev, id){
    let body = "";

    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});

    return this.http.post("/event/"+ ev + "/toFollow/" + id, body, options).map(
        results => results.json()
    );
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

  addNewBand(name, id){
    let body = "";
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});
    return this.http.post('/event/'+id+'/newBand/'+name, body, options);
  }


  setCity(city, id){
    let body = city;

    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});

    return this.http.put('/editCityEvent/' + id , body, options);
  }

  setFecha (date, id){
    let body = date;
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});

    return this.http.put('/editDateEvent/'+id, body, options);

  }


  /* Deserialize Methods (Event List) */
  deserializeAllEvents(json) {
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
    event.creator = toInstance (emptyUser(), json.creator);
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
    event.creator = toInstance(emptyUser(), json.creator);
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
