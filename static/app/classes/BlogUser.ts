/**
 *  Class that represent the information related to MiausicBox users
 *  @class BlogUser
 */
import { Blog } from './Blog';
import { User } from './User';

export class BlogUser extends Blog {

  /* Attributes */
  private _author:User;

  /* Constructor */
  constructor(name:string, image:string, title:string, text:string, date:Date, author:User) {
    super(name, image, title, text, date);
    this._author = author;
  }

  /* Getters & Setters */
  get author():User {
    return this._author;
  }

  set author(author:User) {
    this._author = author;
  }

  /** Return if an BlogUser is equal to other
   *  @method equals
   *  @param {object} object
   */
  equals(object:any){
    //At ApiRest object, this comparaison should be the with both ids
    if (!(object instanceof BlogUser)) {
      return false;
    } else {
      var blog:BlogUser = object;
      return (super.equals &&
              blog.author.equals(this.author));
    }
  }

}
