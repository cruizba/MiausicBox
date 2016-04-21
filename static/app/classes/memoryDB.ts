import { User } from './User';
import {BlogUser} from "./BlogUser";
import {BlogBand} from "./BlogBand";
import {Band} from "./Band";



export var userList:User[] = [
  new User("DarwinTB", "1234", "Carlos Ruiz Ballesteros", "Esto es una descripción", true, "Fuenlabrada, Madrid", [1,2,3,4], [0], []),
  new User("ice6294", "9876", "Luis León Gámez", "Esto es una descripción", true, "Alcorcón, Madrid", [1,2,3,4],[0,1,2,3,4,5,6,7,8,9,10,11], []),
  new User("sorayeison", "contraseñadeprueba", "Soraya Rama", "Esto es una descripción", false, "Madrid", [],[8], []),
  new User("thaisthais", "prueba1234", "Thais", "Esto es una descripción", false, "Madrid", [],[8],[])
];

export var bandList:Band[] = [
  new Band("Supertramp","London, England","http://supertramp.com/","https://www.facebook.com/Supertramp-106822866016700/", "","")
]

export var blogUserList:BlogUser[] = [
  new BlogUser("From Pink to Tool", "", "blablabla", new Date("April 21, 2016 23:59:00"), userList[1]),
  new BlogUser("From Classic Punk to Modern Punk", "", "blablabla", new Date("February 20, 2016 23:59:00"), userList[1])tel
];

export var blogBandList:BlogBand[] = [
  new BlogBand("From Pink to Tool", "", "blablabla", new Date("April 21, 2016 23:59:00"), bandList[0])
];