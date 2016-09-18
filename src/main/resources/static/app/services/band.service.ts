/**
 * Service of MiausicBox bands for petitions to Api Rest
 * @class BandService
 */
import { bandList, userList } from '../classes/memoryDB'; // <--- FixMe: To Be Removed

import { Band } from "../classes/Band";
import { BlogBand } from "../classes/BlogBand";
import { User } from "../classes/User";
import { Event } from "../classes/Event";
import { Info } from "../classes/Info";

import {Genre} from "../classes/Genre";

import { Injectable } from '@angular/core';

import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {withObserver, toInstance, emptyBand, emptyUser, emptyEvent, emptyBlogBand} from '../classes/Utils';

import 'rxjs/Rx';

@Injectable()
export class BandService {

  /* Constructor */
  constructor (private http:Http){}

  /* Http GETs */
  getAllBands (){
    var url =  Info.host + "/bands";
    return this.http.get(url).map(
      response => this.deserializeAllBands(response.json())
    )
  }

  getBandByName(name){
    var url=  Info.host +  "/bands/name:" + name;
    return this.http.get(url).map(
      response => this.deserializeAllBands(response.json())
    )
  }

  getBandById (id){
    let url = Info.host +  "/band/"+id;
    console.log("Hacemos petciccion a " + url);
    return this.http.get(url).map(
      response => this.deserializeBand(response.json())
    )
  }

  getEventByBandById (id){
    let url =  Info.host + "/band/"+id+"/events";
    return this.http.get(url).map(
      response => this.deserializeEvents(response.json())
    )
  }

  // FixMe: move this method to blog.service.ts
  getBlogsByBand(id) {
    let url =  Info.host + "/band/"+id+"/bandblog";
    return this.http.get(url).map(
      response => this.deserializableAllBlogs(response.json())
    );
  }

  getIsFollower (ba,us){
    let url =  Info.host + "/band/" + ba + "/isFollowedBy/" + us;
    return this.http.get(url).map (
      response => response.json()
    )
  }

  getNumFollows(ba){
    let url =  Info.host + "/getNumFollowsBand/" + ba;
    return this.http.get(url).map(
        response => response.json()
    )
  }

  getMembers (id){
    let url =  Info.host + "/band/" + id + "/members";
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
    let url =  Info.host + "/artist/" + user.getId() + "/mybands";
    return this.http.get(url).map(
        response => this.deserializableBands(response)
    );

  }

  /* Http POSTs */

  FollowUnfollowBand(ba,us){

    let body = "";

    let headers = new Headers ({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});

    return this.http.post( Info.host + "/band/" + ba + "/tofollow/" + us, body, options).map(
        response => response.json()
    );
  }

  addNewBand(user, nameBand, description){

    let body = '{"groupName": "' + nameBand +
                '", "description": "'+ description +
                '"}';
    let headers = new Headers ({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});

    return this.http.post( Info.host + '/newBand/'+user.id, body, options);
  }


  addNewMember(userName, date, id){
    let body = date;
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});
    return this.http.post(Info.host +  '/band/' + id + '/newmember/' + userName, body, options);

  }

  addNewTrack(name, band, link, id){
    let body = '{ "name": "' + name +
        '", "band": "' + band +
        '", "link": "' + link +
        '", "author":null' +
        '}';
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});
    return this.http.post( Info.host + '/band/' + id + '/newtrack', body, options);
  }

  /* Http DELETEs */
  removeTrack(bandId,trackId){
    let url =  Info.host + "/band/" + bandId + "/removetrack/" + trackId;
    return this.http.delete(url);
  }

  removeMember(bandId,memberId){
    let url =  Info.host + "/band/" + bandId + "/removemember/" + memberId;
    return this.http.delete(url);
  }

  addGenre(genre:Genre){
    let body = '{ "name": "' + genre.name + '"}';
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});
    return this.http.put( Info.host + '/addGenreBand/' + Info.userId, body, options);
  }

  deleteGenre(genre:Genre){
    let body = '{ "name": "' + genre.name + '"}';
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});
    return this.http.put(Info.host +  '/deleteGenreBand/' + Info.userId, body, options);
  }

  setCity(city){
    let body = city;
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});
    return this.http.put( Info.host + '/editCityBand/' + Info.userId , body, options);
  }

  setWeb(link){
    let body = link;
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});
    return this.http.put(Info.host +  '/editWebLinkBand/' + Info.userId , body, options);
  }

  setFacebook(link){
    let body = link;
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});
    return this.http.put(Info.host + '/editFacebookLinkBand/' + Info.userId , body, options);
  }

  removeBand(bandId){
    let url = Info.host +  "/band/" + bandId + "/remove";
    return this.http.delete(url);
  }

  setYoutube(link){
    let body = link;
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});
    return this.http.put(Info.host +  '/editYoutubeLinkBand/' + Info.userId , body, options);
  }

  setTwitter(link){
    let body = link;
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});
    return this.http.put(Info.host +  '/editTwitterLinkBand/' + Info.userId , body, options);
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
        //noinspection TypeScriptValidateTypes
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


