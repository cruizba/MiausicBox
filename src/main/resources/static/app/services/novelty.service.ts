import {userList, noveltyList} from '../classes/memoryDB';
import { Injectable } from 'angular2/core';
import { User } from '../classes/User'
//Observer simulation
import { withObserver } from '../classes/Utils';
import {Instrument} from "../classes/Instrument";
import {IntrumentList} from "../classes/InstrumentList";
import {Band} from "../classes/Band";
import {Novelty} from "../classes/Novelty";

@Injectable()
export class NoveltyService {

  newNovelty(userName:string, band:Band, date:Date, joined:boolean) {
    var user: User;
    var encontrado:boolean = false;
    for(let i = 0; i < userList.length; i++) {
      if (userList[i].userName == userName) {
        user = userList[i];
        encontrado = true;
        break;
      }
    }
    if (encontrado) {
      for (let i = 0; i < band.members.length; i++) {
        if (band.members[i].equals(user)) {
          noveltyList.push(new Novelty(user, band, date, joined));
        }
      }
    }
  }

}
