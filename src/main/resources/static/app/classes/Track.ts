/**
 * Class that represent the information related to MiausicBox tracks
 * @class Info
 */

export class Track{

  /* Attributes */
  private _id: number;
  private _name: string;
  private _group: string;
  private _link: string;

  /* Constructor */
  constructor(id:number, name:string, group: string, link:string) {
    this._id = id;
    this._name = name;
    this._group = group;
    this._link = link;
  }

  /* Getters & Setters */
  get name():string {
    return this._name;
  }

  get group():string {
    return this._group;
  }

  get link():string {
    return this._link;
  }

  set name(name:string) {
    this._name = name;
  }

  set group(group:string) {
    this._group =  group;
  }

  set link(link:string) {
    this._link = link;
  }

  /** Return if a Track is equal to other
   *  @method equals
   *  @param {object} object
   */
  equals(object:any) {
    if (!(object instanceof Track)) {
      return false;
    } else {
      var track:Track = object;
      return (track.name == this.name &&
              track._group == this.group);
    }
  }

}
