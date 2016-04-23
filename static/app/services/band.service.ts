import {bandList} from '../classes/memoryDB';
import {Injectable} from 'angular2/core';
import {withObserver} from '../classes/Utils';

@Injectable()
export class BandService {

    getAllBands (){
        console.log(bandList[1].groupName);
        return withObserver (bandList);
    }
}