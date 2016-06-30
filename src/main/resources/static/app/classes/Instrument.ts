/**
 * Class that represent the information related to MiausicBox instruments
 * @class User
 */
export class Instrument{

  /* Attributes */
  private _name: string;
  private _image_url: string;
  private _image_url_white: string;

  /* Constructor */
  constructor(name:string, image_url: string, image_url_white:string){
    this._name = name;
    this._image_url = image_url;
    this._image_url_white = image_url_white;
  };

  /* Getters & Setters */
  get name():string{
    return this._name;
  }

  get image_url():string {
    return this._image_url;
  }

  get image_url_white():string {
    return this._image_url_white;
  }

  set name(name:string) {
    this._name = name;
  }

  set image_url(image_url:string){
    this._image_url=image_url;
  }

  set image_url_white(image_url_white:string){
    this._image_url_white=image_url_white;
  }
  
  toString(){
    return this.name;
  }

  /** Return if an Instrument is equal to instrument
   * @method equals
   * @param {instrument} Instrument
   */
  public equals(object:any):boolean {
    if (!(object instanceof Instrument)){
      return false;
    } else {
      var instrument:Instrument = object;
      return (instrument.name == this.name);
    }
  }

}
