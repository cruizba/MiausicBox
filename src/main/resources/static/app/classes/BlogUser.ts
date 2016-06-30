/**
 *  Class that represent the information related to MiausicBox blogs
 *  @class BlogUser
 */
import { Blog } from './Blog';
import { User } from './User';

export class BlogUser extends Blog {

  /* Attributes */
  private _author:User;

  /* Constructor */
  constructor(id:number, name:string, image:string, text:string, date:Date, author:User) {
    super(id, name, image, text, date);
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
    if (!(object instanceof BlogUser)) {
      return false;
    } else {
      var blog:BlogUser = object;
      return (super.equals &&
              blog.author.equals(this.author));
    }
  }

}
