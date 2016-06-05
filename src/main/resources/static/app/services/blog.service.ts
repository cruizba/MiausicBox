import {userList, blogUserList, blogBandList, followsList} from '../classes/memoryDB';
import { Injectable } from 'angular2/core';
import { User } from '../classes/User'
//Observer simulation
import { withObserver } from '../classes/Utils';
import {Band} from "../classes/Band";
import {BlogUser} from "../classes/BlogUser";
import {BlogBand} from "../classes/BlogBand";
import {Info} from "../classes/Info";
import {Headers, RequestOptions, Http} from "angular2/http";
import 'rxjs/Rx';

@Injectable()
export class BlogService {

  //noinspection TypeScriptUnresolvedVariable
  constructor(private http:Http) {

  }

  getAllBlogs(){
    return withObserver(blogUserList);
  }

  getBlogsByUser(user:User){
    var result:BlogUser[] = [];
    for(let i = 0; i < blogUserList.length;i++) {
      if (blogUserList[i].author.equals(user)){
        result.push(blogUserList[i]);
      }
    }
    result.sort(function(a,b) {
      return new Date(b.date.toString()).valueOf() - new Date(a.date.toString()).valueOf();
    });
    return withObserver(result);
  }

  getBlogsByBand(band:Band){
    var result:BlogBand[] = [];
    for(let i = 0; i < blogBandList.length;i++) {
      if (blogBandList[i].author.equals(band)) {
        result.push(blogBandList[i])
      }
    }
    result.sort(function(a,b) {
      return new Date(b.date.toString()).valueOf() - new Date(a.date.toString()).valueOf();
    });
    return withObserver(result);
  }
  
  addBlogUsser (title, img, text, date, user){
    img="../img/img6.jpg";
    let body = '{ "name": "' + title +
        '", "image": "' + img +
        '", "text": "' + text +
        '", "date": "' + date +
        '", "author":null' +
        '}';
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});

    let options = new RequestOptions({headers});
    //var newBlog = new BlogUser(title, img, text, date, user );
    //blogUserList.push(newBlog);
    return this.http.post('newbloguser/' + user.id, body, options);
  }

}
