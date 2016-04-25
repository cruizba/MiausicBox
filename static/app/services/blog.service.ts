import {userList, blogUserList, blogBandList} from '../classes/memoryDB';
import { Injectable } from 'angular2/core';
import { User } from '../classes/User'
//Observer simulation
import { withObserver } from '../classes/Utils';
import {Band} from "../classes/Band";
import {BlogUser} from "../classes/BlogUser";
import {BlogBand} from "../classes/BlogBand";

@Injectable()
export class BlogService {

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

  getAllBlogsRelatedToUser(){
  }

}
