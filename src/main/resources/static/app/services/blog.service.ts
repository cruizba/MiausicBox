/**
 * Service of MiausicBox blogs for petitions to Api Rest
 * @class BlogService
 */
import { blogUserList, blogBandList } from '../classes/memoryDB'; // <--- FixMe: To Be Removed

import { Band } from "../classes/Band";
import { BlogBand } from "../classes/BlogBand";
import { BlogUser } from "../classes/BlogUser";
import { User } from '../classes/User'

import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from "@angular/http";
import { withObserver } from '../classes/Utils';
import 'rxjs/Rx';
import {Info} from "../classes/Info";

@Injectable()
export class BlogService {

  /* Constructor */
  constructor(private http:Http){}

  /* Http POSTs */
  addBlogUser(title, text, date, user){
    let body = '{ "name": "' + title +
        '", "image":null' +
        ', "text": "' + text +
        '", "date": "' + date +
        '", "author":null' +
        '}';
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});

    return this.http.post(Info.host +  '/newbloguser/' + user.id, body, options);
  }

  addBlogBand(title, text, date, id){
    let body = '{ "name": "' + title +
        '", "image":null' +
        ', "text": "' + text +
        '", "date": "' + date +
        '", "author":null' +
        '}';
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    let options = new RequestOptions({headers});

    return this.http.post(Info.host +  '/newblogband/' + id, body, options);
  }

  /* Deserialize Methods */

}
