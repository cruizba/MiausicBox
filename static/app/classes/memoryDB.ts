import { User } from './User';
import { Follow } from './Follow'
import {BlogUser} from "./BlogUser";



export var userList:User[] = [
  new User("DarwinTB", "1234", "Carlos Ruiz Ballesteros", "Esto es una descripción", true, "Fuenlabrada, Madrid","","","", [1,2,3,4], [0], []),
  new User("ice6294", "9876", "Luis León Gámez", "Esto es una descripción", true, "Alcorcón, Madrid","","","", [1,2,3,4],[0,1,2,3,4,5,6,7,8,9,10,11], []),
  new User("sorayeison", "a", "Soraya Rama", "Esto es una descripción", false, "Orcasitas City","","twitter.com/Soryrc","", [],[8], []),
  new User("thaisthais", "prueba1234", "Thais", "Esto es una descripción", false, "Madrid","","","", [],[8],[])
];

export var followsList:Follow[] = [
    new Follow(userList[0],userList[1]),
    new Follow(userList[0],userList[2]),
    new Follow(userList[0],userList[3]),
    new Follow(userList[1],userList[0]),
    new Follow(userList[2],userList[1]),
    new Follow(userList[2],userList[3]),
    new Follow(userList[3],userList[0]),
    new Follow(userList[3],userList[1])
];