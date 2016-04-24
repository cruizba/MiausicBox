import {bandList, userList} from '../classes/memoryDB';
import {Injectable} from 'angular2/core';
import {withObserver} from '../classes/Utils';

@Injectable()
export class BandService {

    getAllBands (){
        console.log(bandList[1].groupName);
        return withObserver (bandList);
    }
    
    getMembersByBandID(id){
        var members = [];
        var band = bandList[id];
        for(let i = 0; i < band.members.length; i++){
            members.push({"id":userList.indexOf(band.members[i]), "user":band.members[i]});
        }
        return withObserver(members);
    }
}