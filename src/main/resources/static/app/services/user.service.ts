/**
 * Service of MiausicBox users for petitions to Api Rest
 * @class UserService
 */
import { userList } from '../classes/memoryDB';

import { User } from '../classes/User'
import { Info } from "../classes/Info";
import { BlogUser} from "../classes/BlogUser";

import { Injectable } from 'angular2/core';

import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {withObserver, emptyUser, toInstance, emptyBlogUser, emptyGenre, emptyInstrument} from '../classes/Utils';

import 'rxjs/Rx';
import {Genre} from "../classes/Genre";
import {Instrument} from "../classes/Instrument";

@Injectable()
export class UserService {

  /* Constructor */
  constructor(private http: Http){}

  /* Http GETs */
  getAllUsers(){
    let url = "/artists";
    console.log("Peticion a " + url);
    return this.http.get(url).map(
      response => this.deserializeAllUsers(response.json())
    );
  }
  
  getUsersByName(name){
    let url = "/artists/name:" + name;
    console.log("Peticion a " + url);
    return this.http.get(url).map(
      response => this.deserializeAllUsers(response.json())
    )
  }

  getUserById(id){
    let url = "/artist/" + id;
    console.log("Peticion a " + url);
    return this.http.get(url).map(
      response => this.deserializeUser(response.json())
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
    let url = "/artist/" + id + "/myblogs";
    console.log("Peticion a " + url);
    return this.http.get(url).map(
        response => this.deserializeAllBlogs(response.json())
    );
  }

  getAllGenres(){
    let url = "/getAllGenres";
    return this.http.get(url).map(
        response => this.deserializeAllGenres(response.json())
    );
  }
  
  getAllInstruments(){
    let url = "/getAllInstr";
    return this.http.get(url).map(
        response => this.deserializeAllInstr(response.json())
    )
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

  setCity(city){
    let body = city;

    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});

    return this.http.put('/editCity/' + Info.userId , body, options);
  }

  setYoutube(link){
    let body = link;

    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});

    return this.http.put('/editYoutubeLink/' + Info.userId , body, options);
  }

  setTwitter(link){
    let body = link;

    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});

    return this.http.put('/editTwitterLink/' + Info.userId , body, options);
  }

  setFacebook(link){
    let body = link;

    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});

    return this.http.put('/editFacebookLink/' + Info.userId , body, options);
  }

  addGenre(genre:Genre){
    let body = '{ "name": "' + genre.name + '"}';

    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});

    return this.http.put('/addGenre/' + Info.userId, body, options);

  }

  deleteGenre(genre:Genre){
    let body = '{ "name": "' + genre.name + '"}';

    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});

    return this.http.put('/deleteGenre/' + Info.userId, body, options);
  }

  addInstrument(inst){
    let body = inst;

    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});

    return this.http.put('/addInstr/' + Info.userId, body, options);
  }

  deleteInstrument(inst){
    let body = inst;

    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});

    return this.http.put('/deleteInstr/' + Info.userId, body, options);
  }


  
  /* Deserialize Methods */
  deserializeAllUsers(json) {
    let users:User[] = [];
    json.map(
        obj => users.push(this.deserializeUser(obj))
    );
    return users;
  }

  deserializeUser(json) {
    return toInstance(emptyUser(), json);
  }

  deserializeAllBlogs(json) {
    let blogs:BlogUser[] = [];
    json.map(
      obj => {
        blogs.push(this.deserializeBlogUser(obj));
      }
    );
    return blogs;
  }

  deserializeBlogUser(json) {
    let blog:BlogUser = toInstance(emptyBlogUser(), json);
    blog.author = this.deserializeUser(json.author);
    //noinspection TypeScriptValidateTypes
    blog.date = new Date(json.date);
    return blog;
  }

  deserializeGenre(json){
    return toInstance(emptyGenre(), json);
  }

  deserializeAllGenres(json){
    let genres:Genre[] = [];
    json.map(
      obj => {
        genres.push(this.deserializeGenre(obj));
      }
    );
    return genres;
  }
  
  deserializeInstrument(json){
    return toInstance(emptyInstrument(), json);
  }

  deserializeAllInstr(json){
    let instruments:Instrument[] = [];
    json.map(
        obj => {
          instruments.push(this.deserializeInstrument(obj))
        }
    );
    return instruments;
  }

}
