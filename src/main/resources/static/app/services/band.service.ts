/**
 * Service of MiausicBox bands for petitions to Api Rest
 * @class BandService
 */
import { bandList, userList } from '../classes/memoryDB'; // <--- FixMe: To Be Removed

import { Band } from "../classes/Band";
import { BlogBand } from "../classes/BlogBand";
import { Info } from "../classes/Info";
import { Track } from "../classes/Track";
import { User } from "../classes/User";
import { Event } from "../classes/Event";

import { Injectable } from 'angular2/core';

import {Http, Response, RequestOptions, Headers} from "angular2/http";
import {withObserver, toInstance, emptyBand, emptyUser, emptyEvent, emptyBlogBand} from '../classes/Utils';

import 'rxjs/Rx';

@Injectable()
export class BandService {

  /* Constructor */
  constructor (private http:Http){}

  /* Http GETs */
  getAllBands (){
    var url = "/bands";
    return this.http.get(url).map(
      response => this.deserializeAllBands(response.json())
    )
  }
  
  getBandByName(name){
    var url= "/bands/name:" + name;
    return this.http.get(url).map(
      response => this.deserializeAllBands(response.json())
    )
  }

  getBandById (id){
    let url = "/band/"+id;
    console.log("Hacemos petciccion a " + url);
    return this.http.get(url).map(
      response => this.deserializeBand(response.json())
    )
  }

  getEventByBandById (id){
    let url = "/band/"+id+"/events";
    return this.http.get(url).map(
      response => this.deserializeEvents(response.json())
    )
  }

  // FixMe: move this method to blog.service.ts
  getBlogsByBand(id) {
    let url = "/band/"+id+"/bandblog";
    return this.http.get(url).map(
      response => this.deserializableAllBlogs(response.json())
    );
  }

  getIsFollower (ba,us){
    let url = "/band/"+ba+"/followedby/" + us;
    return this.http.get(url).map (
      response => response
    )
  }

  addFollowBand(ba,us){
    let url = "/band/" + ba + "/tofollow/" + us;
    return this.http.get(url).map(
      response => response
    )
  }

  getMembers (id){
    let url = "/band/" + id + "/members";
    return this.http.get(url).map(
        response => this.deserializeUsers(response)
    )
  }

  getBandsByUserId(id){
    // TODO
    var result = [];
    for (let i = 0; i < bandList.length; i++){
      var list = bandList[i].followers;
      for (let j = 0; j <list.length; j++){
        if(id == userList.indexOf(list[j])){
          result.push({"bandId":i, "bandObj":bandList[i]});
        }
      }
    }
    return withObserver(result);
  }

  getBandsByUsers(user){

    let url = "/artist/" + user.getId() + "/mybands";
    return this.http.get(url).map(
        response => this.deserializableBands(response)
    );

  }

  /* Http POSTs */
  addNewBand(user, nameBand, description){
    // var newBand = new Band(0, user, nameBand, description, "", "", "", "", "", [user], [user], [], []); // <-- FixMe: ID

    let body = '{"groupName": "' + nameBand +
            '", "description": "'+ description +
            '", "city": " " ,'+
            '"facebook": " ",'+
            '"twitter": " ",'+
            '"youtube": " ",'+
            '"members": "'+ [] +
            '", "followers": "'+ [] +
            '", "genres": "'+ [] +
            '", "tracks": "'+[]+
        '"}';
    let headers = new Headers ({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});

    return this.http.post('newBand/'+user.id, body, options);
  }


  addNewMember (name, id){

    // TODO
    var mem = bandList[id].members;
    var encontrado = false;
    for(let i = 0; i <mem.length; i++){
      if (name == mem[i].userName){
        encontrado = true;
        break;
      }
    }

    if(encontrado){
      alert("El usuario ya esta en la banda");
    } else {
      for (let j = 0; j < userList.length;j++){
        if( name == userList[j].userName){
          var newMem=userList[j];
        }
      }
    }
    bandList[id].members.push(newMem);
  }

  addNewTrack(name, band, link, id){
    //img="../img/img6.jpg"; // <--- FixMe?

    let body = '{ "name": "' + name +
        '", "band": "' + band +
        '", "link": "' + link +
        '", "author":null' +
        '}';
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});

    return this.http.post('/band/' + id + '/newtrack', body, options);
  }


  
  /* Deserialize Methods (Band List) */
  deserializeAllBands (json) {
    /* parse each band in json */
    let bands:Band[] = [];
    json.map(
      obj => {
        bands.push(this.deserializeBasicBand(obj));
      }
    );
    return bands;
  }

  deserializeBasicBand(json) {
    /* get band instance from response */
    let band:Band = toInstance(emptyBand(), json);
    band.members = this.deserializeUsers(json.members);
    return band;
  }



  /* Deserialize Methods (Band) */
  deserializeBand(json) {
    /* get band instance from response */
    let band:Band = toInstance(emptyBand(), json);
    band.administrador = toInstance(emptyUser(), json.administrador);
    band.members = this.deserializeUsers(json.members);
    band.followers = this.deserializeUsers(json.followers);
    return band;
  }

  deserializeEvents(json){
    /* parse each event in json */
    let events:Event[] = [];
    json.map(
      obj => {
        events.push(toInstance(emptyEvent(), obj));
      }
    );
    return events;
  }

  // FixMe: move this method to blog.service.ts
  deserializableAllBlogs(json){
    /* parse each blog in json */
    let blogs:BlogBand[] = [];
    json.map(
      obj => {
        let blogBand:BlogBand = toInstance(emptyBlogBand(), obj);
        blogBand.date = new Date (obj.date);
        blogs.push(blogBand)
      }
    );
    blogs.sort(function(a,b) {
      return new Date(b.date.toString()).valueOf() - new Date(a.date.toString()).valueOf();
    });
    return blogs;
  }

  deserializeUsers(json){
    /* parse list of users in json */
    let users:User[] = [];
    json.map(
      obj => {
        users.push(toInstance(emptyUser(), obj));
      }
    );
    return users;
  }

  deserializableBands (response:Response){
    let result:Band[]=[];
    response.json().map(
        obj => result = obj
    );
    return result;
  }
}


