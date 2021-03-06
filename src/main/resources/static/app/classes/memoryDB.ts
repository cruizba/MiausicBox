import { User } from './User';
import { Follow } from './Follow'
import { BlogUser } from "./BlogUser";
import { BlogBand } from "./BlogBand";
import { Band } from "./Band";
import { Event } from "./Event";
import { Message } from "./Message";
import {Track} from "./Track";
import {Novelty} from "./Novelty";

var description:string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.";
var blog1:string = "Blog 1 de Muestra. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.";
var blog2:string = "Blog 2 de Muestra. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.";

export var userList:User[] = [
  new User(1, "DarwinTB", "1234", "Carlos Ruiz Ballesteros", "user1@email.com", description, true, "Fuenlabrada, Madrid","","","", "", [], [], [], []),
  new User(2, "ice6294", "9876", "Luis León Gámez", "user2@email.com", description, true, "Alcorcón, Madrid","","","", "", [],[], [], []),
  new User(3, "sor", "a", "Soraya Rama", "user3@email.com", description, false, "Orcasitas City","","twitter.com/Soryrc","", "", [],[], [], []),
  new User(4, "thais", "prueba1234", "Thais Méndez", "user4@email.com", description, false, "Madrid","","","", "", [],[],[], [])
];

var banda1:User[] = [userList[0], userList[2]];
var banda2:User[] = [userList[1], userList[2]];
var banda3:User[] = [userList[1], userList[3]];
var followers1:User[] = [userList[1], userList[3]];
var followers2:User[] = [userList[3]];
var followers3:User[] = [userList[0], userList[2]];

export var blogUserList:BlogUser[] = [
  new BlogUser(1, "Blog #1", "../img/img6.jpg",  blog1, new Date("April 13, 2016 20:16:37"), userList[0]),
  new BlogUser(2, "Blog #1", "../img/muestra2.jpg",  blog1, new Date("December 3, 2015 15:28:05"), userList[1]),
  new BlogUser(3, "Blog #1", "../img/img4.jpg",  blog1, new Date("January 23, 2016 17:36:48"), userList[2]),
  new BlogUser(4, "Blog #1", "../img/muestra1.jpg",  blog1, new Date("March 15, 2016 12:20:57"), userList[3]),
  new BlogUser(5, "Blog #2", "../img/img2.jpg",  blog2, new Date("April 13, 2016 20:16:37"), userList[0]),
  new BlogUser(6, "Blog #2", "../img/img2.jpg",  blog2, new Date("December 3, 2015 15:28:05"), userList[1]),
  new BlogUser(7, "Blog #2", "../img/img2.jpg",  blog2, new Date("January 23, 2016 17:36:48"), userList[2]),
  new BlogUser(8, "Blog #2", "../img/img2.jpg",  blog2, new Date("March 15, 2016 12:20:57"), userList[3])
];

var banda1:User[] = [userList[0], userList[2]];
var banda2:User[] = [userList[1], userList[2]];
var banda3:User[] = [userList[1], userList[3]];
var followers1:User[] = [userList[1], userList[3]];
var followers2:User[] = [userList[3]];
var followers3:User[] = [userList[0], userList[2]];

var track1:Track = new Track(1, "Pigs (Three Different Ones)", "Pink Floyd", "");
var track2:Track = new Track(2, "10.000", "Tool", "");
var track3:Track = new Track(3, "Paint It Black", "The Rolling Stones", "");

export var bandList:Band[] = [
    new Band (1, userList[3],"Arctic Monkeys", description, "Sevilla", "www.arcticmonkeys.com", "", "", "", "", banda1, followers1, [], [track1]),
    new Band (2, userList[3], "Strokes", description, "Toledo", "www.thestrokes.com", "", "", "", "", banda2, followers2, [], [track2]),
    new Band (3, userList[3], "Flower Power", description, "Parla", "", "", "","", "", banda3, followers3, [],[track1,track2,track3])
];

export var blogBandList:BlogBand[] = [
  new BlogBand(1, "Blog #1", "../img/img6.jpg",  blog1, new Date("April 13, 2016 20:16:37"), bandList[0]),
  new BlogBand(2, "Blog #1", "../img/muestra2.jpg",  blog1, new Date("December 3, 2015 15:28:05"), bandList[1]),
  new BlogBand(3, "Blog #1", "../img/img4.jpg",  blog1, new Date("January 23, 2016 17:36:48"), bandList[2]),
  new BlogBand(4, "Blog #2", "../img/muestra1.jpg",  blog2, new Date("March 15, 2016 12:20:57"), bandList[1]),
  new BlogBand(5, "Blog #2", "../img/img2.jpg",  blog2, new Date("April 13, 2016 20:16:37"), bandList[0]),
  new BlogBand(6, "Blog #3", "../img/img2.jpg",  blog2, new Date("December 3, 2015 15:28:05"), bandList[1]),
];

export var followsList:Follow[] = [
    new Follow(1, userList[0],userList[1]),
    new Follow(2, userList[0],userList[2]),
    new Follow(3, userList[0],userList[3]),
    new Follow(4, userList[1],userList[0]),
    new Follow(5, userList[2],userList[1]),
    new Follow(6, userList[2],userList[3]),
    new Follow(7, userList[3],userList[0]),
    new Follow(8, userList[3],userList[1])
];

export var eventList: Event [] = [
    new Event (1, "Indie Week", new Date("April 13, 2016 20:16:37"), userList[0], "Musica indie para gente indie", "", [bandList[0], bandList[1]],"Calle de la piruleta",[userList[0], userList[1], userList[2], userList[3]]),
    new Event (2, "Trash toor", new Date("April 14, 2016 20:16:37"), userList[1], "lolololololololo", "", [bandList[2]], "Wonderland",[userList[0], userList[1]]),
    new Event (3, "Pinkicide", new Date("April 15, 2016 20:16:37"), userList[0], "asdfasdfasdf", "", [bandList[1], bandList[2]], "Es un mundo maravilloso", [userList[2], userList[3]])
];

export var messageList:Message[] = [
    new Message(1, userList[0], userList[1], "Luis envíame eso", "Necesito la base rítimica ya, pásamela", new Date("April 23, 2016 12:20:57"), false),
    new Message(2, userList[0], userList[2], "Una canción", "Toma Soraya te paso una canción a ver si te gusta https://www.youtube.com/watch?v=9PSvKjrEo7g", new Date("April 23, 2016 15:20:57"), false),
    new Message(3, userList[2], userList[0], "Aún no", "Aún no he compuesto la base rítmica, espérate...", new Date("April 24, 2016 10:20:12"), false),
    new Message(4, userList[3], userList[0], "No me gusta...", "No me gusta memoryDB", new Date("April 24, 2016 12:20:12"), false),
    new Message(5, userList[1], userList[2], "Mensaje Luis a soraya", "Contenido Mensaje de Luis a Soraya", new Date("April 24, 2016 16:20:57"), false),
    new Message(6, userList[2], userList[1], "Mensaje de Soraya a Luis", "Contenido Mensaje de Soraya a Luis", new Date("April 24, 2016 17:20:57"), false),
    new Message(7, userList[2], userList[3], "Mensaje de Soraya a Thais", "Contenido Mensaje de Soraya a Thais", new Date("April 24, 2016 18:20:12"), false),
    new Message(8, userList[3], userList[0], "Mensaje de Thais a Carlos", "Contenido Mensaje de Thais a Carlos", new Date("April 24, 2016 19:20:12"), false)
];

export var noveltyList:Novelty[] = [
    new Novelty(1, userList[0], bandList[0], new Date("April 25, 2016 12:20:57"), true),
    new Novelty(2, userList[1], bandList[0], new Date("April 27, 2016 10:20:57"), false),
    new Novelty(3, userList[3], bandList[2], new Date("May 10, 1999 10:20:57"), true)
]
