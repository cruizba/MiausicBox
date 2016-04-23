import { eventList } from '../classes/memoryDB';
import { Injectable } from 'angular2/core';
import { Event } from '../classes/Event'
import { withObserver } from '../classes/Utils';


@Injectable
export class EventService {

    getAllEvent (){
        var result = [];
        console.log("Hola entro en el servicio");
        for (let i = 0; i < eventList.length; i++){
            console.log("puta en bucle");
            result.push({"eventID":i, "eventObj": eventList[i]});
        }
        console.log("Hola salgo del servicio");
        return withObserver (result);
    }
}
