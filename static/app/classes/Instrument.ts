/**
 * Class that represent the information related to MiausicBox users
 * @class User
 */
export class Instrument{

  private _name:string;
   private _image_url: string;
    private _image_url_white: string;

  constructor(name:string, image_url: string, image_url_white:string){
    this._name = name;
    this._image_url = image_url;
    this._image_url_white = image_url_white;
  };
  /* Methods Getters & Setters*/
  public get name():string{
    return this._name;
  }

  get image_url_white():string{
    return this._image_url_white;
  }
  public set name(name:string) {
    this._name = name;
  }

  get image_url():string{
    return this._image_url;
  }

  set image_url(value:string){
    this._image_url=value;
  }
  
  toString(){
    return this.name;
  }


}
