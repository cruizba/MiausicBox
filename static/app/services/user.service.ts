import { userList } from '../classes/memoryDB';
import { Injectable } from 'angular2/core';
import { User } from '../classes/User'
//Observer simulation
import { withObserver } from '../classes/Utils';
import {Instrument} from "../classes/Instrument";
import {IntrumentList} from "../classes/InstrumentList";
import {Info} from "../classes/Info";

@Injectable()
export class UserService {

  getAllUsers(){
    var result = [];
    for(let i = 0; i < userList.length; i++){
      result.push({"userId": i, "userObj": userList[i]});
    }
    return withObserver(result);
  }

  getUserByUserNameAndPass(username:string, pass:string){
    for(let i = 0; i < userList.length;i++) {
      if (userList[i].userName == username && userList[i].password == pass) {
        return withObserver(userList[i]);
      }
    }
    return withObserver(null);
  }

  /*
  * Only necessary on simulation.
  * At the backend, entities should have an id
   */
  getUserId(user:User){
    for(let i = 0; i < userList.length; i++){
      if(userList[i].equals(user)){
        return withObserver(i);
      }
    }
  }

  getUserById(id){
    return withObserver(userList[id]);
  }
  
  getUserByUserName(name:String){
    
    var allUsers = [];
    for (let i = 0; i < userList.length; i++){
      if(userList[i].userName == name){
        allUsers.push({"userId": i, "userObj": userList[i]});
      }
    }
    return withObserver (allUsers);
  }

  checkUserByUsername(username:string){
    for(let i = 0; i < userList.length; i++) {
      if (userList[i].userName == username) {
        return withObserver (false);
      }
    }
    return withObserver (true);
  }

  addUser(user:User){
    userList.push(user);
    return withObserver (userList.length-1);
  }

  changePassword(password:string){
    userList[Info.userId].password = password;
  }

  changeUser(user:string){
    userList[Info.userId].userName = user;
  }

  changeName(name:string) {
    userList[Info.userId].completeName = name;
  }

  changeEmail(email:string) {
    userList[Info.userId].email = email;
  }

  changeIsArtist(artist:boolean) {
    userList[Info.userId].isArtist = artist;
  }

  changeDescription(description:string) {
    userList[Info.userId].description = description;
  }

}
