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

  setInstrument(num){
    var instruments = userList[userList.indexOf(Info.userLogged)].instruments;
    if(instruments.indexOf(num) == -1) {
      userList[userList.indexOf(Info.userLogged)].instruments.push(parseInt(num));
      console.log(Info.userLogged);
    }
  }

  deleteInstrument(num){
    var instruments = userList[userList.indexOf(Info.userLogged)].instruments;
    var index = instruments.indexOf(parseInt(num))
    if(index != 0){
      userList[userList.indexOf(Info.userLogged)].instruments.splice(index, 1)
      Info.userLogged.instruments.splice(index, 1);
      console.log(Info.userLogged.instruments)
    }
  }

  setCity(city){
    userList[userList.indexOf(Info.userLogged)].setCity(city);
    console.log(userList.indexOf(Info.userLogged));
  }
}
