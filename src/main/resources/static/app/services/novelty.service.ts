/**
 * Service of MiausicBox novelties users for petitions to Api Rest
 * @class NoveltyService
 */
import { userList, noveltyList } from '../classes/memoryDB'; // <--- FixMe: To Be Removed

import { Band } from "../classes/Band";
import { Novelty } from "../classes/Novelty";
import { User } from '../classes/User'

import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class NoveltyService {

  /* Constructor */
  constructor(private http:Http) {}

  /* Http GETs */

  /* Http POSTs */
  newNovelty(userName:string, band:Band, date:Date, joined:boolean) {
    // TODO
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
          noveltyList.push(new Novelty(0, user, band, date, joined)); // <-- FixMe: ID
        }
      }
    }
  }

  /* Deserialize Methods */

}
