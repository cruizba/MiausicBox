/** Class that represent a genre
 * @class
 */
export class Genre{

    private _name: string;

    constructor(name){
        this._name = name;
    }

    get name():string {
        return this._name;
    }

    set name(value:string) {
        this._name = value;
    }

}
