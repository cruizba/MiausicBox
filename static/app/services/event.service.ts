import { eventList } from '../classes/memoryDB';
import { Injectable } from 'angular2/core';
import { Event } from '../classes/Event'
import { withObserver } from '../classes/Utils';


@Injectable()
export class EventService {

    getAllEvent (){
        var result = [];
        for (let i = 0; i < eventList.length; i++){
            result.push({"eventID":i, "eventObj": eventList[i]});
        }
        console.log(result);
        return withObserver (result);
    }
    
    getEventByID (id){
        return withObserver (eventList[id]);
    }
}
