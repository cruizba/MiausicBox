import {Injectable} from "angular2/core";
import {blogUserList, eventList, blogBandList, noveltyList, followsList} from "../classes/memoryDB";
import {Info} from "../classes/Info";
import {withObserver} from "../classes/Utils";
import {Http, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PrincipalService{

    constructor(private http:Http) {}

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


