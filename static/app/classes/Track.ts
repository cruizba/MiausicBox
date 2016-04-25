export class Track{

  private _name: string;
  private _group: string;
  private _link: string;

  constructor(name:string, group: string, link:string) {
    this._name = name;
    this._group = group;
    this._link = link;
  };

  public get name():string{
    return this._name;
  }

  public get group():string{
    return this._group;
  }

  public get link():string{
    return this._link;
  }

  public set name(name:string){
    this._name = name;
  }

  public set group(group:string){
    this._group =  group;
  }

  public set link(link:string){
    this._link = link;
  }

  /** Return if a Track is equal to other
   *  @method equals
   *  @param {object} object
   */
  equals(object:any){
    //At ApiRest object, this comparaison should be the with both ids
    if (!(object instanceof Track)){
      return false;
    }
    else{
      var track:Track = object;
      return (track.name == this.name &&
              track._group == this.group);
    }
  }

}
