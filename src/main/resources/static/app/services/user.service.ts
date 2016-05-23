import { userList } from '../classes/memoryDB';
import { Injectable } from 'angular2/core';
import { Http, Response, RequestOptions, Headers } from 'angular2/http';
import { User } from '../classes/User'
//Observer simulation
import { withObserver } from '../classes/Utils';
import {Instrument} from "../classes/Instrument";
import {Info} from "../classes/Info";
import 'rxjs/Rx';

@Injectable()
export class UserService {

  constructor(private http: Http){}

  getAllUsers(){
    let url = "/artists"
    console.log("Peticion a /artists");
    return this.http.get(url).map(
      //response => this.deserializeAllUsers(response)
        response => response
    );
    /*
    var result = [];
    for(let i = 0; i < userList.length; i++){
      result.push({"userId": i, "userObj": userList[i]});
    }
    return withObserver(result);
    */
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

  changeIsArtist(isArtist:boolean) {
    userList[Info.userId].isArtist = isArtist;
  }

  changeDescription(description:string) {
    userList[Info.userId].description = description;
  }

  setInstrument(num){
    /* TODO: usar instrument[] en vez de number[]
    var instruments = userList[userList.indexOf(Info.userLogged)].instruments;
    if(instruments.indexOf(num) == -1) {
      userList[userList.indexOf(Info.userLogged)].instruments.push(parseInt(num));
      console.log(Info.userLogged);
    }
    */
  }

  deleteInstrument(num){
    /* TODO: usar instrument[] en vez de number[]
    var instruments = userList[userList.indexOf(Info.userLogged)].instruments;
    var index = instruments.indexOf(parseInt(num))
    if(index != 0){
      userList[userList.indexOf(Info.userLogged)].instruments.splice(index, 1)
      Info.userLogged.instruments.splice(index, 1);
      console.log(Info.userLogged.instruments)
    }
    */
  }

  setCity(city){
    userList[userList.indexOf(Info.userLogged)].setCity(city);
    console.log(userList.indexOf(Info.userLogged));
  }

  // Deserealization methods
  /*
  deserializeAllUsers(response:Response) {
    let body = response.json();
    console.log("Qué me traéis hoy buen señor?");
    console.log("Body ->");
    console.log(body);
    let result = [];
    for(let i = 0; i < body.length;i++){
      var user;
      user = {"userId": response[i].id, "userObj": response[i]};
      console.log("User " + i + ">");
      console.log(user);
      result.push(user);
    }
    console.log("Result ->");
    console.log(result);
    return result;
  }
  */

}
