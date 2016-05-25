import {bandList, userList, blogBandList} from '../classes/memoryDB';
import {Injectable} from 'angular2/core';
import {withObserver} from '../classes/Utils';

import {Band} from "../classes/Band";
import {Info} from "../classes/Info";
import {Track} from "../classes/Track";
import {Http, Response} from "angular2/http";
import 'rxjs/Rx';
import {BlogBand} from "../classes/BlogBand";



@Injectable()
export class BandService {


  constructor (private http:Http){}

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
    console.log("(service) getMembers");
    var memberList = [];
    for(let i = 0; i < bandList[id].members.length; i++){
      memberList.push({"id":userList.indexOf(bandList[id].members[i]), "user":bandList[id].members[i]});
    }
    console.log(memberList);
    return withObserver(memberList);
  }



  isAdmin(id, user) {
    return withObserver(bandList[id].administrador.equals(user));
  }




  addNewBand(nameBand, description){
    var user=Info.userLogged;
    var newBand = new Band(user, nameBand, description, "", "", "", "", "", [user], [user], [], []);
    user.bands.push(newBand);
    bandList.push(newBand);
  }

  getBandsByUserId(id){
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

  getBandsByUsers(users){
    var result = []
    for(let k = 0; k < users.length; k++ ) {
      var bands = [];
      for(let i = 0; i < bandList.length; i++){
        for(let j = 0; j < bandList[i].members.length; j++) {
          if (bandList[i].members[j].equals(users[k].userObj)) {
            bands.push({"id": i, "bandObj": bandList[i]});
          }
        }
      }
      result.push(bands);
    }
    console.log(result);
    return withObserver(result);
  }

  addNewMember (name, id){

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
    }else{
      for (let j = 0; j < userList.length;j++){
        if( name == userList[j].userName){
          var newMem=userList[j];
        }
      }
    }
    bandList[id].members.push(newMem);
    
  }
  
  addNewTrack (name, group, link, id){
    var newTrack = new Track (name, group, link);
    bandList[id].tracks.push(newTrack);
  }

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


}
