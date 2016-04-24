import {bandList} from '../classes/memoryDB';
import {Injectable} from 'angular2/core';
import {withObserver} from '../classes/Utils';

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
    var memberList = [];
    for(let i = 0; i < bandList[id].members.length; i++){
      memberList.push({"userId": i, "userObj": bandList[id].members[i]});
    }
    return withObserver(memberList);
  }

  getBandById (id){
    return withObserver(bandList[id]);
  }
  
}
