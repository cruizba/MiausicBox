import {Injectable} from "angular2/core";
import {User} from "../classes/User";
import {followsList, userList, eventList} from "../classes/memoryDB"
import {Follow} from "../classes/Follow";
import {withObserver} from "../classes/Utils";

@Injectable()
export class FollowService{


    /**
     * Return on number, the number of followings
     * and on user an array of users
     * Api Rest should return a list of users
     * so this implementation is not similar
     */
    getFollowingById(id){
        var users = [];
        var numFollowing:number = 0;
        for(let i = 0; i < followsList.length; i++){
            var follow = followsList[i];
            if(follow.emisor.equals(userList[id])) {
                users.push({"id": userList.indexOf(follow.receptor), "user": follow.receptor});
                numFollowing++;
            }
        }
        console.log(users);
        return withObserver(users);
    }

    /**
     * Return on number, the number of followings
     * and on user an array of users
     * Api Rest should return a list of users
     * so this implementation is not similar
     */
    getFollowersById(id){
        var users = [];
        var numFollowers:number = 0;
        for(let i = 0; i < followsList.length; i++) {
            var follow = followsList[i];
            if (follow.receptor.equals(userList[id])) {
                users.push({"id": userList.indexOf(follow.emisor), "user": follow.emisor});
                numFollowers++;
            }
        }
        console.log(users);
        return withObserver(users)
    }


    /**
     * Get only number of followers
     */
    getNumFollowersById(id){
        var numFollowers: number = 0;
        for(let i = 0; i < followsList.length; i++){
            var follow = followsList[i];
            if(follow.receptor.equals(userList[id])){
                numFollowers++;
            }
        }
        console.log(numFollowers);
        return withObserver(numFollowers);
    }

    /**
     * Get only number of following
     */
    getNumFollowingByID(id){
        var numFollowing: number = 0;
        for(let i = 0; i < followsList.length; i++){
            var follow = followsList[i];
            if(follow.emisor.equals(userList[id])){
                numFollowing++;
            }
        }
        console.log(numFollowing);
        return withObserver(numFollowing);
    }

    /**
     * Get if user follows other user
     */
    isUserFollowedBy(us_emisor, us_receptor) {
        for (let i = 0; i < followsList.length; i++){
            var follow = followsList[i];
            if (follow.emisor.equals(us_emisor) &&
                follow.receptor.equals(us_receptor)) {
                return withObserver(true);
            }
        }
        return withObserver(false);
    }

    /**
     * Follow this user
     */
    setFollow(us_emisor, us_receptor) {
      console.log("(service) SETFOLLOW");
      console.log("(service) Agregando follow " + us_emisor.name + " -> " + us_receptor.name);
      followsList.push(new Follow(us_emisor, us_receptor));
      console.log(followsList);
    }

    /**
     * Unfollow this user
     */
    setUnfollow(us_emisor, us_receptor) {
        console.log("(service) SETUN-FOLLOW");
        if (this.isUserFollowedBy(us_emisor, us_receptor)) {
            for (let i = 0; i < followsList.length; i++){
                var follow = followsList[i];
                if (follow.emisor.equals(us_emisor) && follow.receptor.equals(us_receptor)) {
                  console.log("(service) Eliminando follow " + us_emisor.userName + " -> " + us_receptor.userName);
                  followsList.splice(i, 1);
                  console.log(followsList);
                  return;
                }
            }
        }
    }
}
