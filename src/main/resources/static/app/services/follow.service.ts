/**
 * Service of MiausicBox follows for petitions to Api Rest
 * @class FollowService
 */
import { followsList, userList } from "../classes/memoryDB"

import { Follow } from "../classes/Follow";

import { Injectable } from "angular2/core";
import {Http, Headers, RequestOptions} from "angular2/http";
import {withObserver, emptyUser, toInstance} from "../classes/Utils";
import 'rxjs/Rx';
import {User} from "../classes/User";
import {Info} from "../classes/Info";

@Injectable()
export class FollowService{

    /* Constructor */
    constructor(private http:Http){}

    /* Http GETs */
    /**
     * Return on number, the number of followings
     * and on user an array of users
     * Api Rest should return a list of users
     * so this implementation is not similar
     */
    getFollowingById(id){
        let url = "/artist/" + id + "/following";
        return this.http.get(url).map(
            users => this.deserializeAllUsers(users.json())
        );
    }

    /**
     * Return on number, the number of followings
     * and on user an array of users
     * Api Rest should return a list of users
     * so this implementation is not similar
     */
    getFollowersById(id){
        let url = "/artist/" + id + "/followers";
        return this.http.get(url).map(
            users => this.deserializeAllUsers(users.json())
        );
    }

    /**
     * Get only number of followers
     */
    getNumFollowersById(id){
        let url = "/artist/" + id + "/numfollowers";
        return this.http.get(url).map(
            response => response.json()
        );
    }



    /**
     * Get only number of following
     */
    getNumFollowingByID(id){
        let url = "/artist/" + id + "/numfollowing"
        return this.http.get(url).map(
            response => response.json()
        );
    }

    /**
     * Get if user follows other user
     */
    isUserFollowedBy(emisor, receptor) {
        let url = "/artist/" + receptor + "/isFollowedBy/" + emisor;
        return this.http.get(url).map(
            response => response.json()
        )
    }

    /* Http POSTs */
    /**
     * Follow this user
     */
    setFollow(emisor, receptor) {
        let body = "";

        let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        let options = new RequestOptions({headers});

        return this.http.post('/artist/' + emisor + "/follows/" + receptor, body, options);
    }

    /**
     * Unfollow this user
     */
    setUnfollow(emisor, receptor) {
        let body = "";

        let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
        let options = new RequestOptions({headers});

        return this.http.post('/artist/' + emisor + "/unfollow/" + receptor, body, options);
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
}
