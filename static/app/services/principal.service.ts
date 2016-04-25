import {Injectable} from "angular2/core";
import {blogUserList, eventList, blogBandList} from "../classes/memoryDB";
import {Info} from "../classes/Info";

@Injectable()
export class PrincipalService{
    getAll(){
        var result = [];
        for(let i = 0; i < blogUserList.length; i++){
            if(Info.userLogged.equals(blogUserList[i].author)){
                result.push(blogUserList[i]);
            }
        }
        for(let i = 0; i < blogBandList.length; i++){
            var folls = blogBandList[i].author.followers;
            for (let j = 0; j < folls.length; j++) {
                if (folls[i].equals(Info.userLogged)) {
                    result.push(blogBandList[i]);
                }
            }
        }
        for(let i = 0; i < eventList.length; i++){
            if(Info.userLogged.equals(eventList[i].creator)){
                result.push(eventList[i])
            }
        }
    }
}


