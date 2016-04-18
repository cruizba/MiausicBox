/**
 * Class that represent the information related to MiausicBox users
 * @class User
 */
export class Instrument{
   private _name:string;

  constructor(name:string){
    this._name = name;
  };
  /* Methods Getters & Setters*/
  public get name():string{
    return this._name;
  }

  public set name(name:string) {
    this._name = name;
  }

  toString(){
    return this.name;
  }


}
