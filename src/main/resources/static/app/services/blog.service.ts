/**
 * Service of MiausicBox blogs for petitions to Api Rest
 * @class BlogService
 */
import { blogUserList, blogBandList } from '../classes/memoryDB'; // <--- FixMe: To Be Removed

import { Band } from "../classes/Band";
import { BlogBand } from "../classes/BlogBand";
import { BlogUser } from "../classes/BlogUser";
import { User } from '../classes/User'

import { Injectable } from 'angular2/core';
import { Headers, RequestOptions, Http } from "angular2/http";
import { withObserver } from '../classes/Utils';
import 'rxjs/Rx';

@Injectable()
export class BlogService {

  /* Constructor */
  constructor(private http:Http){}

  /* Http POSTs */
  addBlogUser(title, img, text, date, user){
    //img="../img/img6.jpg"; // <--- FixMe?

    let body = '{ "name": "' + title +
        '", "image": "' + img +
        '", "text": "' + text +
        '", "date": "' + date +
        '", "author":null' +
        '}';
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});

    return this.http.post('/newbloguser/' + user.id, body, options);
  }

  addBlogBand(title, img, text, date, id){
    //img="../img/img6.jpg"; // <--- FixMe?

    let body = '{ "name": "' + title +
        '", "image": "' + img +
        '", "text": "' + text +
        '", "date": "' + date +
        '", "author":null' +
        '}';
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});

    return this.http.post('/newblogband/' + id, body, options);
  }

  /* Deserialize Methods */

}
