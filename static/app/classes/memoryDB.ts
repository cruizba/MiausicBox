import { User } from './User';
import { Follow } from './Follow'
import { BlogUser } from "./BlogUser";
import { BlogBand } from "./BlogBand";
import { Band } from "./Band";
import { Event } from "./Event";
import { Message } from "./Message";
import {Track} from "./Track";

var description:string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.";
var blog1:string = "Blog 1 de Muestra. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.";
var blog2:string = "Blog 2 de Muestra. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.";

export var userList:User[] = [
  new User("DarwinTB", "1234", "Carlos Ruiz Ballesteros", description, true, "Fuenlabrada, Madrid","","","", [1,2,3,4], [0], []),
  new User("ice6294", "9876", "Luis León Gámez", description, true, "Alcorcón, Madrid","","","", [1,2,3,4],[0,1,2,3,4,5,6,7,8,9,10,11], []),
  new User("sor", "a", "Soraya Rama", description, false, "Orcasitas City","","twitter.com/Soryrc","", [],[8], []),
  new User("thais", "prueba1234", "Thais Méndez", description, false, "Madrid","","","", [],[8],[])
];

var banda1:User[] = [userList[0], userList[2]];
var banda2:User[] = [userList[1], userList[2]];
var banda3:User[] = [userList[1], userList[3]];
var followers1:User[] = [userList[1], userList[3]];
var followers2:User[] = [userList[3]];
var followers3:User[] = [userList[0], userList[2]];

export var blogUserList:BlogUser[] = [
  new BlogUser("Blog #1", "../img/img6.jpg",  blog1, new Date("April 13, 2016 20:16:37"), userList[0]),
  new BlogUser("Blog #1", "../img/muestra2.jpg",  blog1, new Date("December 3, 2015 15:28:05"), userList[1]),
  new BlogUser("Blog #1", "../img/img4.jpg",  blog1, new Date("January 23, 2016 17:36:48"), userList[2]),
  new BlogUser("Blog #1", "../img/muestra1.jpg",  blog1, new Date("March 15, 2016 12:20:57"), userList[3]),
  new BlogUser("Blog #2", "../img/img2.jpg",  blog2, new Date("April 13, 2016 20:16:37"), userList[0]),
  new BlogUser("Blog #2", "../img/img2.jpg",  blog2, new Date("December 3, 2015 15:28:05"), userList[1]),
  new BlogUser("Blog #2", "../img/img2.jpg",  blog2, new Date("January 23, 2016 17:36:48"), userList[2]),
  new BlogUser("Blog #2", "../img/img2.jpg",  blog2, new Date("March 15, 2016 12:20:57"), userList[3])
];

var banda1:User[] = [userList[0], userList[2]];
var banda2:User[] = [userList[1], userList[2]];
var banda3:User[] = [userList[1], userList[3]];
var followers1:User[] = [userList[1], userList[3]];
var followers2:User[] = [userList[3]];
var followers3:User[] = [userList[0], userList[2]];

var track1:Track = new Track("Pigs (Three Different Ones)", "Pink Floyd", "");
var track2:Track = new Track("10.000", "Tool", "");
var track3:Track = new Track("Paint It Black", "The Rolling Stones", "");

export var bandList:Band[] = [
    new Band (userList[3],"Arctic Monkeys", description, "Sevilla", "www.arcticmonkeys.com", "", "", "", banda1, followers1, [1,2], [track1]),
    new Band (userList[3], "Strokes", description, "Toledo", "www.thestrokes.com", "", "", "", banda2, followers2, [0,3], [track2]),
    new Band (userList[3], "Flower Power", description, "Parla", "", "", "","", banda3, followers3, [0,1,3],[track1,track2,track3])
];

export var blogBandList:BlogBand[] = [
  new BlogBand("Blog #1", "../img/img6.jpg",  blog1, new Date("April 13, 2016 20:16:37"), bandList[0]),
  new BlogBand("Blog #1", "../img/muestra2.jpg",  blog1, new Date("December 3, 2015 15:28:05"), bandList[1]),
  new BlogBand("Blog #1", "../img/img4.jpg",  blog1, new Date("January 23, 2016 17:36:48"), bandList[2]),
  new BlogBand("Blog #2", "../img/muestra1.jpg",  blog2, new Date("March 15, 2016 12:20:57"), bandList[1]),
  new BlogBand("Blog #2", "../img/img2.jpg",  blog2, new Date("April 13, 2016 20:16:37"), bandList[0]),
  new BlogBand("Blog #3", "../img/img2.jpg",  blog2, new Date("December 3, 2015 15:28:05"), bandList[1]),
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

export var eventList: Event [] = [
    new Event ("Indie Week", new Date("April 13, 2016 20:16:37"), userList[0], "Musica indie para gente indie", [bandList[0], bandList[1]],"Calle de la piruleta",[userList[0], userList[1], userList[2], userList[3]]),
    new Event ("Trash toor", new Date("April 14, 2016 20:16:37"), userList[1], "lolololololololo", [bandList[2]], "Wonderland",[userList[0], userList[1]]),
    new Event ("Pinkicide", new Date("April 15, 2016 20:16:37"), userList[0], "asdfasdfasdf", [bandList[1], bandList[2]], "Es un mundo maravilloso", [userList[2], userList[3]])
];

export var messageList:Message[] = [
    new Message(userList[0], userList[1], "Luis envíame eso", "Necesito la base rítimica ya, pásamela", new Date("April 23, 2016 12:20:57"), false),
    new Message(userList[0], userList[2], "Una canción", "Toma Soraya te paso una canción a ver si te gusta https://www.youtube.com/watch?v=9PSvKjrEo7g", new Date("April 23, 2016 15:20:57"), false),
    new Message(userList[2], userList[0], "Aún no", "Aún no he compuesto la base rítmica, espérate...", new Date("April 24, 2016 10:20:12"), false),
    new Message(userList[3], userList[0], "No me gusta...", "No me gusta memoryDB", new Date("April 24, 2016 12:20:12"), false),
    new Message(userList[1], userList[2], "Mensaje Luis a soraya", "Contenido Mensaje de Luis a Soraya", new Date("April 24, 2016 16:20:57"), false),
    new Message(userList[2], userList[1], "Mensaje de Soraya a Luis", "Contenido Mensaje de Soraya a Luis", new Date("April 24, 2016 17:20:57"), false),
    new Message(userList[2], userList[3], "Mensaje de Soraya a Thais", "Contenido Mensaje de Soraya a Thais", new Date("April 24, 2016 18:20:12"), false),
    new Message(userList[3], userList[0], "Mensaje de Thais a Carlos", "Contenido Mensaje de Thais a Carlos", new Date("April 24, 2016 19:20:12"), false)
];
