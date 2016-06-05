import {Injectable} from "angular2/core";
import {blogUserList, eventList, blogBandList, noveltyList, followsList} from "../classes/memoryDB";
import {Info} from "../classes/Info";
import {withObserver} from "../classes/Utils";
import {Http, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PrincipalService{

    constructor(private http:Http) {}

    /***************************** HELL METHOD *****************************/
    getHell(id) {
        console.log("HellCall >>>>>>>>>>>>>>>>>>>>>>");
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

    getAll(){
        var result = [];
        // 0: BLOG USER
        /* Agregamos nuestros blogs */
        for(let i = 0; i < blogUserList.length; i++){
            if(Info.userLogged.equals(blogUserList[i].author)){
                result.push(blogUserList[i]);
            } else {
                /* Agregamos los blogs de los amigos */
                for(let j = 0; j < followsList.length; j++) {
                    if (Info.userLogged.equals(followsList[j].emisor) && blogUserList[i].equals(followsList[j].receptor)) {
                        result.push(blogUserList[i]);
                    }
                }
            }
        }
        // 1: BLOG BAND
        /* Agregamos los blogs de las bandas que seguimos */
        for(let i = 0; i < blogBandList.length; i++){
            var folls = blogBandList[i].author.followers;
            for (let j = 0; j < folls.length; j++) {
                if (folls[j].equals(Info.userLogged)) {
                    result.push(blogBandList[i]);
                }
            }
        }
        // 2: EVENT
        /* Agregamos los eventos que creamos */
        for(let i = 0; i < eventList.length; i++){
            if(Info.userLogged.equals(eventList[i].creator)){
                result.push(eventList[i])
            } else {
                /* Agregamos los eventos que seguimos */
                for (let j = 0; j < eventList[i].followers.length; j++) {
                    if(eventList[i].followers[j].equals(Info.userLogged)) {
                        result.push(eventList[i]);
                    }
                }
            }
        }
        // 3: NOVELTY
        /* Agregamos las novedades a las que pertenezcan nuestros amigos */
        for(let i = 0; i < followsList.length; i++){
            if(Info.userLogged.equals(followsList[i].emisor)){
                for(let j = 0; j < noveltyList.length;j++) {
                    if (followsList[i].receptor.equals(noveltyList[j].user)) {
                        result.push(noveltyList[j]);
                    }
                }
                /* Omitimos aquellas novedades de los grupos que seguimos */
            }
        }
        /* Agregamos las novedades a las que perteneco */
        for(let i = 0; i < noveltyList.length; i++) {
            if (Info.userLogged.equals(noveltyList[i].user)) {
                result.push(noveltyList[i]);
            }
        }

        result.sort(function(a,b) {
            return new Date(b.date.toString()).valueOf() - new Date(a.date.toString()).valueOf();
        });
        return withObserver(result);
    }

    /***********************************************************************/

}


