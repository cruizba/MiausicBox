/**
 * Service of MiausicBox messages users for petitions to Api Rest
 * @class MessageService
 */
import { Injectable } from "angular2/core";
import { Http } from "angular2/http";
import { Observable } from "rxjs/Observable";
import { BlogBand } from "../classes/BlogBand";
import {
  emptyBlogBand, toInstance, emptyBlogUser, emptyBand, emptyUser, emptyEvent,
  emptyNovelty
} from "../classes/Utils";
import { BlogUser } from "../classes/BlogUser";
import { Band } from "../classes/Band";
import { Novelty } from "../classes/Novelty";
import { Event } from "../classes/Event";

@Injectable()
export class PrincipalService{

  /* Constructor */
  constructor(private http:Http) {}

  /* Http GETs */ // FixMe: deserialize responses?
  getHell(id) {
    let url0 = "/artist/" + id + "/allusersblogs";
    let url1 = "/artist/" + id + "/allbandsblogs";
    let url2 = "/artist/" + id + "/novelties";
    let url3 = "/artist/" + id + "/events";
    return Observable.forkJoin(
      this.http.get(url0).map(res => this.deserializeAllUserBlogs(res.json())),
      this.http.get(url1).map(res => this.deserializeAllBandBlogs(res.json())),
      this.http.get(url2).map(res => this.deserializeAllNovelties(res.json())),
      this.http.get(url3).map(res => this.deserializeAllEvents(res.json()))
    )
  }



  /* Deserialize Methods (BlogUser) */
  deserializeAllUserBlogs(json) {
    let blogs:BlogUser[] = [];
    json.map(
      obj => blogs.push(this.deserializeBlogUser(obj))
    );
    return blogs;
  }

  deserializeBlogUser(json) {
    let blog:BlogUser = toInstance(emptyBlogUser(), json);
    blog.author = this.deserializeUser(json.author);
    blog.date = new Date(json.date);
    return blog;
  }

  deserializeUser(json) {
    return toInstance(emptyUser(), json);
  }

  /* Deserialize Methods (BlogBand) */
  deserializeAllBandBlogs(json){
    let blogs:BlogBand[] = [];
    json.map(
      obj => blogs.push(this.deserializeBlogBand(obj))
    );
    return blogs;
  }

  deserializeBlogBand(json) {
    let blog:BlogBand = toInstance(emptyBlogBand(), json);
    blog.author = this.deserializeBand(json.author);
    blog.date = new Date(json.date);
    return blog;
  }

  deserializeBand(json) {
    return toInstance(emptyBand(), json);
  }

  /* Deserialize Methods (Event) */
  deserializeAllEvents(json) {
    let events:Event[] = [];
    json.map(
      obj => events.push(this.deserializeBasicEvent(obj))
    );
    return events;
  }

  deserializeBasicEvent(json) {
    let event:Event = toInstance(emptyEvent(), json);
    event.bands = this.deserializeAllBands(json.bands);
    event.date = new Date(json.date);
    return event;
  }

  deserializeAllBands (json) {
    let bands:Band[] = [];
    json.map(
      obj => bands.push(this.deserializeBand(obj))
    );
    return bands;
  }

  /* Deserialize Methods (Event) */
  deserializeAllNovelties(json) {
    let novelties:Novelty[] = [];
    json.map(
      obj => novelties.push(this.deserializeNovelty(obj))
    );
    return novelties;
  }

  deserializeNovelty(json) {
    let novelty:Novelty = toInstance(emptyNovelty(), json);
    novelty.user = this.deserializeUser(json.user);
    novelty.band = this.deserializeBand(json.band);
    novelty.date = new Date(json.date);
    return novelty;
  }

}


