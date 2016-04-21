import { userList } from '../classes/memoryDB';
import { Injectable } from 'angular2/core';
import { User } from '../classes/User'
//Observer simulation
import { withObserver } from '../classes/Utils';

@Injectable()
export class UserService {

  getAllUsers(){
    return withObserver(userList);
  }

  getUserByIdAndPass(username:string, pass:string){
    for(let i = 0; i < userList.length;i++) {
      if (userList[i].userName == username && userList[i].password == pass) {
        return withObserver(userList[i]);
      }
    }
    return withObserver(null);
  }

}
