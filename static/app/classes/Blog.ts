/**
 *  Class that represent the information related to MiausicBox users
 *  @class Blog
 */
import { User } from './User';

export class Blog {

  /* Attributes */
  protected _name:string;
  protected _image:string;
  protected _text:string;
  protected _date:Date;

  /* Constructor */
  constructor(name:string, image:string, text:string, date:Date) {
    this._name = name;
    this._image = image;
    this._text = text;
    this._date = date;
  }

  /* Getters & Setters */
  get name():string {
    return this._name;
  }

  get image():string {
    return this._image;
  }

  get text():string {
    return this._text;
  }

  get date():Date {
    return this._date;
  }

  set name(name:string) {
    this._name = name;
  }

  set image(image:string) {
    this._image = image;
  }

  set text(text:string) {
    this._text = text;
  }

  set date(date:Date) {
    this._date = date;
  }

  /** Return if an Blog is equal to other
   *  @method equals
   *  @param {object} object
   */
  equals(object:any){
    //At ApiRest object, this comparaison should be the with both ids
    if (!(object instanceof Blog)) {
      return false;
    } else {
      var blog:Blog = object;
      return (blog.name == this.name &&
              blog.date == this.date);
    }
  }

}
