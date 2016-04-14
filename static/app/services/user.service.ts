import { userList } from '../classes/memoryDB';
import { Injectable } from 'angular2/core';

@Injectable()
export class UserService {

  getAllUsers(){
    return Promise.resolve(userList);
  }

}
