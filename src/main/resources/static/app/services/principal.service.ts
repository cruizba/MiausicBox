/**
 * Service of MiausicBox messages users for petitions to Api Rest
 * @class MessageService
 */
import { Injectable } from "angular2/core";
import { Http } from "angular2/http";
import { Observable } from "rxjs/Observable";

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
      this.http.get(url0).map(res => res.json()),
      this.http.get(url1).map(res => res.json()),
      this.http.get(url2).map(res => res.json()),
      this.http.get(url3).map(res => res.json())
    )
  }

}


