/**
 * Service of MiausicBox bands for petitions to Api Rest
 * @class BandService
 */
import { bandList, userList } from '../classes/memoryDB'; // <--- FixMe: To Be Removed

import { Band } from "../classes/Band";
import { BlogBand } from "../classes/BlogBand";
import { Info } from "../classes/Info";
import { Track } from "../classes/Track";

import { Injectable } from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from "angular2/http";
import { withObserver } from '../classes/Utils';
import 'rxjs/Rx';

@Injectable()
export class BandService {

  /* Constructor */
  constructor (private http:Http){}

  /* Http GETs */
  getAllBands (){
    var url = "/bands";
    return (this.http.get(url).map(
      result => this.deserializeAllBands(result)
    ))
  }
  
  getBandByName(name){
    var url= "/bands/name:" + name;
    return (this.http.get(url).map(
      result => this.deserializeAllBands(result)
    ))
  }

  getBandById (id){
    let url = "/band/"+id;
    console.log("Hacemos petciccion a " + url);
    return this.http.get(url).map(
      result => this.deserializeBand(result)
    )
  }

  getEventByBandById (id){
    let url = "/band/"+id+"/events";
    return this.http.get(url).map(
      result => this.deserializeEvents(result)
    )
  }

  getBlogsByBand(id) {
    let url = "/band/"+id+"/bandblog";
    return this.http.get(url).map(
      response => this.deserializableAllBlogs(response)
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
    // TODO
    console.log("(service) getMembers");
    var memberList = [];
    for(let i = 0; i < bandList[id].members.length; i++){
      memberList.push({"id":userList.indexOf(bandList[id].members[i]), "user":bandList[id].members[i]});
    }
    console.log(memberList);
    return withObserver(memberList);
  }

  isAdmin(id, user) {
    // TODO
    return withObserver(bandList[id].administrador.equals(user));
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

  addNewTrack (name, group, link, id){
    // TODO
    var newTrack = new Track (0, name, group, link); // <-- FixMe: ID
    bandList[id].tracks.push(newTrack);
  }

  /* Deserialize Methods */
  deserializeAllBands (response:Response) {
    console.log("Aca tienes las bandas");
    console.log("Response ->");
    console.log(response);
    let result = []
    response.json().map(
        obj =>{
//          var band = {"bandId":obj.id, "bandObj": obj}
          result.push(obj)
        }
    )
    console.log("Result ->");
    console.log(result);
    return result;
  }

  deserializeBand (response:Response) {
    console.log("Aca tienes las bandas");
    console.log("Response ->");
    console.log(response);
    let result:Band = response.json();
    console.log("Result ->");
    console.log(result);
    return result;
  }

  deserializeEvents (response:Response){
    let result:Event [] = response.json();
    return result;
  }

  deserializableAllBlogs (response:Response){
    let result:BlogBand[]= [];
    response.json().map(
        obj => {
          let bb: BlogBand = obj;
          let d: Date = new Date (obj.date);
          bb.date = d;
          result.push(bb)
        }
    );
    return result;
  }

  deserializableBands (response:Response){
    let result:Band[]=[];
    response.json().map(
        obj => result = obj
    );
    return result;
  }
}


