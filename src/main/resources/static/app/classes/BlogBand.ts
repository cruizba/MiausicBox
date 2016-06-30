/**
 *  Class that represent the information related to MiausicBox blogs
 *  @class BlogBand
 */
import { Blog } from './Blog';
import { Band } from './Band';

export class BlogBand extends Blog {

  /* Attributes */
  private _author:Band;

  /* Constructor */
  constructor(id:number, name:string, image:string, text:string, date:Date, author:Band) {
    super(id, name, image, text, date);
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
  equals(object:any) {
    if (!(object instanceof BlogBand)) {
      return false;
    } else {
      var blog:BlogBand = object;
      return (super.equals &&
              blog.author.equals(this.author));
    }
  }

}
