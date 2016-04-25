
import {Genre} from "./Genre";

export class GenreList{

    private _genres:Genre[] = [
        new Genre("Rock"), //0
        new Genre("Pop"), //1
        new Genre("Jazz"), //2
        new Genre("Rap"), //3
        new Genre("Reggae"), //4
        new Genre("Metal"), //5
        new Genre("Hard Rock"), //6
        new Genre("Punk"), //7
        new Genre("Indie"), //8
        new Genre("Grunge"), //9
        new Genre("Trash Metal"), //10
        new Genre("Otros") //11
    ]

    get genres():Genre[] {
        return this._genres;
    }

}


