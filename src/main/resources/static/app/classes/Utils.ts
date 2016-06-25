/**
 * Utils class of MiausicBox.
 * @class Observable
 */
import {Observable} from 'rxjs/Observable';

import {User} from "./User";
import {Instrument} from "./Instrument";
import {Genre} from "./Genre";
import {Band} from "./Band";
import {BlogBand} from "./BlogBand";
import {BlogUser} from "./BlogUser";
import {Event} from "./Event";
import {Follow} from "./Follow";
import {Message} from "./Message";
import {Novelty} from "./Novelty";
import {Track} from "./Track";

/** Returns an obserbable object [tmp].
 *  @method withObserver
 *  @returns {object} Observable<T>
 */
export function withObserver<T>(data: T): Observable<T> {
  return Observable.create(observer => {
    observer.next(data);
    observer.complete();
  });
}

/** Returns an empty object.
 *  @method emptyObject
 *  @returns {object} Object
 */
export function emptyUser():User{return new User(0, "","","","","",false,"","","","",[],[],[],[]);}
export function emptyBand():Band{return new Band(0, emptyUser(),"","","","","","","",[],[],[],[]);}
export function emptyGenre():Genre{return new Genre("");}
export function emptyBlogBand():BlogBand{return new BlogBand(0,"","","",new Date(),emptyBand());}
export function emptyBlogUser():BlogUser{return new BlogUser(0,"","","",new Date(),emptyUser());}
export function emptyEvent():Event{return new Event(0,"",new Date(),emptyUser(),"",[],"",[]);}
export function emptyFollow():Follow{return new Follow(0,emptyUser(),emptyUser());}
export function emptyInstrument():Instrument{return new Instrument("","","");}
export function emptyMessage():Message{return new Message(0,emptyUser(),emptyUser(),"","",new Date(),false);}
export function emptyNovelty():Novelty{return new Novelty(0,emptyUser(),emptyBand(),new Date(),false);}
export function emptyTrack():Track{return new Track(0,"","","");}

/** Returns an instance of an Object from a json.
 *  @method toInstance<T>
 *  @returns {object} Object<T>
 */
export function toInstance<T>(obj: T, json: any) : T {
  if (typeof obj["fromJSON"] === "function") {
    obj["fromJSON"](json);
  } else {
    for (var propName in json) {
      obj[propName] = json[propName];
    }
  }
  return obj;
}
