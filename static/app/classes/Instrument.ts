/**
 * Class that represent the information related to MiausicBox users
 * @class User
 */
export class Instrument{

	private _name:string;
   private _image_url: string;

  constructor(name:string, image_url: string){
    this._name = name;
    this._image_url = image_url;
  };
  /* Methods Getters & Setters*/
  public get name():string{
    return this._name;
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
