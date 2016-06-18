/**
 * Service of MiausicBox users for petitions to Api Rest
 * @class UserService
 */
import { userList } from '../classes/memoryDB';

import { User } from '../classes/User'
import { Info } from "../classes/Info";
import { BlogUser} from "../classes/BlogUser";

import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { withObserver } from '../classes/Utils';
import 'rxjs/Rx';

@Injectable()
export class UserService {

  /* Constructor */
  constructor(private http: Http){}

  /* Http GETs */
  getAllUsers(){
    let url = "/artists";
    console.log("Peticion a " + url);
    return this.http.get(url).map(
        response => this.deserializeAllUsers(response)
    );
  }
  
  getUsersByName(name){
    let url = "/artists/name:" + name;
    console.log("Peticion a " + url);
    return this.http.get(url).map(
        response => this.deserializeAllUsers(response)
    )
  }

  getUserById(id){
    let url = "/artist/" + id;
    console.log("Peticion a " + url);
    return this.http.get(url).map(
        response => this.deserializeUser(response)
    );
  }

  getUserId(user:User){
    // TODO
    for(let i = 0; i < userList.length; i++){
      if(userList[i].equals(user)){
        return withObserver(i);
      }
    }
  }

  checkUserByUsername(username:string){
    // TODO
    for(let i = 0; i < userList.length; i++) {
      if (userList[i].userName == username) {
        return withObserver (false);
      }
    }
    return withObserver (true);
  }

  getUserByUserNameAndPass(username:string, pass:string) {
    // TODO
    for(let i = 0; i < userList.length;i++) {
      if (userList[i].userName == username && userList[i].password == pass) {
        return withObserver(userList[i]);
      }
    }
    return withObserver(null);
  }

  getBlogsByUser(id) {
    // TODO
    let url = "/artist/" + id + "/myblogs";
    console.log("Peticion a " + url);
    return this.http.get(url).map(
        response => this.deserializeAllBlogs(response)
    );
  }

  /* Http POSTs */
  addUser(user:User){
    // TODO
    userList.push(user);
    return withObserver (userList.length-1);
  }

  changePassword(password:string){
    // TODO
    userList[Info.userId].password = password;
  }

  changeUser(user:string){
    // TODO
    userList[Info.userId].userName = user;
  }

  changeName(name:string) {
    // TODO
    userList[Info.userId].completeName = name;
  }

  changeEmail(email:string) {
    // TODO
    userList[Info.userId].email = email;
  }

  changeIsArtist(isArtist:boolean) {
    // TODO
    userList[Info.userId].isArtist = isArtist;
  }

  changeDescription(description:string) {
    // TODO
    userList[Info.userId].description = description;
  }

  setInstrument(num){
    // TODO
    /*
    var instruments = userList[userList.indexOf(Info.userLogged)].instruments;
    if(instruments.indexOf(num) == -1) {
      userList[userList.indexOf(Info.userLogged)].instruments.push(parseInt(num));
      console.log(Info.userLogged);
    }
    */
  }

  deleteInstrument(num){
    // TODO
    /*
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
    // TODO
    userList[userList.indexOf(Info.userLogged)].city = city;
    console.log(userList.indexOf(Info.userLogged));
  }

  /* Deserialize Methods */
  deserializeAllUsers(response:Response) {
    console.log("deserealizeAllUsers > Response:");
    console.log(response);
    let result:User[] = [];
    response.json().map(
        obj => result.push(obj)
    );
    console.log("deserealizeAllUsers > Result:");
    console.log(result);
    return result;
  }

  deserializeUser(response:Response) {
    console.log("deserealizeUser > Response:");
    console.log(response);
    let result:User = response.json();
    console.log("deserealizeUser > Result:");
    return result;
  }

  deserializeAllBlogs(response:Response) {
    let result:BlogUser[] = [];
    response.json().map(
        obj => {
          let bu:BlogUser = obj;
          bu.date = new Date(obj.date);
          result.push(bu)
        }
    );
    console.log("deserealizeAllBlogs > Result:");
    console.log(result);
    return result;
  }

}
