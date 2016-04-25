import {bandList, userList, blogBandList} from '../classes/memoryDB';
import {Injectable} from 'angular2/core';
import {withObserver} from '../classes/Utils';
import {User} from "../classes/User";

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

}
