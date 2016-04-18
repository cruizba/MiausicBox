/**
 *  Class that represent the information related to MiausicBox users
 *  @class BlogBand
 */
import { Blog } from './Blog';
import { Band } from './Band';


export class BlogBand extends Blog {

  /* Attributes */
  private _author:Band;

  /* Constructor */
  constructor(name:string, image:string, text:string, date:Date, author:Band) {
    super(name, image, text, date);
    this._author = author;
  }

  /* Getters & Setters */
  get author():Band {
    return this._author;
  }

  set author(author:Band) {
    this._author = author;
  }

  /** Return if an BlogBand is equal to other
   *  @method equals
   *  @param {object} object
   */
  equals(object:any){
    //At ApiRest object, this comparaison should be the with both ids
    if (!(object instanceof BlogBand)) {
      return false;
    } else {
      var blog:BlogBand = object;
      return (super.equals &&
              blog.author == this.author);
    }
  }

}
