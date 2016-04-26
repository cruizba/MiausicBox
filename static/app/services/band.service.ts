import {bandList, userList, blogBandList} from '../classes/memoryDB';
import {Injectable} from 'angular2/core';
import {withObserver} from '../classes/Utils';

import {Band} from "../classes/Band";
import {Info} from "../classes/Info";
import {Track} from "../classes/Track";



@Injectable()
export class BandService {

  getAllBands (){
      var result = [];
      for(let i = 0; i < bandList.length; i++){
        result.push({"bandId": i, "bandObj": bandList[i]});
      }
      return withObserver(result);
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

  getBandById (id){
    return withObserver(bandList[id]);
  }

  isAdmin(id, user) {
    return withObserver(bandList[id].administrador.equals(user));
  }

  getBlogsByBand(band) {
    var bandBlogs = [];
    for (let i = 0; i < blogBandList; i++) {
      if (blogBandList[i].author.equals(band)) {
        bandBlogs.push(blogBandList[i]);
      }
    }
    return withObserver(bandBlogs);
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

}
