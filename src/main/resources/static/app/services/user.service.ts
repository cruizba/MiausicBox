import { userList } from '../classes/memoryDB';
import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { User } from '../classes/User'
import { withObserver } from '../classes/Utils';
import { Info } from "../classes/Info";
import 'rxjs/Rx';
import {BlogUser} from "../classes/BlogUser";

@Injectable()
export class UserService {

  constructor(private http: Http){}

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

  checkUserByUsername(username:string){
    for(let i = 0; i < userList.length; i++) {
      if (userList[i].userName == username) {
        return withObserver (false);
      }
    }
    return withObserver (true);
  }

  getUserByUserNameAndPass(username:string, pass:string) {
    for(let i = 0; i < userList.length;i++) {
      if (userList[i].userName == username && userList[i].password == pass) {
        return withObserver(userList[i]);
      }
    }
    return withObserver(null);
  }

  getBlogsByUser(id) {
    let url = "/artist/" + id + "/myblogs";
    console.log("Peticion a " + url);
    return this.http.get(url).map(
        response => this.deserializeAllBlogs(response)
    );
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
    console.log(result);
    return result;
  }

  deserializeAllBlogs(response:Response) {
    console.log("deserealizeAllBlogs > Response:");
    console.log(response);
    let result:BlogUser[] = [];
    response.json().map(
        obj => {
          let bu:BlogUser = obj;
          let d:Date = new Date(obj.date);
          bu.date = d;
          result.push(bu)
        }
    );
    console.log("deserealizeAllBlogs > Result:");
    console.log(result);
    return result;
  }

}
